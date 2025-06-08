import LoginForm from "@/app/ui/forms/login-form";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Page() {
    return (
        <>
            {/* card */}
            <div className="w-sm p-4 flex flex-col items-center justify-center h-full">
                <header className="w-full mb-8 flex flex-col items-center md:items-start">
                    <p>Start your journey</p>
                    <h1 className="text-3xl font-bold mb-4">Sign in The App</h1>
                </header>
                <LoginForm />
            </div>

            {/* footer */}
            <div className="w-full h-30 flex flex-col md:flex-row-reverse justify-start md:justify-between items-center px-4 text-sm">
                <Link
                    href="/forget-password"
                    className={buttonVariants({ variant: "link", size: "sm" })}
                >
                    Forgot password?
                </Link>
                <p>
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className={buttonVariants({
                            variant: "link",
                            size: "sm",
                        })}
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </>
    );
}
