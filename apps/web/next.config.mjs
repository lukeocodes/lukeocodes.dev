import nextMDX from "@next/mdx";
import { recmaPlugins } from "./mdx/recma.mjs";
import { rehypePlugins } from "./mdx/rehype.mjs";
import { remarkPlugins } from "./mdx/remark.mjs";

const withMDX = nextMDX({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins,
		rehypePlugins,
		recmaPlugins,
	},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	experimental: {
		typedRoutes: true,
	},
	redirects: async () => {
		return [
			{
				source: "/politics",
				destination: "/open-letter-politics",
				permanent: true,
			},
			{
				source: "/ai",
				destination: "/open-letter-ai",
				permanent: true,
			},
		];
	},
};

export default withMDX(nextConfig);
