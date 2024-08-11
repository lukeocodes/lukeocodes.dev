import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Metadata } from "next";
import { Noto_Sans_Mono as Noto } from "next/font/google";
import { clsx } from "clsx";
import Script from "next/script";
import { Providers } from "@/app/providers";
import { Intro, IntroFooter } from "@/components/side-intro";
import { StarField } from "@/components/star-field";
import { Header } from "@/components/header-nav";
import "@/styles/tailwind.css";

const noto = Noto({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-noto",
});

export const metadata: Metadata = {
	title: "Luke Oliff - Developer Experience",
	description:
		"I am a seasoned Developer Experience Engineer with a rich background in software development, focusing on security and open-source. Based in the UK, I am an experienced remote worker with almost 8 years working for US organisations remotely.",
};

function Glow(): JSX.Element {
	return (
		<div className="absolute inset-0 -z-10 overflow-hidden lg:right-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem] shadow-md">
			<div className="absolute inset-x-0 bottom-0 right-0 h-px dark:bg-white/10 bg-black/10 lg:left-auto lg:top-0 lg:h-auto lg:w-[0.1rem]" />
		</div>
	);
}

function FixedSidebar({
	main,
	footer,
}: {
	main: React.ReactNode;
	footer: React.ReactNode;
}): JSX.Element {
	return (
		<div className="relative flex-none overflow-hidden px-6 lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex lg:px-0">
			<Glow />
			<div className="relative flex w-full lg:pointer-events-auto lg:mr-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem] lg:overflow-y-auto lg:overflow-x-hidden lg:pl-[max(4rem,calc(50%-38rem))]">
				<div className="mx-auto max-w-lg lg:mx-0 lg:flex lg:w-96 lg:max-w-none lg:flex-col lg:before:flex-1 lg:before:pt-6">
					<div className="pb-16 pt-20 sm:pb-20 sm:pt-32 lg:py-20">
						<div className="relative">
							<StarField className="-right-44 top-14" />
							{main}
						</div>
					</div>
					<div className="flex flex-1 items-end justify-center pb-4 lg:justify-start lg:pb-6">
						{footer}
					</div>
				</div>
			</div>
		</div>
	);
}

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<html lang="en" className={clsx("h-full antialiased", noto.variable)} suppressHydrationWarning>
			<body className="flex min-h-full flex-col bg-zinc-200 dark:bg-zinc-900">
				<Providers>
					<Header />
					<FixedSidebar main={<Intro />} footer={<IntroFooter />} />
					<div className="relative flex-auto">
						<main id="observableContent" className="space-y-20 py-20 sm:space-y-32 sm:py-32">
							{children}
						</main>
					</div>
				</Providers>
				<Analytics />
				<SpeedInsights />
				<Script id="colorful">
					{`let colors = ["#5795e6", "#38BDF8", "#13ef93", "#24d05a", "#ae63f9", "#ee028c", "#10a2f5", "#f04438", "#e9bc3f", "#A0AD91"];

function getRandomColor() {
	return colors[Math.floor(Math.random() * colors.length)];
}

function setRandomLinkColor() {
	document.documentElement.style.setProperty('--brand', getRandomColor())

	Array.from(document.getElementsByTagName("a")).forEach((e) => {
		e.style.textDecorationColor = getRandomColor();
	});

	Array.from(document.getElementsByTagName("input")).forEach((e) => {
		e.style.borderBottomColor = getRandomColor();
	});
}

function launchChanges() {
	setRandomLinkColor();
	setColorHoverListener();
}

function observableChanges() {
	setRandomLinkColor();
	setColorHoverListener();
}

function setColorHoverListener() {
	Array.from(document.querySelectorAll("a, button, input")).forEach((e) => {
		e.addEventListener("mouseover", setRandomLinkColor);
	});

	document.getElementById("brandIcon").addEventListener("mouseover", setRandomLinkColor);
}

function registerObserverById(elementId) {
  const targetNode = document.getElementById(elementId);

  if (targetNode) {
    const config = { childList: true, subtree: true };

    const callback = () => {
      observableChanges();
    };

    const observer = new MutationObserver(callback);

    observer.observe(targetNode, config);
  }
}
	
(function () {
  launchChanges();
  registerObserverById("observableContent");
})();
					`}
				</Script>
			</body>
		</html>
	);
}
