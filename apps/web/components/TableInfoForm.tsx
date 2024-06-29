"use client";

import React, { ChangeEvent, forwardRef, useImperativeHandle, useRef } from "react";
import { Rabbit } from "lucide-react";

import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@/shadcn/components/ui/label";
import { Textarea } from "@/shadcn/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/components/ui/select";

export type TableInfoProps = {
    getData: () => any;
};

export const TableInfoForm = forwardRef<TableInfoProps>(function (_, ref) {
    const inputRef = useRef<HTMLInputElement>(null);
    const textRef = useRef<HTMLTextAreaElement>(null);
    const selectRef = useRef<string>();
    const fileInputRef = useRef<File>();

    useImperativeHandle(
        ref,
        function getRefValue() {
            return {
                getData: () => ({
                    name: inputRef.current?.value,
                    description: textRef.current?.value,
                    db_type: selectRef.current,
                    file: fileInputRef.current,
                }),
            };
        },
        []
    );

    const handleFileInputChange = (event: ChangeEvent) => {
        let target = event.target as HTMLInputElement;
        if(target.files && target.files.length > 0) fileInputRef.current = target.files[0];
    };
    return (
        <>
            <form className="grid gap-4 py-4" noValidate>
                <div className="grid gap-4">
                    {/* select database type */}
                    <Label htmlFor="model">Database</Label>
                    <Select
                        onValueChange={(v) => {
                            selectRef.current = v;
                        }}
                    >
                        <SelectTrigger
                            id="model"
                            className="items-start [&_[data-description]]:hidden"
                        >
                            <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="genesis">
                                <div className="flex items-start gap-3 text-muted-foreground">
                                    <Rabbit className="size-5" />
                                    <div className="grid gap-0.5">
                                        <p>
                                            <span className="font-medium text-foreground">
                                                SQLite
                                            </span>
                                        </p>
                                        <p className="text-xs" data-description>
                                            SQL Database in browser powered by wasm.
                                        </p>
                                    </div>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-4">
                    <Label htmlFor="name">Table Name</Label>
                    <Input id="name" defaultValue="" ref={inputRef} />
                </div>
                <div className="grid gap-4">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Type your message here."
                        ref={textRef}
                    />
                </div>
                <div className="grid gap-4">
                    <Label htmlFor="csvfile">Load CSV file</Label>
                    <Input
                        id="csvfile"
                        type="file"
                        onChange={handleFileInputChange}
                        accept=".csv"
                    />
                </div>
            </form>
        </>
    );
});