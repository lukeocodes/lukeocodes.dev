"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { clsx } from "clsx";
import { FormattedDate } from "@/components/FormattedDate";

export const a = Link;

type ImagePropsWithOptionalAlt = Omit<ImageProps, "alt"> & { alt?: string };

export const img = function Img(props: ImagePropsWithOptionalAlt): JSX.Element {
	return (
		<div className="relative mt-8 inline-block overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-900/10 dark:bg-slate-900 dark:ring-white/10 [&+*]:mt-8">
			<Image
				alt=""
				sizes="(min-width: 1280px) 36rem, (min-width: 1024px) 45vw, (min-width: 640px) 32rem, 95vw"
				{...props}
			/>
		</div>
	);
};

function ContentWrapper({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">): JSX.Element {
	return (
		<div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
			<div className="lg:ml-96 lg:flex lg:w-full lg:justify-end lg:pl-32">
				<div
					className={clsx("mx-auto max-w-lg lg:mx-0 lg:w-0 lg:max-w-xl lg:flex-auto", className)}
					{...props}
				/>
			</div>
		</div>
	);
}

function ArticleHeader({
	from,
	to,
	company,
	date,
}: {
	from?: string | Date;
	to?: string | Date;
	company?: string;
	date?: string | Date;
}): JSX.Element {
	if (from) {
		return (
			<header className="relative mb-10 xl:mb-0">
				<div className="pointer-events-none absolute left-[max(-0.5rem,calc(50%-18.625rem))] top-0 z-50 flex h-4 items-center justify-end gap-x-2 lg:left-0 lg:right-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem] xl:h-8">
					<span className="inline-flex">
						<FormattedDate
							date={from}
							className="hidden xl:pointer-events-auto xl:block xl:text-xs xl:font-medium xl:dark:text-white/50"
						/>
					</span>
					<div className="hidden h-[0.0625rem] w-3.5 dark:bg-slate-400 bg-slate-800 lg:-mr-3.5 xl:pointer-events-auto xl:mr-0 xl:block xl:dark:bg-slate-300 xl:bg-slate-900" />
					<span className="mr-2 inline-flex">
						{to ? (
							<FormattedDate
								date={to}
								className="hidden xl:pointer-events-auto xl:block xl:text-xs xl:font-medium xl:dark:text-white/50"
							/>
						) : (
							<span className="hidden xl:pointer-events-auto xl:block xl:text-xs xl:font-medium xl:dark:text-white/50">
								Now
							</span>
						)}
					</span>
				</div>
				<div className="pointer-events-none absolute left-[max(-0.5rem,calc(50%-18.625rem))] top-6 z-50 flex h-4 items-start justify-end gap-x-2 lg:left-0 lg:right-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem] xl:h-8">
					<span className="mr-2 inline-flex max-w-[10rem] text-right">{company}</span>
				</div>
				<ContentWrapper>
					<div className="flex">
						<span className="flex items-center gap-x-2">
							<FormattedDate
								date={from}
								className="text-xs font-medium text-slate-500 xl:hidden dark:text-white/50"
							/>
							<div className="h-[0.0625rem] w-3.5 bg-slate-400 lg:-mr-3.5 xl:hidden" />
							{to ? (
								<FormattedDate
									date={to}
									className="text-xs font-medium text-slate-500 xl:hidden dark:text-white/50"
								/>
							) : (
								<span className="text-xs font-medium text-slate-500 xl:hidden dark:text-white/50">
									Now
								</span>
							)}
						</span>
					</div>
				</ContentWrapper>
			</header>
		);
	} else if (date) {
		return (
			<header className="relative mb-10 xl:mb-0">
				<FormattedDate
					date={date}
					className="text-xs font-medium text-slate-500 xl:hidden dark:text-white/50"
				/>
				{company}
			</header>
		);
	}

	return <>&nbsp;</>;
}

export const article = function Article({
	id,
	from,
	to,
	company,
	date,
	children,
}: {
	id: string;
	from?: string | Date;
	to?: string | Date;
	company?: string;
	date?: string | Date;
	children: React.ReactNode;
}): JSX.Element {
	const heightRef = useRef<React.ElementRef<"div">>(null);
	const [heightAdjustment, setHeightAdjustment] = useState(0);

	useEffect(() => {
		if (!heightRef.current) {
			return;
		}

		const observer = new window.ResizeObserver(() => {
			if (!heightRef.current) {
				return;
			}
			const { height } = heightRef.current.getBoundingClientRect();
			const nextMultipleOf8 = 8 * Math.ceil(height / 8);
			setHeightAdjustment(nextMultipleOf8 - height);
		});

		observer.observe(heightRef.current);

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<article
			id={id}
			className="scroll-mt-16"
			style={{ paddingBottom: `${String(heightAdjustment)}px` }}
		>
			<div ref={heightRef}>
				<ArticleHeader from={from} to={to} date={date} company={company} />
				<ContentWrapper className="typography" data-mdx-content>
					{children}
				</ContentWrapper>
			</div>
		</article>
	);
};

export const code = function Code({
	highlightedCode,
	...props
}: React.ComponentPropsWithoutRef<"code"> & { highlightedCode?: string }): JSX.Element {
	if (highlightedCode) {
		return <code {...props} dangerouslySetInnerHTML={{ __html: highlightedCode }} />;
	}

	return <code {...props} />;
};
