"use client";

import React from "react";

import { useCodeEditor } from "@/hooks/useCodeEditor";

export default function SQLEditor({ value, onChange, extensions, className }: any) {
    const ref: any = useCodeEditor({ value, onChange, extensions });

    return <div className={className} ref={ref} />;
}