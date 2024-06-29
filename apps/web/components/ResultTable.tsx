"use client";

import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shadcn/components/ui/table";

export type ResultTableProps = {
    query: string;
    columns: string[];
    data: any[];
};

export function ResultTable({ query, columns, data }: ResultTableProps) {
    return (
        <Table>
            <TableCaption>Query : {query}</TableCaption>
            <TableHeader>
                <TableRow>
                    {columns.map((name: string) => {
                        return <TableHead key={name}>{name}</TableHead>;
                    })}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((value: any, index: number) => (
                    <TableRow key={`row_${index}`}>
                        {value.map((v: any, i: number) => {
                            return <TableCell key={columns[i]}>{v}</TableCell>;
                        })}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}