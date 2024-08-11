import Link from "next/link";
// import Image from "next/image";
// import me from "@/images/me.svg";
import { BrandIcon } from "./brand-icon";

export function Intro(): JSX.Element {
	return (
		<div className="mt-14 flex flex-col items-center">
			<div id="brandIcon" className="flex justify-center text-[color:var(--brand)]">
				<BrandIcon className="mb-6 fill-current w-80 drop-shadow-md" />
				{/* <Image src={me as string} alt="Luke Oliff" width={400} className="mb-6 fill-current" /> */}
			</div>
			<h1 className="text-4xl">Luke Oliff</h1>
			<h2 className="text-3xl text-[color:var(--brand)] drop-shadow-md">Developer Experience</h2>
		</div>
	);
}

export function IntroFooter(): JSX.Element {
	return (
		<p className="text-xs">
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
		</p>
	);
}
