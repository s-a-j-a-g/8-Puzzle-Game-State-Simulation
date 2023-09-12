import GlobalContext from "./GlobalContext";
import { useState } from "react";

const ContextWrapper = (props) => {
  const [bfs, setBFS] = useState(true);

  return (
    <GlobalContext.Provider value={{ bfs, setBFS }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
