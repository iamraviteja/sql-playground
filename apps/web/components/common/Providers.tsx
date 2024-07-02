"use client";

import { TooltipProvider } from "@/shadcn/components/ui/tooltip";
import { SQLiteDBProvider } from "@/hooks/useDB";
import { CSVParserProvider } from "@/hooks/useCSV";
import { DBTableListProvider } from "@/hooks/useDBTableList";

export function Providers({ children }: any) {
    return (
        <CSVParserProvider>
            <SQLiteDBProvider>
                <DBTableListProvider>
                    <TooltipProvider>
                        {children}
                    </TooltipProvider>
                </DBTableListProvider>
            </SQLiteDBProvider>
        </CSVParserProvider>
    )
}