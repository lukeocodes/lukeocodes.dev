"use client";

import { article } from "@/components/resume-article";
import Resume from "@/markdown/resume.mdx";

const overrideComponents = {
	article,
};

export default function Page(): JSX.Element {
	return <Resume components={overrideComponents} />;
}
