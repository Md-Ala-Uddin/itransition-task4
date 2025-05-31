"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { formatDistanceToNow } from "date-fns";
import { ArrowUpDown } from "lucide-react";

export type User = {
    id: string | number;
    name: string;
    email: string;
    address: string | null;
    last_login: string | null | Date;
    status: string | null;
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
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "last_login",
        header: "Last Seen",
        cell: ({ row }) => calculateLastLogin(row.getValue("last_login")),
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
