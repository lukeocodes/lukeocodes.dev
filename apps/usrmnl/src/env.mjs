import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		EMAIL_FROM: z.string().min(1),
		SUPABASE_SERVICE_KEY: z.string().min(1),
	},
	client: {
		NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
		NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
	},
	shared: {
		VERCEL_URL: z.string().url().optional(),
	},
	runtimeEnv: {
		EMAIL_FROM: process.env.EMAIL_FROM,
		NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
		SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
		VERCEL_URL: process.env.VERCEL_URL,
	},
});
