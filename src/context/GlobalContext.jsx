import React from "react";

const GlobalContext = React.createContext({
  bfs: true,
  setBFS: (index) => {},
});

export default GlobalContext;
