import { Switch } from "@mui/material";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const Header = ({ generatePossibleState, reset, level }) => {
  const { bfs, setBFS } = useContext(GlobalContext);

  const handelToggle = () => {
    setBFS(!bfs);
  };

  return (
    <div className="content">
      <h1 className="title">8 Puzzle Game State Simulation</h1>
      <div>
        <button className="button" onClick={generatePossibleState}>
          Next
        </button>
        <button
          className="button"
          style={{ backgroundColor: "#DD5555" }}
          onClick={reset}
        >
          Reset
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h3>DFS</h3>
        <Switch
          checked={bfs}
          onChange={handelToggle}
          inputProps={{ "aria-label": "controlled" }}
        />
        <h3>BFS</h3>
      </div>
      <h3>{`Level: ${level}`}</h3>
    </div>
  );
};

export default Header;
