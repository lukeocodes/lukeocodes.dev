import Image, { type ImageProps } from "next/image";

type ImagePropsWithOptionalAlt = Omit<ImageProps, "alt"> & { alt?: string };

export const img = function Img(props: ImagePropsWithOptionalAlt): JSX.Element {
	return (
		<div className="relative inline-block overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-900/10 dark:bg-slate-900 dark:ring-white/10 [&+*]:mt-8">
			<Image
				alt=""
				sizes="(min-width: 1280px) 36rem, (min-width: 1024px) 45vw, (min-width: 640px) 32rem, 95vw"
				{...props}
			/>
		</div>
	);
};
