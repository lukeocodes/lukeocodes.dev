import { env } from "@/env.mjs";

export const defaultUrl = env.VERCEL_URL ? `https://${env.VERCEL_URL}` : "http://localhost:3000";
