import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function PrivatePage(): Promise<JSX.Element> {
	const supabase = createClient();

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();
	if (error ?? !user) {
		redirect("/login");
	}

	return <p>Hello {user.email}</p>;
}
