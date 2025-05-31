import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Logo from "@/app/ui/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import LogoutButton from "@/app/ui/forms/logout-button";

export default async function Navbar() {
    const session = await auth();
    const isLoggedIn = !!session?.user;

    return (
        <nav className="w-full flex justify-between items-center px-8 md:px-16 py-4 border-b shadow-sm">
            <Link href="/">
                <Logo />
            </Link>

            <NavigationMenu>
                {isLoggedIn ? (
                    <NavigationMenuList>
                        <NavigationMenuItem>
                                <LogoutButton />
                        </NavigationMenuItem>
                    </NavigationMenuList>
                ) : (
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                asChild
                                className={navigationMenuTriggerStyle()}
                            >
                                <Button asChild variant="outline">
                                    <Link href="/login">Login</Link>
                                </Button>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                asChild
                                className={navigationMenuTriggerStyle()}
                            >
                                <Button asChild variant="outline">
                                    <Link href="/register">Register</Link>
                                </Button>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                )}
            </NavigationMenu>
        </nav>
    );
}
