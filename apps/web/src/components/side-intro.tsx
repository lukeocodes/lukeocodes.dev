import { BrandIcon } from "./brand-icon";

export function Intro(): JSX.Element {
	return (
		<div className="mt-14 flex flex-col items-center">
			<div id="brandIcon" className="flex justify-center text-[color:var(--brand)]">
				<BrandIcon className="mb-6 fill-current w-80 drop-shadow-md" />
			</div>
			<h1 className="text-4xl">Luke Oliff</h1>
			<h2 className="text-3xl text-[color:var(--brand)] drop-shadow-md">Developer Experience</h2>
		</div>
	);
}
