import { EditorView, ViewUpdate } from "@codemirror/view";

type OnChange = (value: string, viewUpdate: ViewUpdate) => void;
type OnUpdate = () => any

export function onUpdate(onChange: OnChange): OnUpdate {
  return EditorView.updateListener.of((viewUpdate: ViewUpdate) => {
    if (viewUpdate.docChanged) {
      const doc = viewUpdate.state.doc;
      const value = doc.toString();
      onChange(value, viewUpdate);
    }
  });
}