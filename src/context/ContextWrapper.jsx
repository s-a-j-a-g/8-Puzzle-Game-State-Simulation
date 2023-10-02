import GlobalContext from "./GlobalContext";
import { useState } from "react";

const ContextWrapper = (props) => {
  const [algorithm, setAlgorithm] = useState("bfs");

  return (
    <GlobalContext.Provider value={{ algorithm, setAlgorithm }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
