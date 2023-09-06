import CodeCell from "./components/code-cell";

function App() {
  return (
    <main className="border-box flex h-screen w-screen justify-center overflow-scroll p-4">
      <div className="flex h-full w-full max-w-7xl flex-col gap-4">
        <CodeCell />
      </div>
    </main>
  );
}

export default App;
