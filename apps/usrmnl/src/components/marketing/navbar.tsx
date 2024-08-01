"use server";

import { Home, LogIn, LogOut, MenuIcon, PenBox, Pencil } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "../ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";
import { FontToggle } from "./font-toggle";

export async function Navbar(): Promise<JSX.Element> {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

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
						<Link href="/" prefetch={false}>
							Home
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
									<Home className="ml-2 size-4" aria-hidden="true" />
								</Link>
							</Button>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
				<NavigationMenu className="gap-x-4">
					{user ? (
						<NavigationMenuList>
							<NavigationMenuItem>{JSON.stringify(user.email)}</NavigationMenuItem>
							<NavigationMenuItem>
								<Button variant="link" asChild>
									<Link href="/auth/logout">
										Log out
										<LogOut className="ml-2 size-5" />
									</Link>
								</Button>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Button asChild>
									<Link href="/dashboard">
										Dashboard
										<PenBox className="ml-2 size-4" />
									</Link>
								</Button>
							</NavigationMenuItem>
						</NavigationMenuList>
					) : (
						<NavigationMenuList>
							<NavigationMenuItem>
								<Button variant="link" asChild>
									<Link href="/auth/login">
										Log in
										<LogIn className="ml-2 size-5" />
									</Link>
								</Button>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Button asChild>
									<Link href="/auth/signup">
										Sign up
										<Pencil className="ml-2 size-4" />
									</Link>
								</Button>
							</NavigationMenuItem>
						</NavigationMenuList>
					)}
					<NavigationMenuList>
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
