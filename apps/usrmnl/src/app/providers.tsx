"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { AuthProvider } from "@/providers/auth-provider";

export function Providers({ children, ...props }: ThemeProviderProps): JSX.Element {
	return (
		<NextThemesProvider {...props}>
			<AuthProvider>{children}</AuthProvider>
		</NextThemesProvider>
	);
}
