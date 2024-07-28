import Link from "next/link";
import { resetPassword } from "@/lib/auth/actions";
import { Button, Input, Label, UserIdCard } from "@/components";

export default function ForgotPassword(): JSX.Element {
	return (
		<UserIdCard title="Forgot password" description="Enter your email below to reset your password">
			<form>
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
			</form>
		</UserIdCard>
	);
}
