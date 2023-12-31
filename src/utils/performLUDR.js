import { finalNumbers, initialState } from "../data/data";
import checkArrayEqual from "./checkArrayEqual";
import isRecursive from "./checkRecursiveOrNot";
import checkValidMove from "./checkVaildMove";

let tempArray = [[initialState]];
let finalStateFound = false;
let count = 0;

const performLUDR = (state, transition) => {
  if (state.isRecursive || finalStateFound) return;
  let result, newState;

  const arrayLevel = state.id.length;

  let childIndex;
  if (transition === "L") childIndex = 1;
  if (transition === "U") childIndex = 2;
  if (transition === "D") childIndex = 3;
  if (transition === "R") childIndex = 4;

  result = checkValidMove(state.numbers, transition);
  if (result) {
    count++;
    let { currentPosition, nextPosition } = result;

    newState = structuredClone(state);

    if (transition === "L" || transition === "R") {
      newState.numbers[currentPosition.i][currentPosition.j] =
        newState.numbers[nextPosition.i][nextPosition.possibleJ];
      newState.numbers[nextPosition.i][nextPosition.possibleJ] = null;
    }
    if (transition === "U" || transition === "D") {
      newState.numbers[currentPosition.i][currentPosition.j] =
        newState.numbers[nextPosition.possibleI][nextPosition.j];
      newState.numbers[nextPosition.possibleI][nextPosition.j] = null;
    }

    if (isRecursive(newState.numbers, tempArray)) newState.isRecursive = true;

    newState.transition = transition;
    newState.id = `${state.id}${childIndex}`;
    newState.parentId = `${state.id}`;

    newState.count = count;

    const newArray = [...tempArray];
    newArray[arrayLevel]
      ? newArray[arrayLevel].push(newState)
      : (newArray[arrayLevel] = [newState]);
    tempArray = [...newArray];

    if (checkArrayEqual(newState.numbers, finalNumbers)) {
      finalStateFound = true;
      return;
    }

    generatePossibleState(newState);
  }
  return;
};

const generatePossibleState = (state) => {
  if (!finalStateFound) {
    performLUDR(state, "L");
    performLUDR(state, "U");
    performLUDR(state, "D");
    performLUDR(state, "R");
  }

  return tempArray;
};

export default generatePossibleState;
