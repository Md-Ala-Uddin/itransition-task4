import DataTable from "@/components/users/data-table";
import { columns } from "@/components/users/columns";
import { getUsers } from "@/lib/data";
import { UserData } from '@/lib/definitions'

export default async function Users() {
    const data = await getUsers();
    return (
        <>
            <h1 className="mb-10 text-3xl font-bold">User Management</h1>

            <div className="w-full overflow-auto">
                <DataTable<UserData> columns={columns} data={data} />
            </div>
        </>
    );
}
