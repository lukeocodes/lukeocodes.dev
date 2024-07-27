import Link from "next/link";
import { resetPassword } from "@/lib/login/actions";
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

export default function ForgotPassword(): JSX.Element {
	return (
		<form>
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Forgot Password</CardTitle>
					<CardDescription>Enter your email below to reset your password</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								name="email"
								id="email"
								type="email"
								placeholder="m@example.com"
								defaultValue="luke@lukeoliff.com"
								required
							/>
						</div>
						<Button type="submit" formAction={resetPassword} className="w-full">
							Request password reset
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Remembered your password?{" "}
						<Link href="/login" className="underline">
							Login
						</Link>
					</div>
				</CardContent>
			</Card>
		</form>
	);
}
