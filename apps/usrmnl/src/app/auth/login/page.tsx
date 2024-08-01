import Link from "next/link";
import { Button, Input, Label, UserIdCard } from "@/components";
import { login } from "@/lib/auth/actions";

export default function LoginPage(): JSX.Element {
	return (
		<UserIdCard title="Log in" description="Enter your email below to login to your account">
			<form>
				<div className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input name="email" id="email" type="email" placeholder="m@example.com" required />
					</div>
					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
							<Link
								href="/auth/forgot-password"
								className="ml-auto inline-block text-sm underline leading-none"
							>
								Forgot your password?
							</Link>
						</div>
						<Input id="password" type="password" name="password" required />
					</div>
					<Button type="submit" formAction={login} className="w-full">
						Log in
					</Button>
				</div>
				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link href="/auth/signup" className="underline">
						Sign up
					</Link>
				</div>
			</form>
		</UserIdCard>
	);
}
