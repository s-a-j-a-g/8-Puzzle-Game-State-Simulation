import { useContext, useEffect } from "react";
import BFS from "./features/BFS";
import DFS from "./features/DFS";
import GlobalContext from "./context/GlobalContext";

function App() {
  const { bfs } = useContext(GlobalContext);

  useEffect(() => {
    const originalWarn = console.warn;
    console.warn = function () {};
    return () => {
      console.warn = originalWarn;
    };
  }, []);

  return <div className="container">{bfs ? <BFS /> : <DFS />}</div>;
}

export default App;
