"use client";

import React from "react";
import { MoreHorizontal, PlusCircle } from "lucide-react";

import { Button } from "@/shadcn/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shadcn/components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shadcn/components/ui/table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";
import { DBTableItem, useDBTableList } from "@/hooks/useDBTableList";
import { Badge } from "@/shadcn/components/ui/badge";

function DBTableList({ list }: any) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {list.map(({ id, name, description, status }: DBTableItem) => {
                    return (
                        <TableRow key={id}>
                            <TableCell className="font-medium">{name}</TableCell>
                            <TableCell>{description}</TableCell>
                            <TableCell>
                                <Badge variant="outline">{status}</Badge>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                        <DropdownMenuItem>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}

export function DBTableListCard() {
    const { state: dbTablesState } = useDBTableList();
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Tables</CardTitle>
                    <CardDescription>Manage your tables in the DB.</CardDescription>
                </CardHeader>
                <CardContent>
                    {dbTablesState.items.length == 0 && <div>No tables present...</div>}
                    {dbTablesState.items.length > 0 && (
                        <DBTableList list={dbTablesState.items} />
                    )}
                </CardContent>
                <CardFooter>
                    {dbTablesState.items.length > 0 && (
                        <div className="text-xs text-muted-foreground">
                            Showing <strong>1-{dbTablesState.items.length}</strong> of{" "}
                            <strong>{dbTablesState.items.length}</strong> tables
                        </div>
                    )}
                </CardFooter>
            </Card>
        </>
    );
}