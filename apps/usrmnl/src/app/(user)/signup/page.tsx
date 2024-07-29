"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { type Route } from "next";
import { AuthError } from "@supabase/supabase-js";
import { signup } from "@/lib/auth/actions";
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

		signup(formData, searchParams.next)
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
		<UserIdCard title="Sign up" description="Enter your details below to sign up">
			<form>
				<fieldset disabled={submit}>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input name="email" id="email" type="email" placeholder="m@example.com" required />
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
							</div>
							<Input id="password" type="password" name="password" required />
						</div>
						<Button type="submit" formAction={handleSubmit} className="w-full">
							Sign up
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<Link
							href={{
								pathname: "/forgot-password",
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
