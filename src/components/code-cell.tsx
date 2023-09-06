import { useEffect, useState } from "react";
import CodeEditor from "./code-editor";
import CodePreview from "./code-preview";
import bundler from "../bundler";

function CodeCell() {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundler(input);
      setCode(output);
      console.log(output);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <section className="flex flex-1 gap-4">
      <div className="flex flex-1 flex-col gap-4">
        <CodeEditor
          onChange={(e) => {
            if (e) setInput(e);
          }}
        />
      </div>
      <div className="flex-1">
        <CodePreview code={code} />
      </div>
    </section>
  );
}

export default CodeCell;
