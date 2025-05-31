import DataTable from "@/app/ui/users/data-table";
import { User, columns } from "@/app/ui/users/columns";

async function getUsers(): Promise<User[]> {
    return [
        {
            id: "1",
            name: "John Doe",
            email: "john@gmail.com",
            lastLogin: "2023-10-01T12:00:00Z",
            status: 'unblocked',
            address: "123 Main St, Springfield, USA",
        },
        {
            id: "2",
            name: "Manna Doe",
            email: "manna@gmail.com",
            lastLogin: "2023-10-01T12:00:00Z",
            status: 'blocked',
            address: "456 Elm St, Springfield, USA",
        },
    ];
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
