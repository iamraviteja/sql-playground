"use client";

import React, { useState, useEffect } from "react";
import { CornerDownLeft } from "lucide-react";

import { Badge } from "@/shadcn/components/ui/badge";
import { Label } from "@/shadcn/components/ui/label";
import { Button } from "@/shadcn/components/ui/button";

import SQLEditor from "@/components/SQLEditor";

import { useDB } from "@/hooks/useDB";
import { ResultTable, ResultTableProps } from "@/components/ResultTable";

function QueryOutputPanel() {
    const { state } = useDB();
    const [code, setCode] = useState<string>("select * from cust_table");
    const [result, setResult] = useState<ResultTableProps | null>(null);

    const handleQueryClick = () => {
        let res: (any[] | null) = null;
        if (state.db) {
            res = state.db.exec(code);
        }
        if (res && res?.length > 0) {
            setResult({
                query: code,
                columns: res[0].columns,
                data: res[0].values,
            })
        }
    };
    return (
        <>
            <div
                className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
            >
                <Label htmlFor="query" className="sr-only">
                    Query
                </Label>
                <SQLEditor
                    value={code}
                    onChange={(newCode: string) => {
                        setCode(newCode);
                    }}
                    extensions={[]}
                    className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                />
                <div className="flex items-center p-3 pt-0">
                    <Button
                        onClick={handleQueryClick}
                        size="sm"
                        className="ml-auto gap-1.5"
                    >
                        Execute Query
                        <CornerDownLeft className="size-3.5" />
                    </Button>
                </div>
            </div>
            <div className="relative flex-1">
                <Badge variant="outline" className="absolute right-3 top-3">
                    Output
                </Badge>
            </div>
            <div className="w-full p-10">
                {result && <ResultTable query={result.query} columns={result.columns} data={result.data} />}
            </div>
        </>
    );
}

export default QueryOutputPanel;