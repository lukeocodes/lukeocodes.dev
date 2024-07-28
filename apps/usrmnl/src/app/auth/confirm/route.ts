"use server";

import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { defaultUrl } from "@/lib/constants";

export async function GET(request: NextRequest): Promise<NextResponse> {
	const { searchParams } = request.nextUrl;
	const tokenHash = searchParams.get("token_hash");
	const type = searchParams.get("type") as EmailOtpType | null;
	const next = searchParams.get("next") ?? "/";
	const redirectTo = new URL(next, defaultUrl);

	if (tokenHash && type) {
		const supabase = createClient();

		const { error } = await supabase.auth.verifyOtp({
			type,
			token_hash: tokenHash,
			options: {
				redirectTo: `${defaultUrl}/auth/confirm`,
			},
		});

		if (error) {
			console.error(error);
			redirectTo.pathname = "/error?message=Couldn't+verify+token";

			return NextResponse.redirect(redirectTo);
		}

		return NextResponse.redirect(redirectTo);
	}

	redirectTo.pathname = "/error?message=Invalid+token";

	return NextResponse.redirect(redirectTo);
}
