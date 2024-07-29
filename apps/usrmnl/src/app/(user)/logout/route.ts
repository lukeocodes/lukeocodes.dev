"use server";

import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { defaultUrl } from "@/lib/constants";

export async function GET(request: NextRequest): Promise<NextResponse> {
	const { searchParams } = request.nextUrl;
	const next = searchParams.get("next") ?? "/";
	const redirectTo = new URL(next, defaultUrl);
	const supabase = createClient();

	const { error } = await supabase.auth.signOut();

	if (error) {
		console.error(error);
		redirectTo.pathname = "/error?message=Couldn't+verify+token";

		return NextResponse.redirect(redirectTo);
	}

	return NextResponse.redirect(redirectTo);
}
