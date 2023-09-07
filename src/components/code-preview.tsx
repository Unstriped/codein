import { useEffect, useRef } from "react";

interface CodePreviewProps {
  code: string;
  bundlingStatus: string;
}

const html = `
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
      const handleError = (err) => {
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color: red"><h4>Runtime Error</h4>' + err + '</div>';
        console.error(err);
      };

      window.addEventListener('error', (event) => {
        handleError(event.error)
      })

      window.addEventListener('message', (event) => {
   
        try {
          eval(event.data);
        } catch(err) {
          handleError(err);
        }
      }, false)
    </script>
  </body>
</html>
`;

const CodePreview: React.FC<CodePreviewProps> = ({ code, bundlingStatus }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      console.log("ccc", code);
      iframe.current.contentWindow.postMessage(code, "*");
    }, 100);
  }, [code]);

  return (
    <>
      {bundlingStatus && (
        <div className="absolute top-5 pl-4 text-red-800">{bundlingStatus}</div>
      )}
      <iframe
        className="h-full w-full"
        ref={iframe}
        sandbox="allow-scripts"
        title="code-render"
        srcDoc={html}
      />
    </>
  );
};

export default CodePreview;
