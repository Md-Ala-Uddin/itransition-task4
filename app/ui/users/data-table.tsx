"use client";
import { startTransition, useActionState, useState } from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2Icon, LockKeyhole, LockKeyholeOpen, Trash } from "lucide-react";
import { blockUsers, unblockUsers, deleteUsers } from "@/lib/actions";

interface DataTableProps<TData extends { id: number }> {
    columns: ColumnDef<TData>[];
    data: TData[];
}

export default function DataTable<TData extends { id: number }>({
    columns,
    data,
}: DataTableProps<TData>) {
    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            rowSelection,
            sorting,
            columnFilters,
        },
    });

    const selectedIds = table
        .getSelectedRowModel()
        .rows.map((row) => row.original.id);
        
    const blockUsersWithIds = blockUsers.bind(null, selectedIds);
    const unblockUsersWithIds = unblockUsers.bind(null, selectedIds);
    const deleteUsersWithIds = deleteUsers.bind(null, selectedIds);

    const [blockState, blockAction, blockPending] = useActionState(
        blockUsersWithIds,
        undefined
    );
    const [unblockState, unblockAction, unblockPending] = useActionState(
        unblockUsersWithIds,
        undefined
    );
    const [deleteState, deleteAction, deletePending] = useActionState(
        deleteUsersWithIds,
        undefined
    );

    return (
        <div className="min-w-max flex flex-col">
            {/* Table Heading */}
            <div className="w-full mb-2 flex justify-between">
                <div className="flex gap-1">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startTransition(blockAction)}
                    >
                        {blockPending && (
                            <Loader2Icon className="animate-spin" />
                        )}
                        <LockKeyhole /> Block
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startTransition(unblockAction)}
                    >
                        {unblockPending && (
                            <Loader2Icon className="animate-spin" />
                        )}
                        <LockKeyholeOpen />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startTransition(deleteAction)}
                    >
                        {deletePending && (
                            <Loader2Icon className="animate-spin" />
                        )}
                        <Trash />
                    </Button>
                </div>
                <div className="">
                    <Input
                        value={
                            (table
                                .getColumn("email")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(e) =>
                            table
                                .getColumn("email")
                                ?.setFilterValue(e.target.value)
                        }
                        name="filterText"
                        placeholder="Search"
                    />
                </div>
            </div>
            {/* Table */}
            <div className="">
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No Results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
