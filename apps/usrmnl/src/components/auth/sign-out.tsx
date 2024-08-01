import { Button } from "../ui/button";

interface ComponentProps {
	signOut: () => void;
}

export function SignOut({ signOut }: ComponentProps): JSX.Element {
	return (
		<form>
			<Button variant="link" formAction={signOut}>
				Log out
			</Button>
		</form>
	);
}
