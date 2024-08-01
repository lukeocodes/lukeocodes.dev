import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/env.mjs";
import { anonymousPaths, defaultUrl, redirectCookieName } from "../constants";

export async function supabaseSession(request: NextRequest): Promise<NextResponse> {
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
	let redirect: string | undefined;

	/**
	 * Logged in users get directed to /dashboard if they hit any of these
	 */
	if (user && anonymousPaths.includes(url.pathname)) {
		return NextResponse.redirect(`${defaultUrl}/dashboard`);
	}

	/**
	 * Was this user already redirected from another URL previously?
	 * TODO: store the entire pathname, search queries, values, everything. so users linked to a
	 * 				filtered chart in some alternate future can login and be redirected to it
	 */
	const redirectedFor = request.cookies.get(redirectCookieName)?.value;

	/**
	 * Previously redirected users when logged in will now finally reach their original destination
	 */
	if (redirectedFor && user) {
		redirect = redirectedFor;
	}

	/**
	 * Anonymous users get directed to "/auth/login" if they hit anything inside /dashboard
	 */
	if (!redirect && !user && url.pathname.startsWith("/dashboard")) {
		redirect = "/auth/login";
	}

	/**
	 * Fulfil any redirect requirements
	 */
	if (redirect) {
		const nextRedirect = NextResponse.redirect(`${defaultUrl}${redirect}`);
		if (!redirectedFor) {
			// Set the redirect cookie if we haven't already
			nextRedirect.cookies.set(redirectCookieName, url.pathname);
		} else {
			// Clear the redirect cookie if are here because of it
			nextRedirect.cookies.delete(redirectCookieName);
		}

		return nextRedirect;
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
