"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthError } from "@supabase/supabase-js";
import { type Route } from "next";
import { Button, Input, Label, UserIdCard } from "@/components";
import { updatePassword } from "@/lib/auth/actions";

interface PageProps {
	searchParams: Record<string, string>;
}

export default function UpdatePassword({ searchParams }: PageProps): JSX.Element {
	const [submit, setSubmit] = useState(false);
	const router = useRouter();

	const handleSubmit = (formData: FormData): void => {
		setSubmit(true);

		updatePassword(formData, searchParams.next)
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
		<UserIdCard title="Update password" description="Enter your new password">
			<form>
				<fieldset disabled={submit}>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
							</div>
							<Input id="password" type="password" name="password" required />
						</div>
						<Button type="submit" formAction={handleSubmit} className="w-full">
							Update password
						</Button>
					</div>
				</fieldset>
			</form>
		</UserIdCard>
	);
}
