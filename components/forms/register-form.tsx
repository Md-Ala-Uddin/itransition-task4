"use client";

import { useActionState, startTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/lib/actions";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";
import InputField from "@/components/forms/input-field";

export default function RegisterForm() {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(
        registerUser,
        undefined
    );

    useEffect(() => {
        if (state?.success) {
            toast.success(`${state?.message} Redirecting to login...`);
            router.replace("/login");
        } else if (state?.message) {
            toast.error(state?.message);
        }
    }, [state?.success, state?.message, router]);

    const debouncedFormAction = useDebouncedCallback((formData) => {
        startTransition(() => {
            formAction(formData);
        });
    }, 300);

    return (
        <form
            action={debouncedFormAction}
            className="w-full flex flex-col gap-4"
        >
            <InputField
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                error={state?.errors?.name}
            />
            <InputField
                type="text"
                name="address"
                placeholder="Address (optional)"
                error={state?.errors?.address}
            />
            <InputField
                type="email"
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
            <InputField
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                error={state?.errors?.confirm_password}
            />
            {state?.errors?.form && (
                <span className="text-destructive text-xs mt-1">
                    {state.errors.form}
                </span>
            )}
            <Button type="submit" disabled={isPending}>
                {isPending && <Loader2Icon className="animate-spin" />}
                Register
            </Button>
        </form>
    );
}
