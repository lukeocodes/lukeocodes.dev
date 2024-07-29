"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";

export function ModeToggle(): JSX.Element {
	const { theme, setTheme } = useTheme();

	const toggleTheme = useCallback((): void => {
		const newTheme = theme === "light" ? "dark" : "light";

		setTheme(newTheme);
	}, [theme, setTheme]);

	return (
		<Button variant="outline" size="icon" onClick={toggleTheme}>
			<Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
