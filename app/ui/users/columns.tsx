"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { formatDistanceToNow } from "date-fns";

export type User = {
    id: string;
    name: string;
    email: string;
    address: string;
    lastLogin: string;
    status: "blocked" | "unblocked";
};

const calculateLastLogin = (date: string | null): string => {
    if (!date) return "-";
    return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const columns: ColumnDef<User>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const name = String(row.getValue("name"));
            const address = String(row.original.address);
            return (
                <div
                    className={clsx("flex flex-col gap-1", {
                        "opacity-50": row.original.status === "blocked",
                    })}
                >
                    <span
                        className={clsx({
                            "line-through": row.original.status === "blocked",
                        })}
                    >
                        {(name && name) || "-"}
                    </span>
                    <p>{address && address}</p>
                </div>
            );
        },
    },
    { accessorKey: "email", header: "Email" },
    {
        accessorKey: "lastLogin",
        header: "Last Seen",
        cell: ({ row }) => calculateLastLogin(row.getValue("lastLogin")),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = String(row.getValue("status"));
            return status.charAt(0).toUpperCase() + status.slice(1);
        },
    },
];
