"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { defaultUrl } from "@/lib/constants";

export async function login(formData: FormData): Promise<void> {
	const supabase = createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		console.error(error);
		redirect("/error");
	}

	revalidatePath("/dashboard", "layout");
	redirect("/dashboard");
}

export async function signup(formData: FormData): Promise<void> {
	const supabase = createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signUp(data);

	if (error) {
		console.error(error);
		redirect("/error");
	}

	revalidatePath("/dashboard", "layout");
	redirect("/dashboard");
}

export async function resetPassword(formData: FormData): Promise<void> {
	const supabase = createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const email = formData.get("email") as string;

	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${defaultUrl}/auth/confirm`,
	});

	if (error) {
		// console.error(error);
		redirect("/error");
	}

	redirect("/reset-password");
}

export async function updatePassword(formData: FormData): Promise<void> {
	const supabase = createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const password = formData.get("password") as string;

	const { error } = await supabase.auth.updateUser({
		password,
	});

	if (error) {
		console.error(error);
		redirect("/error");
	}

	redirect("/login?reset=true");
}
