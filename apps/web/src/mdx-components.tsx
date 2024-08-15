import * as mdxComponents from "@/components/markdown";

export function useMDXComponents(components: Record<string, unknown>): Record<string, unknown> {
	return {
		...components,
		...mdxComponents,
	};
}
