"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthError } from "@supabase/supabase-js";
import { type Route } from "next";
import { Button, Input, Label, UserIdCard } from "@/components";
import { login } from "@/lib/auth/actions";
import { encode } from "@/lib/utils";

interface PageProps {
	searchParams: Record<string, string>;
}

export default function LoginPage({ searchParams }: PageProps): JSX.Element {
	const [submit, setSubmit] = useState(false);
	const router = useRouter();

	const handleSubmit = (formData: FormData): void => {
		setSubmit(true);

		login(formData, searchParams.next)
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
		<UserIdCard title="Log in" description="Enter your email below to login to your account">
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
								<Link
									href={{
										pathname: "/forgot-password",
										search: searchParams.next ? `?next=${encode(searchParams.next)}` : "",
									}}
									className="ml-auto inline-block text-sm underline leading-none"
								>
									Forgot your password?
								</Link>
							</div>
							<Input id="password" type="password" name="password" required />
						</div>
						<Button formAction={handleSubmit} className="w-full">
							{submit ? <>...</> : "Log in"}
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account?{" "}
						<Link
							href={{
								pathname: "/signup",
								search: searchParams.next ? `?next=${encode(searchParams.next)}` : "",
							}}
							className="underline"
						>
							Sign up
						</Link>
					</div>
				</fieldset>
			</form>
		</UserIdCard>
	);
}
