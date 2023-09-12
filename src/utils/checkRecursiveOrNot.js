import checkArrayEqual from "./checkArrayEqual";

const checkRecursiveOrNot = (stateToCheck, tempArray) => {
  for (const states of tempArray) {
    for (const state of states) {
      if (checkArrayEqual(state.numbers, stateToCheck)) {
        return true;
      }
    }
  }
  return false;
};

export default checkRecursiveOrNot;
