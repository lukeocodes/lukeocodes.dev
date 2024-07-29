"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData, next = "/dashboard"): Promise<string> {
	const supabase = createClient();

	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		throw error;
	}

	revalidatePath(next, "layout");

	return next;
}

export async function signup(formData: FormData, next = "/dashboard"): Promise<string> {
	const supabase = createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signUp(data);

	if (error) {
		throw error;
	}

	revalidatePath(next, "layout");

	return next;
}

export async function resetPassword(formData: FormData, next = "/dashboard"): Promise<string> {
	const supabase = createClient();

	const email = formData.get("email") as string;

	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: next,
	});

	if (error) {
		throw error;
	}

	return `/forgot-password/thanks`;
}

export async function updatePassword(formData: FormData, next = "/dashboard"): Promise<string> {
	const supabase = createClient();

	const data = {
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.updateUser(data);

	if (error) {
		throw error;
	}

	revalidatePath(next, "layout");

	return next;
}
