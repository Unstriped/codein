import * as esbuild from "esbuild-wasm";
import { useState, useEffect, useRef } from "react";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

function App() {
  const firstTime = useRef(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [initialized, setInitialized] = useState(false);
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });

    setInitialized(true);
  };

  useEffect(() => {
    if (textareaRef.current) textareaRef.current.focus();
    if (!firstTime.current) {
      firstTime.current = true;
      startService();
    }
  }, []);

  const onClick = async () => {
    if (!initialized) return;

    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    setCode(result.outputFiles[0].text);
  };

  return (
    <div className="p-4 flex flex-col gap-4 max-w-fit">
      <textarea
        ref={textareaRef}
        value={input}
        className="textarea textarea-bordered textarea-accent min-w-[24rem] min-h-[12rem]"
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        disabled={!initialized}
        onClick={onClick}
        className="btn btn-primary btn-sm self-end"
      >
        Submit
      </button>
      <div className="mockup-code mt-8">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export default App;
