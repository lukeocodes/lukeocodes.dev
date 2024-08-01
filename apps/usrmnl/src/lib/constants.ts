import { env } from "@/env.mjs";

export const defaultUrl = env.VERCEL_URL ? `https://${env.VERCEL_URL}` : "http://localhost:3000";
export const redirectCookieName = "x-dg-redirect";
export const anonymousPaths = [
	"/auth/confirm",
	"/auth/forgot-password/thanks",
	"/auth/forgot-password",
	"/auth/login",
	// "/auth/logout", // never prevent logged in users reaching /logout, because then they can't log out
	"/auth/signup",
	"/auth/signup/thanks",
	"/auth/update-password",
];
