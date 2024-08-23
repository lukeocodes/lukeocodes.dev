import { Intro } from "@/components/side-intro";
import { StarField } from "@/components/star-field";

export default function SideIntroLayout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<div className="xl:grid xl:grid-cols-2">
			<div className="px-4 lg:px-6 xl:px-8 xl:sticky xl:h-screen xl:top-16 xl:flex xl:flex-col xl:justify-center xl:shadow-[5px_0px_5px_-5px_#18181b30] xl:dark:shadow-[5px_0px_5px_-5px_#94a3b830] mt-16 xl:mt-0">
				<StarField />
				<Intro />
			</div>
			<div
				className="mx-auto px-4 lg:px-6 xl:px-8 max-w-3xl xl:mx-0 xl:max-w-none my-16 xl:my-32"
				data-mdx-content
			>
				{children}
			</div>
		</div>
	);
}
