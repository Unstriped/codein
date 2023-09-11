//import CodeCell from "./components/code-cell";
import TextEditor from "./components/text-editor";
import { Provider } from "react-redux";
import { store } from "./state";

function App() {
  return (
    <Provider store={store}>
      <main className="border-box flex h-screen w-screen justify-center overflow-scroll p-4">
        <div className="flex h-full w-full max-w-7xl flex-col gap-4">
          <TextEditor />
        </div>
      </main>
    </Provider>
  );
}

export default App;
