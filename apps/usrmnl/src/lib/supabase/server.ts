import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env } from "@/env.mjs";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- Disabling this rule because the return type of the function is inferred from the return statement
export function createClient() {
	const cookieStore = cookies();

	return createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			getAll() {
				return cookieStore.getAll();
			},
			setAll(cookiesToSet) {
				try {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- Disabling this rule because cookiesToSet is expected to be an array of cookie objects with name, value, and options properties
					cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
				} catch {
					// The `setAll` method was called from a Server Component.
					// This can be ignored if you have middleware refreshing
					// user sessions.
				}
			},
		},
	});
}
