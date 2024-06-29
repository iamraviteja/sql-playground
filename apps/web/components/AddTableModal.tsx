"use client";

import React, { useRef } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/shadcn/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcn/components/ui/dialog";
import { useCreateTableForm } from "@/hooks/useCreateTableForm";
import { TableInfoForm, TableInfoProps } from "@/components/TableInfoForm";
import { TableColForm, TableColFormProps } from "@/components/TableColForm";
import { useCSV } from "@/hooks/useCSV";
import { useDB } from "@/hooks/useDB";
import { createTable } from "@/lib/queryBuilder";
import { useDBTableList } from "@/hooks/useDBTableList";

const FORM_INFO = {
    table_info: {
        title: "Create Table",
        description:
            "Make changes to your table here. Click next when you're done.",
        action_label: "Next",
    },
    update_cols: {
        title: "Update Columns",
        description:
            "Make changes to your table columns here. Click save when you're done.",
        action_label: "Save",
    },
};

export function AddTableModal() {
    const { state, setTableName, resetFormState, updateTableCols } =
        useCreateTableForm();
    const { state: csvState, setFile } = useCSV();
    const { state: dbState } = useDB();
    const { state: dbList, addTableItem } = useDBTableList();

    const formRef = useRef<TableInfoProps>(null);
    const colsRef = useRef<TableColFormProps>(null);

    const handleFormAction = () => {
        switch (state.form_state) {
            case "table_info":
                let { name, description, file } = formRef.current?.getData();
                if (name && name.trim() !== "") {
                    // add validation
                    let tableInfo = {
                        name,
                        description,
                        status: "draft",
                    };
                    setFile(file);
                    setTableName(tableInfo);
                }
                break;
            case "update_cols":
                const fields = colsRef.current?.getData();
                let id = (dbList.items.length + 1).toString();
                createTable(
                    dbState.db,
                    state.table_info?.name || "sample_table",
                    csvState.results.data,
                    fields
                );
                updateTableCols(fields);
                addTableItem({
                    id,
                    name: state.table_info?.name || "",
                    description: state.table_info?.description || "",
                    status: state.table_info?.status || "",
                    fields,
                });
                resetFormState();
                break;
            default:
                break;
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Table
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{FORM_INFO[state.form_state].title}</DialogTitle>
                    <DialogDescription>
                        {FORM_INFO[state.form_state].description}
                    </DialogDescription>
                </DialogHeader>
                {state.form_state === "table_info" && <TableInfoForm ref={formRef} />}
                {state.form_state === "update_cols" && <TableColForm ref={colsRef} />}
                <DialogFooter>
                    <Button onClick={handleFormAction}>
                        {FORM_INFO[state.form_state].action_label}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}