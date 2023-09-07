import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import prettier from "prettier/standalone";
import babelPlugin from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";
import { useRef } from "react";

interface CodeEditorProps {
  onChange(value: string | undefined): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange }) => {
  const editorRef = useRef<any>();
  function onEditorMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
  }
  async function onFormatClick() {
    const unformatted = editorRef.current.getModel().getValue();

    const formatted = await prettier.format(unformatted, {
      parser: "babel",
      plugins: [babelPlugin, estreePlugin],
      semi: true,
    });

    editorRef.current.setValue(formatted);
  }

  return (
    <div className="mockup-code relative flex h-full flex-col gap-2">
      <button
        className="btn btn-secondary btn-xs mr-2 self-end"
        onClick={onFormatClick}
      >
        Format Code
      </button>
      <Editor
        onMount={onEditorMount}
        defaultValue="// Write some code here :)"
        defaultLanguage="javascript"
        height="70vh"
        className="flex-1"
        options={{ wordWrap: "on", automaticLayout: true }}
        onChange={onChange}
      />
    </div>
  );
};

export default CodeEditor;
