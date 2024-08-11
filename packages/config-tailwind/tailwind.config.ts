import type { Config } from "tailwindcss";

export default {
	theme: {
		extend: {
			fontSize: {
				"2xs": ".6875rem",
			},
			fontFamily: {
				sans: "var(--font-noto)",
				display: "var(--font-noto)",
			},
			opacity: {
				2.5: "0.025",
				7.5: "0.075",
				15: "0.15",
			},
		},
	},
	plugins: [],
} satisfies Omit<Config, "content">;
