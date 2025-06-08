import { User } from "@/app/ui/users/columns";
import prisma from "@/lib/prisma";

export async function getUsers(): Promise<User[]> {
    try {
        return await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                address: true,
                email: true,
                status: true,
                last_login: true,
            },
            orderBy: {
                last_login: "desc",
            },
        });
    } catch (err) {
        console.error("Error fetching users: ", err);
        return [];
    }
}
