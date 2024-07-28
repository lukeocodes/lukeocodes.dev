import { Navbar } from "@/components";

export default function MarketingLayout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<>
			<Navbar />
			<main className="w-full mt-4 sm:mt-6 md:mt-12 lg:mt-32 xl:mt-52 flex items-center justify-center">
				{children}
			</main>
		</>
	);
}
