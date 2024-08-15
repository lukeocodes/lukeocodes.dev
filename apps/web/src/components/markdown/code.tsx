export const code = function Code({
	highlightedCode,
	...props
}: React.ComponentPropsWithoutRef<"code"> & { highlightedCode?: string }): JSX.Element {
	if (highlightedCode) {
		return <code {...props} dangerouslySetInnerHTML={{ __html: highlightedCode }} />;
	}

	return <code {...props} />;
};
