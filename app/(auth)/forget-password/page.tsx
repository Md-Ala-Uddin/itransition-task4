import ForgetPasswordForm from "@/components/forms/forget-password-form";
export default function ForgetPassword() {
    return (
        <>
            {/* card */}
            <div className="w-sm p-4 flex flex-col items-center justify-center h-full">
                <header className="w-full mb-8 flex flex-col items-center md:items-start">
                    <h1 className="text-3xl font-bold mb-4">Reset Your Password</h1>
                    <p>
                        Enter your user account&apos;s verified email address and we will send you a password reset link.
                    </p>
                </header>
                <ForgetPasswordForm />
            </div>
        </>
    );
}
