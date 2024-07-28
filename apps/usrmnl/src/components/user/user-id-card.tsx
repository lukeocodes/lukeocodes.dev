import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface UserIdCardProps {
	title: string;
	description: string;
	children: React.ReactNode;
}

export function UserIdCard({ title, description, children }: UserIdCardProps): JSX.Element {
	return (
		<Card className="mx-auto max-w-sm w-full">
			<CardHeader>
				<CardTitle className="text-2xl">{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
}
