import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import type { User } from "./lib/definitions.ts";
import prisma from "./lib/prisma";
import { z } from "zod";
import bcrypt from "bcrypt";

async function getUser({ email }: { email: string }) {
    return prisma.user.findUnique({
        where: { email },
    });
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(1),
                    })
                    .safeParse(credentials);

                if (!parsedCredentials.success) {
                    throw new Error("Invalid credentials");
                }

                const { email, password } = parsedCredentials.data;
                const user = await getUser({ email });

                if (!user) {
                    throw new Error("User not found");
                }

                const isPasswordValid = await bcrypt.compare(
                    password,
                    user.password
                );
                if (!isPasswordValid) {
                    throw new Error("Invalid password");
                }

                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],
});
