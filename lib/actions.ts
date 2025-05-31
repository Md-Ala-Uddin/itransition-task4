"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

const LoginFormSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password must be at least 1 character"),
});

export async function login(
    prevState: FormState | undefined,
    formData: FormData
) {
    const data = Object.fromEntries(formData.entries());
    const validatedFields = LoginFormSchema.safeParse(data);
    if (!validatedFields.success) {
        const fieldErrors = validatedFields.error.flatten().fieldErrors;
        return {
            message: "validattion Failed",
            success: false,
            errors: fieldErrors,
        };
    }

    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        message: "Invalid Credentials",
                        success: false,
                    };
                default:
                    return {
                        message: "Something went wrong",
                        success: false,
                    };
            }
        }

        throw error;
    }

    return {
        message: "Login successful",
        success: true,
    };
}

const RegisterUserSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        address: z.string().optional(),
        email: z.string().email("Invalid email address"),
        password: z.string().min(1, "Password must be at least 1 characters"),
        confirm_password: z
            .string()
            .min(1, "Confirm password must be at least 1 characters"),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords do not match",
    });

export type FormState = {
    message?: string;
    success?: boolean;
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirm_password?: string[];
        address?: string[];
        form?: string[];
    };
};

export async function registerUser(
    prevState: FormState | undefined,
    formData: FormData
): Promise<FormState> {
    const data = Object.fromEntries(formData.entries());
    const validatedFields = RegisterUserSchema.safeParse(data);

    if (!validatedFields.success) {
        const fieldErrors = validatedFields.error.flatten().fieldErrors;
        return {
            message: "Validation failed",
            success: false,
            errors: fieldErrors,
        };
    }

    const { email, password, name, address } = validatedFields.data;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                address: address || undefined,
            },
        });
    } catch (error) {
        return {
            message: "Registration failed",
            success: false,
            errors: {
                form: [
                    "An error occurred while registering. Please try again later.",
                ],
            },
        };
    }

    return {
        message: "Registration successful",
        success: true,
    };
}
