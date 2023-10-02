import {
  Switch,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
} from "@mui/material";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const Header = ({ generatePossibleState, reset, showGenerateButton }) => {
  const { algorithm, setAlgorithm } = useContext(GlobalContext);

  const handleChange = (e) => {
    setAlgorithm(e.target.value);
  };

  return (
    <div className="content">
      <div className="title-wrapper">
        <h1 className="title">8 Puzzle Game State Simulation</h1>
        <h2 className="title">{`(${
          algorithm === "bfs" ? `BFS` : algorithm === "dfs" ? `DFS` : `A-Star`
        })`}</h2>
      </div>
      <div>
        {showGenerateButton && (
          <button className="button" onClick={generatePossibleState}>
            {algorithm === "bfs" || algorithm === "aStar" ? "Next" : "Generate"}
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
        <FormControl sx={{ display: "flex", alignItems: "center" }}>
          <h4 sx={{ fontWeight: 600 }}>Algorithm</h4>
          <RadioGroup
            value={algorithm}
            onChange={handleChange}
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel value="bfs" control={<Radio />} label="BFS" />
            <FormControlLabel value="dfs" control={<Radio />} label="DFS" />
            <FormControlLabel
              value="aStar"
              control={<Radio />}
              label="A-Star"
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default Header;
