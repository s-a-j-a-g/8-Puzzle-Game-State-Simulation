import { finalNumbers, initialState } from "../data/data";
import checkArrayEqual from "./checkArrayEqual";
import checkRecursiveOrNot from "./checkRecursiveOrNot";
import checkValidMove from "./checkVaildMove";

let tempArray = [[initialState]];
let finalStateFound = false;
let count = 0;

const performL = (state) => {
  if (state.isRecursive || finalStateFound) return;
  let result, newState, isRecursive;

  const arrayLevel = state.id.length;
  let childIndex = 1;

  result = checkValidMove(state.numbers, "L");
  if (result) {
    count++;
    let { currentPosition, nextPosition } = result;
    newState = structuredClone(state);
    newState.numbers[currentPosition.i][currentPosition.j] =
      newState.numbers[nextPosition.i][nextPosition.possibleJ];
    newState.numbers[nextPosition.i][nextPosition.possibleJ] = null;
    isRecursive = checkRecursiveOrNot(newState.numbers, tempArray);
    if (isRecursive) {
      newState.isRecursive = true;
    }

    newState.transition = "L";
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

const performU = (state) => {
  if (state.isRecursive || finalStateFound) return;
  let result, newState, isRecursive;

  const arrayLevel = state.id.length;
  let childIndex = 2;

  result = checkValidMove(state.numbers, "U");
  if (result) {
    count++;
    let { currentPosition, nextPosition } = result;

    newState = structuredClone(state);

    newState.numbers[currentPosition.i][currentPosition.j] =
      newState.numbers[nextPosition.possibleI][nextPosition.j];
    newState.numbers[nextPosition.possibleI][nextPosition.j] = null;

    isRecursive = checkRecursiveOrNot(newState.numbers, tempArray);
    if (isRecursive) {
      newState.isRecursive = true;
    }

    newState.transition = "U";
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

const performD = (state) => {
  if (state.isRecursive || finalStateFound) return;
  let result, newState, isRecursive;

  const arrayLevel = state.id.length;
  let childIndex = 3;

  result = checkValidMove(state.numbers, "D");
  if (result) {
    count++;
    let { currentPosition, nextPosition } = result;

    newState = structuredClone(state);

    newState.numbers[currentPosition.i][currentPosition.j] =
      newState.numbers[nextPosition.possibleI][nextPosition.j];
    newState.numbers[nextPosition.possibleI][nextPosition.j] = null;

    isRecursive = checkRecursiveOrNot(newState.numbers, tempArray);
    if (isRecursive) {
      newState.isRecursive = true;
    }

    newState.transition = "D";
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

const performR = (state) => {
  if (state.isRecursive || finalStateFound) return;
  let result, newState, isRecursive;

  const arrayLevel = state.id.length;
  let childIndex = 4;

  result = checkValidMove(state.numbers, "R");
  if (result) {
    count++;
    let { currentPosition, nextPosition } = result;

    newState = structuredClone(state);

    newState.numbers[currentPosition.i][currentPosition.j] =
      newState.numbers[nextPosition.i][nextPosition.possibleJ];
    newState.numbers[nextPosition.i][nextPosition.possibleJ] = null;

    isRecursive = checkRecursiveOrNot(newState.numbers, tempArray);
    if (isRecursive) {
      newState.isRecursive = true;
    }

    newState.transition = "R";
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
    performL(state);
    performU(state);
    performD(state);
    performR(state);
  }

  return tempArray;
};

export default generatePossibleState;
