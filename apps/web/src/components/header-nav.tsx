"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

function ThemeIcon({
	theme,
	...props
}: { theme: string | undefined } & React.ComponentPropsWithoutRef<"svg">): JSX.Element {
	return (
		<>
			{theme === "dark" ? (
				// Sun icon for dark mode (clicking will switch to light)
				<SunIcon aria-hidden="true" {...props} />
			) : (
				// Moon icon for light mode (clicking will switch to dark)
				<MoonIcon aria-hidden="true" {...props} />
			)}
		</>
	);
}

const navigation = [
	{ name: "Home", href: "/" },
	{ name: "Uses", href: "/uses" },
	{ name: "User manual", href: "/user-manual" },
	{ name: "Politics", href: "/open-letter-politics" },
	{ name: "AI", href: "/open-letter-ai" },
];

function classNames(...classes: string[]): string {
	return classes.filter(Boolean).join(" ");
}

export function Header(): JSX.Element {
	const pathname = usePathname();
	const [mounted, setMounted] = useState(false);
	const { resolvedTheme, setTheme } = useTheme();
	const otherTheme = resolvedTheme === "dark" ? "light" : "dark";

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		// eslint-disable-next-line react/jsx-no-useless-fragment -- Required for the return type
		return <></>;
	}
	// outline outline-[1px] outline-zinc-900 dark:outline-slate-400

	return (
		<Disclosure
			as="nav"
			className="z-50 sticky top-0 bg-zinc-200 dark:bg-zinc-900 shadow-[0px_5px_5px_-2px_#18181b30] dark:shadow-[0px_5px_5px_-2px_#94a3b830]"
		>
			{({ open }) => (
				<>
					<div className="mx-auto max-w-screen-2xl">
						<div className="relative flex h-16 items-center justify-between">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<DisclosureButton className="relative ml-2 inline-flex items-center justify-center rounded-md p-2">
									<span className="absolute -inset-0.5" />
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
									)}
								</DisclosureButton>
							</div>
							<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										{navigation.map(item => (
											<Link
												key={item.name}
												href={{ pathname: item.href }}
												className={classNames(
													pathname === item.href
														? "bg-white/50 dark:bg-black/50"
														: "text-black/70 dark:text-white/70 hover:text-black hover:dark:text-white",
													"rounded-md px-3 py-2 font-medium"
												)}
												style={{ textDecorationColor: "var(--brand)" }}
												aria-current={pathname === item.href ? "page" : undefined}
											>
												{item.name}
											</Link>
										))}
									</div>
								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-2">
								<Link
									href="https://www.linkedin.com/in/lukeocodes"
									target="_blank"
									rel="noopener noreferrer"
									className="relative rounded-full p-1 hover:text-[color:var(--brand)]"
								>
									<span className="sr-only">LinkedIn Profile</span>
									<svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
										<path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
									</svg>
								</Link>

								<Link
									href="https://bsky.app/profile/lu.ke.wtf"
									target="_blank"
									rel="noopener noreferrer"
									className="relative rounded-full p-1 hover:text-[color:var(--brand)]"
								>
									<span className="sr-only">Bluesky Profile</span>
									<svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
										<path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z" />
									</svg>
								</Link>

								<button
									type="button"
									className="relative rounded-full p-1 hover:text-[color:var(--brand)]"
									onClick={() => {
										setTheme(otherTheme);
									}}
								>
									<span className="sr-only">Switch to {otherTheme} theme</span>
									<ThemeIcon
										theme={resolvedTheme}
										className="h-6 w-6 fill-current"
										aria-hidden="true"
									/>
								</button>
							</div>
						</div>
					</div>

					<DisclosurePanel className="sm:hidden">
						<div className="space-y-1 px-2 pb-3 pt-2">
							{navigation.map(item => (
								<DisclosureButton
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										pathname === item.href
											? "bg-white/50 dark:bg-black/50"
											: "text-black/70 dark:text-white/70 hover:text-black hover:dark:text-white",
										"block rounded-md px-3 py-2 font-medium"
									)}
									style={{ textDecorationColor: "var(--brand)" }}
									aria-current={pathname === item.href ? "page" : undefined}
								>
									{item.name}
								</DisclosureButton>
							))}
						</div>
					</DisclosurePanel>
					{/* <div className="w-full h-[0.1rem] dark:bg-white/10 bg-black/10" /> */}
				</>
			)}
		</Disclosure>
	);
}
