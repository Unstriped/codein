import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect, useRef } from "react";

const TextEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState<string | undefined>("**Hello world!!!**");

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);
  if (editing) {
    return (
      <div ref={ref}>
        <MDEditor value={value} onChange={setValue} />
      </div>
    );
  }
  return (
    <div
      className="card bg-base-300 shadow-xl"
      onClick={() => setEditing(true)}
    >
      <div className="card-body relative">
        <MDEditor.Markdown className="box-border !bg-base-300" source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
