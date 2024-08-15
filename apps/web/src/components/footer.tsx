import Link from "next/link";

export function Footer(): JSX.Element {
	return (
		<div className="text-xs text-center outline outline-[1px] outline-slate-900 dark:outline-slate-400 leading-10">
			Copyright &copy; {new Date().getFullYear()}{" "}
			<Link
				href="https://github.com/lukeocodes"
				target="_blank"
				rel="noopener noreferrer"
				className="inline  underline "
			>
				Luke Oliff
			</Link>
			. All rights reserved.
		</div>
	);
}
