import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  return (
    <div className="mockup-code px-4">
      <Editor language="javascript" height="50vh" />
    </div>
  );
};

export default CodeEditor;
