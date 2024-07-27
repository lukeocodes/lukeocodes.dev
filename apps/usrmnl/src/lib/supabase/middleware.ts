import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/env.mjs";
import { encode } from "@/lib/utils";
// import { headers } from "next/headers";

export async function updateSession(request: NextRequest): Promise<NextResponse> {
	let supabaseResponse = NextResponse.next({
		request,
	});

	const supabase = createServerClient(
		env.NEXT_PUBLIC_SUPABASE_URL,
		env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
					supabaseResponse = NextResponse.next({
						request,
					});
					cookiesToSet.forEach(({ name, value, options }) =>
						// eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- Supabase requires passing options to set cookies
						supabaseResponse.cookies.set(name, value, options)
					);
				},
			},
		}
	);

	// IMPORTANT: Avoid writing any logic between createServerClient and
	// supabase.auth.getUser(). A simple mistake could make it very hard to debug
	// issues with users being randomly logged out.

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const url = request.nextUrl;

	const anonymousPaths = [
		"/login",
		"/auth/confirm",
		"/forgot-password",
		"/password-requested",
		"/signup",
		"/update-password",
	];

	/**
	 * Logged in users get directed to /dashboard if they hit any of these
	 */
	if (user && anonymousPaths.includes(url.pathname)) {
		const redirectPath = url.clone();
		redirectPath.pathname = "/dashboard";

		return NextResponse.redirect(redirectPath);
	}

	/**
	 * Anonymous users get directed to /login if they hit anything inside /dashboard
	 */
	if (!user && url.pathname.startsWith("/dashboard")) {
		const redirectPath = url.clone();
		redirectPath.pathname = `/login`;
		redirectPath.search = `next=${encode(url.pathname)}${encode(url.search)}`;

		return NextResponse.redirect(redirectPath);
	}

	// IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
	// creating a new response object with NextResponse.next() make sure to:
	// 1. Pass the request in it, like so:
	//    const myNewResponse = NextResponse.next({ request })
	// 2. Copy over the cookies, like so:
	//    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
	// 3. Change the myNewResponse object to fit your needs, but avoid changing
	//    the cookies!
	// 4. Finally:
	//    return myNewResponse
	// If this is not done, you may be causing the browser and server to go out
	// of sync and terminate the user's session prematurely!

	return supabaseResponse;
}
