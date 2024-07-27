import { Inter as FontSans } from "next/font/google";
import { defaultUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Providers } from "./providers";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Next.js and Supabase Starter Kit",
	description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<html lang="en">
			<body className={cn("min-h-screen font-sans antialiased", fontSans.variable)}>
				<Providers attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					{children}
				</Providers>
			</body>
		</html>
	);
}
