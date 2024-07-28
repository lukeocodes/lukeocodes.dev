import Link from "next/link";
import { login } from "@/lib/login/actions";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Input,
	Label,
} from "@/components";

export default function LoginPage(): JSX.Element {
	return (
		<Card className="mx-auto max-w-sm w-full">
			<CardHeader>
				<CardTitle className="text-2xl">Log in</CardTitle>
				<CardDescription>Enter your email below to login to your account</CardDescription>
			</CardHeader>
			<CardContent>
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
									href="/forgot-password"
									className="ml-auto inline-block text-sm underline leading-none"
								>
									Forgot your password?
								</Link>
							</div>
							<Input id="password" type="password" name="password" required />
						</div>
						<Button formAction={login} className="w-full">
							Log in
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account?{" "}
						<Link href="/signup" className="underline">
							Sign up
						</Link>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
