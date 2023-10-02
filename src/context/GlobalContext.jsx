import React from "react";

const GlobalContext = React.createContext({
  // bfs: true,
  // setBFS: (index) => {},
  algorithm: "bfs",
  setAlgorithm: (index) => {},
});

export default GlobalContext;
