import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
	const { searchParams } = new URL(request.url);
	console.warn(searchParams);
	const tokenHash = searchParams.get("token_hash");
	const type = searchParams.get("type") as EmailOtpType | null;
	const next = searchParams.get("next") ?? "/";
	const redirectTo = request.nextUrl.clone();
	redirectTo.pathname = next;

	if (tokenHash && type) {
		const supabase = createClient();

		const { error } = await supabase.auth.verifyOtp({
			type,
			token_hash: tokenHash,
		});

		if (!error) {
			console.error(error);

			return NextResponse.redirect(redirectTo);
		}
	}

	// return the user to an error page with some instructions
	redirectTo.pathname = "/error?message=Invalid+token";

	return NextResponse.redirect(redirectTo);
}
