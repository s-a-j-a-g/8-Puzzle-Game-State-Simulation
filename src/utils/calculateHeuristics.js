import { finalNumbers } from "../data/data";

const calculateHeuristics = (state) => {
  let heuristic = 0;

  for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < state[i].length; j++) {
      if (state[i][j] !== finalNumbers[i][j] && state[i][j] !== null)
        heuristic++;
    }
  }
  return heuristic;
};

export default calculateHeuristics;
