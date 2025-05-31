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

export default function Navbar() {
    const isLoggedIn = false;
    return (
        <nav className="w-full flex justify-between items-center px-8 md:px-16 py-4 border-b shadow-sm">
            <Link href="/">
                <Logo />
            </Link>

            <NavigationMenu>
                {isLoggedIn ? (
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                asChild
                                className={navigationMenuTriggerStyle()}
                            >
                                <Button asChild variant="outline">
                                    <Link href="/">Logout</Link>
                                </Button>
                            </NavigationMenuLink>
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
