import { useContext, useEffect } from "react";
import BFS from "./features/BFS";
import DFS from "./features/DFS";
import GlobalContext from "./context/GlobalContext";
import AStar from "./features/AStar";

function App() {
  const { algorithm } = useContext(GlobalContext);

  useEffect(() => {
    const originalWarn = console.warn;
    console.warn = function () {};
    return () => {
      console.warn = originalWarn;
    };
  }, []);

  // return <div className="container">{bfs ? <BFS /> : <DFS />}</div>;
  return (
    <div className="container">
      {algorithm === "aStar" && <AStar />}
      {algorithm === "bfs" && <BFS />}
      {algorithm === "dfs" && <DFS />}
    </div>
  );
}

export default App;
