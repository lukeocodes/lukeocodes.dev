/**
 * v0 by Vercel.
 * @see https://v0.dev/t/lJwnQlHSEBA
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Home, Lock, PenBox, Pencil } from "lucide-react";
import { type JSX, type SVGProps } from "react";
import * as React from "react";
import Link from "next/link";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/marketing/mode-toggle";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { FontToggle } from "./font-toggle";

export function Navbar(): JSX.Element {
	return (
		<header className="max-w-screen-2xl mx-auto flex justify-between h-20 w-full shrink-0 items-center px-4 md:px-6">
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="lg:hidden">
						<MenuIcon className="size-8" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<div className="mr-6 flex  gap-4">
						<PenBox className="size-6" />
						<h1 className="font-semibold text-lg">SaaS</h1>
					</div>
					<div className="grid gap-2 py-6">
						{/* {links.map(({ name, href, className }) => (
							<Link
								href={href}
								key={`m/link${href.pathname}`}
								className={className.m}
								prefetch={false}
							>
								{name}
							</Link>
						))} */}
						<Link href="/" prefetch={false}>
							Home
						</Link>
						<Link href="/login" prefetch={false}>
							Log in
						</Link>
						<Link href="/signup" prefetch={false}>
							Sign up
						</Link>
					</div>
				</SheetContent>
			</Sheet>
			<div className="flex lg:mr-6 gap-4 text-brand">
				<PenBox className="size-6" />
				<h1 className="font-semibold text-lg">
					SaaS<span className="text-darkest dark:text-lightest">Starter</span>
				</h1>
			</div>
			<nav className="hidden w-full lg:flex gap-6 justify-between">
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<Button variant="link" asChild>
								<Link href="/">
									Home
									<Home
										className="relative ml-2 size-4 transition duration-200 group-data-[state=open]:rotate-180"
										aria-hidden="true"
									/>
								</Link>
							</Button>
						</NavigationMenuItem>
						{/* <NavigationMenuItem>
							<NavigationMenuTrigger>Components</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
									{components.map(component => (
										<ListItem key={component.title} title={component.title} href={component.href}>
											{component.description}
										</ListItem>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
								<Link href={"/docs" as Route}>Documentation</Link>
							</NavigationMenuLink>
						</NavigationMenuItem> */}
					</NavigationMenuList>
				</NavigationMenu>
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<Button variant="link" asChild>
								<Link href="/login">
									Log in
									<Lock
										className="relative ml-2 size-4 transition duration-200 group-data-[state=open]:rotate-180"
										aria-hidden="true"
									/>
								</Link>
							</Button>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Button asChild>
								<Link href="/signup">
									Sign up
									<Pencil
										className="relative ml-2 size-4 transition duration-200 group-data-[state=open]:rotate-180"
										aria-hidden="true"
									/>
								</Link>
							</Button>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<ModeToggle />
						</NavigationMenuItem>
						<NavigationMenuItem>
							<FontToggle />
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</nav>
		</header>
	);
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>): JSX.Element {
	return (
		<svg
			{...props}
			width="44"
			height="44"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M4 14.5L6 14C6.05909 13.9852 6.08903 13.9777 6.11829 13.9707C7.35491 13.6714 8.64509 13.6714 9.88171 13.9707C9.91097 13.9777 9.9409 13.9852 10 14C10.059 14.0148 10.089 14.0223 10.1183 14.0293C11.3549 14.3286 12.6451 14.3286 13.8817 14.0293C13.911 14.0223 13.941 14.0148 14 14C14.0593 13.9852 14.089 13.9778 14.1183 13.9707C15.3549 13.6714 16.6451 13.6714 17.8817 13.9707C17.911 13.9778 17.9407 13.9852 18 14L20 14.5M13 4H11C7.74936 4 5.01623 6.21572 4.22852 9.21926C4.07165 9.81738 3.99322 10.1164 4.16802 10.4568C4.21596 10.5502 4.3119 10.6745 4.39003 10.7446C4.67493 11 5.04996 11 5.8 11H18.2C18.95 11 19.3251 11 19.61 10.7446C19.6881 10.6745 19.784 10.5502 19.832 10.4568C20.0068 10.1164 19.9283 9.81738 19.7715 9.21926C18.9838 6.21572 16.2506 4 13 4ZM7 20H17C18.6569 20 20 18.6569 20 17H4C4 18.6569 5.34315 20 7 20Z" />
		</svg>
	);
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
	({ className, title, children, ...props }, ref) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<a
						ref={ref}
						className={cn(
							"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
							className
						)}
						{...props}
					>
						<div className="text-sm font-medium leading-none">{title}</div>
						<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
					</a>
				</NavigationMenuLink>
			</li>
		);
	}
);
ListItem.displayName = "ListItem";
