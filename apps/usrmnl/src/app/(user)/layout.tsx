import { Navbar } from "@/components";

export default function MarketingLayout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<>
			<Navbar />
			<main className="absolute inset-0 w-full flex items-center justify-center">{children}</main>
		</>
	);
}
