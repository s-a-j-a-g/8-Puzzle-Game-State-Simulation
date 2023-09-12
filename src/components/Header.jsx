import { Switch } from "@mui/material";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const Header = ({ generatePossibleState, reset, showGenerateButton }) => {
  const { bfs, setBFS } = useContext(GlobalContext);

  const handelToggle = () => {
    setBFS(!bfs);
  };

  return (
    <div className="content">
      <div className="title-wrapper">
        <h1 className="title">8 Puzzle Game State Simulation</h1>
        <h2 className="title">{`(${bfs ? `BFS` : `DFS`})`}</h2>
      </div>
      <div>
        {showGenerateButton && (
          <button className="button" onClick={generatePossibleState}>
            {bfs ? "Next" : "Generate"}
          </button>
        )}
        <button
          className="button"
          style={{ backgroundColor: "#DD5555" }}
          onClick={reset}
        >
          Reset
        </button>
      </div>

      <div className="toggle-switch">
        <h3>DFS</h3>
        <Switch
          checked={bfs}
          onChange={handelToggle}
          inputProps={{ "aria-label": "controlled" }}
        />
        <h3>BFS</h3>
      </div>
    </div>
  );
};

export default Header;
