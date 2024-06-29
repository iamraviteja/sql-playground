// use-code-mirror.ts
import { useEffect, useRef, useState } from "react";
import { EditorView, basicSetup } from "codemirror";
import { sql } from "@codemirror/lang-sql";

export default function useCodeMirror(extensions: any[]) {
  const ref = useRef<Element | DocumentFragment | undefined>();
  const [view, setView] = useState<EditorView>();

  useEffect(() => {
    const view: EditorView = new EditorView({
      extensions: [
        basicSetup,
        /**
         * Check each language package to see what they support,
         * for instance javascript can use typescript and jsx.
         */
        sql(),
        ...extensions,
      ],
      parent: ref.current,
    });

    setView(view);

    /**
     * Make sure to destroy the codemirror instance
     * when our components are unmounted.
     */
    return () => {
      view.destroy();
      setView(undefined);
    };
  }, []);

  return { ref, view };
}