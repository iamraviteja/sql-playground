"use client";

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import { ScrollArea } from "@/shadcn/components/ui/scroll-area";

import { Label } from "@/shadcn/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/components/ui/select";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shadcn/components/ui/table";
import { useCSV } from "@/hooks/useCSV";
import { DATA_TYPES } from "@/lib/queryBuilder";

export type TableColFormProps = {
    getData: () => any;
};

export const TableColForm = forwardRef<TableColFormProps>((_, ref) => {
    const { state } = useCSV();
    const [fields, setFields] = useState([]);

    useEffect(() => {
        if (state.results?.meta?.fields) {
            setFields(
                state.results?.meta?.fields.map((f:any) => ({
                    colName: f,
                    colType: DATA_TYPES[0],
                }))
            );
        } else {
            setFields([]);
        }
    }, [state]);

    useImperativeHandle(
        ref,
        function getRefValue() {
            return {
                getData: () => fields,
            };
        },
        [fields]
    );

    const handleTypeSelect = (colName: string, type: string) => {
        let nFeilds = [...fields];
        nFeilds.forEach((f: any) => {
            if (f.colName === colName) {
                f.colType = type;
            }
        });
        setFields([...nFeilds]);
    };

    return (
        <>
            <div className="grid gap-4 py-4">
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Column Name</TableHead>
                                <TableHead>Column Type</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {fields.map((f: any) => {
                                return (
                                    <TableRow key={f.colName}>
                                        <TableCell className="font-semibold">{f.colName}</TableCell>
                                        <TableCell>
                                            <Label htmlFor={f.colName} className="sr-only">
                                                Stock
                                            </Label>
                                            <Select
                                                onValueChange={(e) => handleTypeSelect(f.colName, e)}
                                                defaultValue={f.colType}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {DATA_TYPES.map((t) => {
                                                        return (
                                                            <SelectItem key={t} value={t}>
                                                                {t}
                                                            </SelectItem>
                                                        );
                                                    })}
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </div>
        </>
    );
});