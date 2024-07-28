"use client";

import { useLocalStorage } from "usehooks-ts";
import { AArrowUp } from "lucide-react";
import { useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";

const sizes = ["14px", "16px", "18px"];

export function FontToggle(): JSX.Element {
	const [fontSize, setFontSize] = useLocalStorage("fontSize", "16px");

	useEffect(() => {
		document.documentElement.style.setProperty("font-size", fontSize);
	}, [fontSize]);

	const toggleFontSize = useCallback(() => {
		const currentIndex = sizes.indexOf(fontSize);
		const nextIndex = (currentIndex + 1) % sizes.length;
		setFontSize(sizes[nextIndex]);
	}, [fontSize, setFontSize]);

	return (
		<Button size="icon" variant="outline" onClick={toggleFontSize}>
			<AArrowUp className="size-5 not-sr-only text-current" />
			<span className="sr-only">Toggle font size</span>
		</Button>
	);
}
