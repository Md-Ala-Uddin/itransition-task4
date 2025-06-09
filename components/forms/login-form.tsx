"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import InputField from "@/components/forms/input-field";
import { useActionState, startTransition, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { login } from "@/lib/actions";

export default function LoginForm() {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(login, undefined);

    const debouncedFormAction = useDebouncedCallback(
        (formData) => startTransition(() => formAction(formData)),
        300
    );

    useEffect(() => {
        if (state?.success) {
            toast.success(`${state?.message} Redirecting to users page...`);
            router.replace("/users");
            return;
        } else if (state?.message) {
            toast.error(state?.message);
        }
    }, [state?.message, state?.success, router]);

    return (
        <form
            action={debouncedFormAction}
            className="w-full flex flex-col gap-4"
        >
            <InputField
                type="text"
                name="email"
                placeholder="Email"
                error={state?.errors?.email}
            />
            <InputField
                type="password"
                name="password"
                placeholder="Password"
                error={state?.errors?.password}
            />
            <div className="w-full flex justify-start gap-3">
                <Checkbox id="rememberme" name="rememberme" />
                <label htmlFor="rememberme" className=" text-sm">
                    {" "}
                    Remember me
                </label>
            </div>
            <Button type="submit">
                {isPending && <Loader2Icon className="animate-spin" />}
                Login
            </Button>
        </form>
    );
}
