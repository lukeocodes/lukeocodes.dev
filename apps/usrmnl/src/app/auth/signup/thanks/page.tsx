import Link from "next/link";
import { UserIdCard } from "@/components";

export default function SignUpThanks(): JSX.Element {
	return (
		<UserIdCard
			title="Check your email"
			description="To verify your email address, click the link we sent to your email address."
		>
			<div className="mt-4 text-sm">
				Back to the{" "}
				<Link href="/" className="underline">
					homepage
				</Link>
			</div>
		</UserIdCard>
	);
}
