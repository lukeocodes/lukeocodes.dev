import { Navbar } from "@/components";
import { defaultUrl } from "@/lib/constants";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Next.js and Supabase Starter Kit",
	description: "The fastest way to build apps with Next.js and Supabase",
};

export default function MarketingLayout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<>
			<Navbar />
			<main>{children}</main>
		</>
	);
}
