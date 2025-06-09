import type { user } from '@prisma/client'

export type User = user;
export type UserData = Omit<User, "password">;
export type CreateUser = Pick<
    User,
    "name" | "email" | "password" | "address" | "last_login" | "status"
>;
