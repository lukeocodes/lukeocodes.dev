import { type MDXComponents } from "@types/mdx";
import * as mdxComponents from "@/components/markdown";

export function useMDXComponents(components: MDXComponents) {
	return {
		...components,
		...mdxComponents,
	};
}
