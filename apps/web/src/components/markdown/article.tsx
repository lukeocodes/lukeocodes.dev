import { FormattedDate } from "@/components/formatted-date";

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
	const companyLine = company ? <span>{company}</span> : null;

	const dateLine = date ? <FormattedDate date={date} /> : null;

	const toFromLine = from ? (
		<>
			<FormattedDate date={from} /> - {to ? <FormattedDate date={to} /> : "Now"}
		</>
	) : null;

	const dateMark = toFromLine ?? dateLine;

	return (
		<header className="absolute -left-48 flex flex-col text-right w-40 p-2">
			<div className="hidden justify-end xl:pointer-events-auto xl:dark:text-white/50 xl:flex xl:flex-col gap-y-2">
				{dateMark ? <div className="text-xs font-medium">{dateMark}</div> : null}
				{companyLine ? <div>{companyLine}</div> : null}
			</div>
		</header>
	);
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
	return (
		<article id={id} className="not-first:mt-20 last:mb-20">
			<div className="relative">
				<ArticleHeader from={from} to={to} date={date} company={company} />

				<div className="lg:flex lg:w-full lg:justify-end">
					<div className="mx-auto lg:mx-0 lg:w-0 lg:flex-auto">{children}</div>
				</div>
			</div>
		</article>
	);
};
