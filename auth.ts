import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
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

                // Check if user is blocked
                if (user.status === 'blocked') {
                    throw new Error("Your account has been blocked. Please contact support.");
                }

                const isPasswordValid = await bcrypt.compare(
                    password,
                    user.password
                );
                if (!isPasswordValid) {
                    throw new Error("Invalid password");
                }

                // Update last_login
                await prisma.user.update({
                    where: { email },
                    data: { last_login: new Date() }
                });

                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],
});
