import Link from "next/link";
import { signup } from "@/lib/login/actions";
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

export default function SignUp(): JSX.Element {
	return (
		<Card className="mx-auto max-w-sm w-full">
			<CardHeader>
				<CardTitle className="text-2xl">Sign up</CardTitle>
				<CardDescription>Enter your details below to sign up</CardDescription>
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
							</div>
							<Input id="password" type="password" name="password" required />
						</div>
						<Button type="submit" formAction={signup} className="w-full">
							Sign up
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<Link href="/login" className="underline">
							Login
						</Link>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
