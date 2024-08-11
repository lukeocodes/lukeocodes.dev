"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function ThemeIcon(props: React.ComponentPropsWithoutRef<"svg">): JSX.Element {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-5-8a5 5 0 0 0 5 5V7a5 5 0 0 0-5 5Z"
			/>
		</svg>
	);
}

const navigation = [
	{ name: "Home", href: "/", initialColor: "#24d05a" },
	{ name: "Uses", href: "/uses", initialColor: "#eb4888" },
	{ name: "User manual", href: "/user-manual", initialColor: "#10a2f5" },
	// { name: "Content", href: "/content" },
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

	return (
		<Disclosure as="nav" className="z-[100] bg-zinc-200 dark:bg-zinc-900 shadow-md">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl">
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
												style={{ textDecorationColor: item.initialColor }}
												aria-current={pathname === item.href ? "page" : undefined}
											>
												{item.name}
											</Link>
										))}
									</div>
								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<button
									type="button"
									className="relative rounded-full p-1"
									onClick={() => {
										setTheme(otherTheme);
									}}
								>
									<span className="sr-only">Switch to {otherTheme} theme</span>
									<ThemeIcon className="h-6 w-6 fill-current" aria-hidden="true" />
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
									aria-current={pathname === item.href ? "page" : undefined}
								>
									{item.name}
								</DisclosureButton>
							))}
						</div>
					</DisclosurePanel>
					<div className="w-full h-[0.1rem] dark:bg-white/10 bg-black/10" />
				</>
			)}
		</Disclosure>
	);
}
