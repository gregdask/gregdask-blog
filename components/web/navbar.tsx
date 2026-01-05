"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SearchInput } from "./searchInput";
import { ThemeProvider } from "../ui/theme-provider";
import { ModeToggle } from "./theme-toggle";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import { Menu, MenuSquareIcon } from "lucide-react";

export function Navbar() {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const router = useRouter();
    const handleLogout = () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Logged out successfully");
                    router.push("/");
                },
                onError: (error) => {
                    toast.error(error.error.message);
                },
            },
        });
    };

    function AuthActions({
        isAuthenticated,
        isLoading,
        onLogout,
    }: {
        isAuthenticated: boolean;
        isLoading: boolean;
        onLogout: () => void;
    }) {
        if (isLoading) return null;

        if (isAuthenticated) {
            return (
                <Button
                    className="w-full"
                    onClick={onLogout}
                >
                    Logout
                </Button>
            );
        }

        return (
            <>
                <Link className={buttonVariants({ className: "w-full" })} href="/auth/sign-up">
                    Sign up
                </Link>
                <Link
                    className={buttonVariants({
                        variant: "outline",
                        className: "w-full",
                    })}
                    href="/auth/login"
                >
                    Login
                </Link>
            </>
        );
    }

    return (
        <nav className="w-full  py-5 flex items-center justify-between">
            <div className="flex items-center gap-8 ">
                <Link href="/">
                    <h1 className="text-3xl font-bold">
                        Greg<span className="text-primary">Dask</span>
                    </h1>
                </Link>

                <div className="flex items-center gap-2">
                    <Link className={buttonVariants({ variant: "ghost" })} href="/">
                        Home
                    </Link>
                    <Link className={buttonVariants({ variant: "ghost" })} href="/blog">
                        Blog
                    </Link>
                    <Link className={buttonVariants({ variant: "ghost" })} href="/create">
                        Create
                    </Link>
                </div>
            </div>

            <div className="md:hidden">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        sideOffset={8}
                        className="w-56 p-2 flex flex-col gap-2"
                    >
                        <Link href="/" className="text-sm font-medium px-2 py-1 rounded hover:bg-muted">
                            Home
                        </Link>

                        <Link href="/blog" className="text-sm font-medium px-2 py-1 rounded hover:bg-muted">
                            Blog
                        </Link>

                        <Link href="/create" className="text-sm font-medium px-2 py-1 rounded hover:bg-muted">
                            Create
                        </Link>

                        <div className="border-t my-1" />

                        <AuthActions
                            isAuthenticated={isAuthenticated}
                            isLoading={isLoading}
                            onLogout={handleLogout}
                        />

                        <ModeToggle />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>


            {/* <MenuIcon className="h-5 md-5 md:hidden" /> */}
            <div className="md:flex items-center gap-2 hidden">
                <div className="hidden md:block mr-2">
                    <SearchInput />
                </div>
                {isLoading ? null : isAuthenticated ? (
                    <Button
                        onClick={() =>
                            authClient.signOut({
                                fetchOptions: {
                                    onSuccess: () => {
                                        toast.success("Logged out successfully");
                                        router.push("/");
                                    },
                                    onError: (error) => {
                                        toast.error(error.error.message);
                                    },
                                },
                            })
                        }
                    >
                        Logout
                    </Button>
                ) : (
                    <>
                        <Link className={buttonVariants()} href="/auth/sign-up">
                            Sign up
                        </Link>
                        <Link
                            className={buttonVariants({ variant: "outline" })}
                            href="/auth/login"
                        >
                            Login
                        </Link>
                    </>
                )}
                <ModeToggle />
            </div>
        </nav>
    );
}