import checkArrayEqual from "./checkArrayEqual";
import { finalNumbers, initialNumbers } from "../data/data";

const getStateColor = (state) => {
  if (state.isRecursive) return "#a3a3a3";
  if (checkArrayEqual(state.numbers, initialNumbers)) return "orange";
  if (checkArrayEqual(state.numbers, finalNumbers)) return "green";

  return "yellow";
};

export default getStateColor;
