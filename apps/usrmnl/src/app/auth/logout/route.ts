"use server";

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { defaultUrl } from "@/lib/constants";

export async function GET(): Promise<NextResponse> {
	const url = new URL("/", defaultUrl);

	const supabase = createClient();
	await supabase.auth.signOut({ scope: "global" });

	return NextResponse.redirect(url);
}
