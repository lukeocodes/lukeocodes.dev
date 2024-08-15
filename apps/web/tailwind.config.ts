import plugin from "tailwindcss/plugin";
import { type Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Config = {
	darkMode: "selector",
	content: ["./{src,mdx}/**/*.{js,mjs,jsx,ts,tsx,mdx}"],
	presets: [sharedConfig],
	plugins: [
		plugin(function addPositionVariants({ addVariant }) {
			addVariant("not-first", "&:not(:first-child)");
			addVariant("first", "&:first-child");
			addVariant("not-last", "&:not(:last-child)");
			addVariant("last", "&:last-child");
		}),
	],
};

export default config;
