import DataTable from "@/app/ui/users/data-table";
import { columns } from "@/app/ui/users/columns";
import { getUsers } from "@/lib/data";

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
