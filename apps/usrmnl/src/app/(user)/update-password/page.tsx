import { updatePassword } from "@/lib/auth/actions";
import { Button, Input, Label, UserIdCard } from "@/components";

export default function SignUp(): JSX.Element {
	return (
		<UserIdCard title="Update password" description="Enter your new password">
			<form>
				<div className="grid gap-4">
					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
						</div>
						<Input id="password" type="password" name="password" required />
					</div>
					<Button type="submit" formAction={updatePassword} className="w-full">
						Update password
					</Button>
				</div>
			</form>
		</UserIdCard>
	);
}
