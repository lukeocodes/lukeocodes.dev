"use server";

import { redirect, RedirectType } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData): Promise<void> {
	const supabase = createClient();

	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	await supabase.auth.signInWithPassword(data);

	redirect("/dashboard", RedirectType.push);
}

export async function signup(formData: FormData): Promise<void> {
	const supabase = createClient();

	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	await supabase.auth.signUp(data);

	redirect("/auth/signup/thanks", RedirectType.push);
}

export async function resetPassword(formData: FormData): Promise<void> {
	const supabase = createClient();

	const email = formData.get("email") as string;

	await supabase.auth.resetPasswordForEmail(email);

	redirect("/auth/forgot-password/thanks", RedirectType.push);
}

export async function updatePassword(formData: FormData): Promise<void> {
	const supabase = createClient();

	const data = {
		password: formData.get("password") as string,
	};

	await supabase.auth.updateUser(data);

	redirect("/dashboard", RedirectType.push);
}
