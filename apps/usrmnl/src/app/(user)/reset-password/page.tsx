import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components";

export default function ForgotPassword(): JSX.Element {
	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Password Reset Requested</CardTitle>
				<CardDescription>Check your email for a reset password link.</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="mt-4 text-center text-sm">
					Back to the homepage{" "}
					<Link href="/" className="underline">
						Home
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
