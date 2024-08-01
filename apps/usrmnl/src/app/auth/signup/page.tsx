import Link from "next/link";
import { signup } from "@/lib/auth/actions";
import { Button, Input, Label, UserIdCard } from "@/components";

export default function SignUp(): JSX.Element {
	return (
		<UserIdCard title="Sign up" description="Enter your details below to sign up">
			<form>
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
					<Button type="submit" formAction={signup} className="w-full">
						Sign up
					</Button>
				</div>
				<div className="mt-4 text-center text-sm">
					Already have an account?{" "}
					<Link href="/auth/forgot-password" className="underline">
						Login
					</Link>
				</div>
			</form>
		</UserIdCard>
	);
}
