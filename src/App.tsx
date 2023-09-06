import * as esbuild from "esbuild-wasm";
import { useState, useEffect, useRef } from "react";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

function App() {
  const firstTime = useRef(false);
  const iframe = useRef<any>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [initialized, setInitialized] = useState(false);
  const [input, setInput] = useState("");

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.19.2/esbuild.wasm",
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

    iframe.current.srcdoc = html;

    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
  };

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch(err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: darkred;">' + err + '</div>'
              throw err;
            }
          }, false)
        </script>
      </body>
    </html>
  `;

  return (
    <div className="flex max-w-fit flex-col gap-4 p-4">
      <textarea
        ref={textareaRef}
        value={input}
        className="textarea textarea-bordered textarea-accent min-h-[12rem] min-w-[24rem]"
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        disabled={!initialized}
        onClick={onClick}
        className="btn btn-primary btn-sm self-end"
      >
        Submit
      </button>

      <div className="rounded-md border border-solid border-slate-400 p-4">
        <iframe
          ref={iframe}
          sandbox="allow-scripts"
          title="code-render"
          srcDoc={html}
        />
      </div>
    </div>
  );
}

export default App;
