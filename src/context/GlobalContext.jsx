import React from "react";

const GlobalContext = React.createContext({
  algorithm: "bfs",
  setAlgorithm: (index) => {},
});

export default GlobalContext;
