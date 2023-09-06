import { useEffect, useRef } from "react";

interface CodePreviewProps {
  code: string;
}

const html = `
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
      window.addEventListener('message', (event) => {
        const handleError = (err) => {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
          console.error(err);
        };
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

const CodePreview: React.FC<CodePreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      console.log("ccc", code);
      iframe.current.contentWindow.postMessage(code, "*");
    }, 100);
  }, [code]);

  return (
    <iframe
      className="h-full w-full"
      ref={iframe}
      sandbox="allow-scripts"
      title="code-render"
      srcDoc={html}
    />
  );
};

export default CodePreview;
