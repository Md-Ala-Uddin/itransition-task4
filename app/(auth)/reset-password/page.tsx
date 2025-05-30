import ResetPasswordForm from "@/app/ui/forms/reset-password-form";

export default function ResetPassword() {
    return (
        <>
            {/* card */}
            <div className="w-sm p-4 flex flex-col items-center justify-center h-full">
                <header className="w-full mb-8 flex flex-col items-center md:items-start">
                    <h1 className="text-3xl font-bold mb-4">Reset Password</h1>
                </header>
                <ResetPasswordForm />
            </div>
        </>
    );
}
