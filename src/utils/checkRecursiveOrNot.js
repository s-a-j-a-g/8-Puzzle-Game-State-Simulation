import checkArrayEqual from "./checkArrayEqual";

// const checkRecursiveOrNot = (stateToCheck, tempArray) => {
//   for (const states of tempArray) {
//     for (const state of states) {
//       if (checkArrayEqual(state.numbers, stateToCheck)) {
//         return true;
//       }
//     }
//   }
//   return false;
// };

const isRecursive = (stateToCheck, stateArray, levelArray) => {
  for (const states of stateArray) {
    for (const state of states) {
      if (checkArrayEqual(state.numbers, stateToCheck)) {
        return true;
      }
    }
  }
  // no need to check for level array in DFS
  if (levelArray) {
    for (const state of levelArray) {
      if (checkArrayEqual(state.numbers, stateToCheck)) {
        return true;
      }
    }
  }

  return false;
};

export default isRecursive;
