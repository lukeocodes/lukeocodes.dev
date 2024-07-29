"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type Route } from "next";
import { AuthError } from "@supabase/supabase-js";
import { resetPassword } from "@/lib/auth/actions";
import { Button, Input, Label, UserIdCard } from "@/components";
import { encode } from "@/lib/utils";

interface PageProps {
	searchParams: Record<string, string>;
}

export default function ForgotPassword({ searchParams }: PageProps): JSX.Element {
	const [submit, setSubmit] = useState(false);
	const router = useRouter();

	const handleSubmit = (formData: FormData): void => {
		setSubmit(true);

		resetPassword(formData, searchParams.next)
			.then(next => {
				router.replace(next as Route);
			})
			.catch((error: unknown) => {
				if (error instanceof AuthError) {
					console.error(error);
				} else {
					console.error(error);

					router.replace("/error");
				}
			});
	};

	return (
		<UserIdCard title="Forgot password" description="Enter your email below to reset your password">
			<form>
				<fieldset disabled={submit}>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input name="email" id="email" type="email" placeholder="m@example.com" required />
						</div>
						<Button type="submit" formAction={handleSubmit} className="w-full">
							Request password reset
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Remembered your password?{" "}
						<Link
							href={{
								pathname: "/login",
								search: searchParams.next ? `?next=${encode(searchParams.next)}` : "",
							}}
							className="underline"
						>
							Login
						</Link>
					</div>
				</fieldset>
			</form>
		</UserIdCard>
	);
}
