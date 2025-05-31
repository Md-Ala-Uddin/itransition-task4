import DataTable from "@/app/ui/users/data-table";
import { User, columns } from "@/app/ui/users/columns";
import prisma from "@/lib/prisma";

async function getUsers(): Promise<User[]> {
    try {
        return await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                address: true, 
                email: true,
                status: true,
                last_login: true
            },
        })
    } catch( err ) {
        console.error('Error fetching users: ', err);
        return [];
    }
}

export default async function Users() {
    const data = await getUsers();
    return (
        <>
            <h1 className="mb-10 text-3xl font-bold">User Management</h1>

            <div className="w-full overflow-auto">
                <DataTable columns={columns} data={data} />
            </div>
        </>
    );
}
