import { updatePassword } from "@/lib/login/actions";
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
				<CardTitle className="text-2xl">Update Password</CardTitle>
				<CardDescription>Complete the form to update your password</CardDescription>
			</CardHeader>
			<CardContent>
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
			</CardContent>
		</Card>
	);
}
