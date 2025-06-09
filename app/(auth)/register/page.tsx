import RegisterForm from "@/components/forms/register-form";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Page() {
    return (
        <>
            {/* card */}
            <div className="w-sm p-4 flex flex-col items-center justify-center h-full">
                <header className="w-full mb-8 flex flex-col items-center md:items-start">
                    <p>Start your journey</p>
                    <h1 className="text-3xl font-bold mb-4">
                        Register in The App
                    </h1>
                </header>
                <RegisterForm />
            </div>

            {/* footer */}
            <div className="w-full h-30 flex flex-col md:flex-row justify-start md:justify-between items-center px-4 text-sm">
                <p>
                    Have an account?
                    <Link
                        href="/login"
                        className={buttonVariants({
                            variant: "link",
                            size: "sm",
                        })}
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </>
    );
}
