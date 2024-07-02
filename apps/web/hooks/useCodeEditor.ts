// use-code-editor.ts
"use client";

import { useEffect } from "react";
import { EditorView } from "codemirror";
import {onUpdate} from "./onUpdate";
import useCodeMirror from "./useCodeMirror";

function updateToMinNumberOfLines(editor: EditorView, minNumOfLines: number) {
  const currentNumOfLines = editor.state.doc.lines;
  const currentStr = editor.state.doc.toString();
  if (currentNumOfLines >= minNumOfLines) {
      return;
  }
  const lines = minNumOfLines - currentNumOfLines;
  const appendLines = "\n".repeat(lines);
  editor.dispatch({
      changes: {from: currentStr.length, insert: appendLines}
  })
}

export function useCodeEditor({ value, onChange, extensions }: any) {
  const { ref, view } = useCodeMirror([onUpdate(onChange), ...extensions]);

  useEffect(() => {
    if (view) {
      const editorValue = view.state.doc.toString();

      updateToMinNumberOfLines(view, 5);

      if (value !== editorValue) {
        view.dispatch({
          changes: {
            from: 0,
            to: editorValue.length,
            insert: value || "",
          },
        });
      }
    }
  }, [value, view]);

  return ref;
}