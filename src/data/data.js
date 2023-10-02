import calculateHeuristics from "../utils/calculateHeuristics";

export const initialNumbers = [
  [2, 8, 3],
  [1, 6, 4],
  [7, null, 5],
];

// export const finalNumbers = [
//   [8, null, 3],
//   [2, 6, 4],
//   [1, 7, 5],
// ];

export const finalNumbers = [
  [1, 2, 3],
  [8, null, 4],
  [7, 6, 5],
];

const initalhN = calculateHeuristics(initialNumbers);
export const initialState = {
  numbers: initialNumbers,
  id: "1",
  parentId: "",
  transition: "",
  isRecursive: false,
  count: 0,
  gN: 0,
  hN: initalhN,
};
