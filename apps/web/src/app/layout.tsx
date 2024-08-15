import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Metadata } from "next";
import { Noto_Sans_Mono as Noto } from "next/font/google";
import { clsx } from "clsx";
import Script from "next/script";
import { Providers } from "@/app/providers";
import { Footer } from "@/components/footer";
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

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<html lang="en" className={clsx("h-full antialiased", noto.variable)} suppressHydrationWarning>
			<body id="observableContent" className="min-h-full bg-zinc-200 dark:bg-zinc-900">
				<Providers>
					<Header />
					<main className="mx-auto max-w-screen-2xl typography">{children}</main>
					<Footer />
				</Providers>
				<Analytics />
				<SpeedInsights />
				<Script id="colorful">
					{`let colors = [
	"HSL(11, 100%, 63.3%)",
	"HSL(30, 100%, 60%)",
	"HSL(56, 85.7%, 43.9%)",
	"HSL(96, 69.8%, 48%)",
	"HSL(186, 83.3%, 40%)",
	"HSL(240, 69.2%, 56.7%)",
];

function getRandomColor() {
	return colors[Math.floor(Math.random() * colors.length)];
}

function setRandomLinkColor() {
	document.documentElement.style.setProperty('--brand', getRandomColor())

	const links = Array.from(document.getElementsByTagName("a"));

	if (links.length > 0) {
		links.forEach((e) => {
			e.style.textDecorationColor = getRandomColor();
		});
	}

	const inputs = Array.from(document.getElementsByTagName("input"));

	if (inputs.length > 0) {
		inputs.forEach((e) => {
			e.style.borderBottomColor = getRandomColor();
		});
	}
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
	const elements = Array.from(document.querySelectorAll("a, button, input"));

	if (elements.length > 0) {
		elements.forEach((e) => {
			e.addEventListener("mouseover", setRandomLinkColor);
		});
	}

	const icon = document.getElementById("brandIcon");

	if (icon) {
		icon.addEventListener("mouseover", setRandomLinkColor);
	}
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
