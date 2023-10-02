import { useState } from "react";
import Board from "../components/Board";
import Header from "../components/Header";
import checkArrayEqual from "../utils/checkArrayEqual";
import { initialState } from "../data/data";
import { ArcherContainer, ArcherElement } from "react-archer";
import checkValidMove from "../utils/checkVaildMove";
import calculateHeursitics from "../utils/calculateHeuristics";
import { finalNumbers } from "../data/data";

const AStar = () => {
  const [stateArray, setStateArray] = useState([[initialState]]);
  const [level, setLevel] = useState(0);
  const [count, setCount] = useState(0);
  const [finalStateFound, setFinalStateFound] = useState(false);

  const reset = () => {
    setStateArray([[initialState]]);
    setLevel(0);
    setCount(0);
    setFinalStateFound(false);
  };

  const checkRecursiveOrNot = (stateToCheck, levelArray) => {
    for (const states of stateArray) {
      for (const state of states) {
        if (checkArrayEqual(state.numbers, stateToCheck)) {
          return true;
        }
      }
    }

    for (const state of levelArray) {
      if (checkArrayEqual(state.numbers, stateToCheck)) {
        return true;
      }
    }

    return false;
  };

  const generatePossibleState = () => {
    if (finalStateFound) return;

    const tempLevel = level + 1;
    let levelArray = [];
    let childIndex = 0;
    let tempCount = count;

    let previousStates = [...stateArray[level]];

    // Find min fN
    let min = previousStates[0].gN + previousStates[0].hN;
    previousStates.forEach((state) => {
      if (state.gN + state.hN < min) min = state.gN + state.hN;
    });

    previousStates.forEach((state) => {
      if (state.isRecursive) return;
      if (state.gN + state.hN !== min) return;

      let result, newState, isRecursive;

      // Peform L
      result = checkValidMove(state.numbers, "L");

      if (result) {
        let { currentPosition, nextPosition } = result;

        newState = structuredClone(state);

        newState.numbers[currentPosition.i][currentPosition.j] =
          newState.numbers[nextPosition.i][nextPosition.possibleJ];
        newState.numbers[nextPosition.i][nextPosition.possibleJ] = null;

        isRecursive = checkRecursiveOrNot(newState.numbers, levelArray);
        if (isRecursive) {
          newState.isRecursive = true;
        }
        newState.transition = "L";
        childIndex++;
        newState.id = `${state.id}${childIndex}`;
        newState.parentId = `${state.id}`;
        tempCount++;
        newState.count = tempCount;
        newState.gN = newState.id.length - 1;
        newState.hN = calculateHeursitics(newState.numbers);
        levelArray.push(newState);

        if (checkArrayEqual(newState.numbers, finalNumbers)) {
          setFinalStateFound(true);
          return;
        }
      }

      // Peform U
      result = checkValidMove(state.numbers, "U");
      if (result) {
        let { currentPosition, nextPosition } = result;

        newState = structuredClone(state);

        newState.numbers[currentPosition.i][currentPosition.j] =
          newState.numbers[nextPosition.possibleI][nextPosition.j];
        newState.numbers[nextPosition.possibleI][nextPosition.j] = null;

        isRecursive = checkRecursiveOrNot(newState.numbers, levelArray);
        if (isRecursive) {
          newState.isRecursive = true;
        }
        newState.transition = "U";
        childIndex++;
        newState.id = `${state.id}${childIndex}`;
        newState.parentId = `${state.id}`;
        tempCount++;
        newState.count = tempCount;
        newState.gN = newState.id.length - 1;
        newState.gN = newState.id.length - 1;
        newState.hN = calculateHeursitics(newState.numbers);
        levelArray.push(newState);

        if (checkArrayEqual(newState.numbers, finalNumbers)) {
          setFinalStateFound(true);
          return;
        }
      }

      // Peform D
      result = checkValidMove(state.numbers, "D");
      if (result) {
        if (result) {
          let { currentPosition, nextPosition } = result;

          newState = structuredClone(state);

          newState.numbers[currentPosition.i][currentPosition.j] =
            newState.numbers[nextPosition.possibleI][nextPosition.j];
          newState.numbers[nextPosition.possibleI][nextPosition.j] = null;

          isRecursive = checkRecursiveOrNot(newState.numbers, levelArray);
          if (isRecursive) {
            newState.isRecursive = true;
          }
          newState.transition = "D";
          childIndex++;
          newState.id = `${state.id}${childIndex}`;
          newState.parentId = `${state.id}`;
          tempCount++;
          newState.count = tempCount;
          newState.gN = newState.id.length - 1;
          newState.gN = newState.id.length - 1;
          newState.hN = calculateHeursitics(newState.numbers);
          levelArray.push(newState);

          if (checkArrayEqual(newState.numbers, finalNumbers)) {
            setFinalStateFound(true);
            return;
          }
        }
      }

      // Peform R
      result = checkValidMove(state.numbers, "R");
      if (result) {
        let { currentPosition, nextPosition } = result;

        newState = structuredClone(state);

        newState.numbers[currentPosition.i][currentPosition.j] =
          newState.numbers[nextPosition.i][nextPosition.possibleJ];
        newState.numbers[nextPosition.i][nextPosition.possibleJ] = null;

        isRecursive = checkRecursiveOrNot(newState.numbers, levelArray);
        if (isRecursive) {
          newState.isRecursive = true;
        }
        newState.transition = "R";
        childIndex++;
        newState.id = `${state.id}${childIndex}`;
        newState.parentId = `${state.id}`;
        tempCount++;
        newState.count = tempCount;
        newState.gN = newState.id.length - 1;
        newState.gN = newState.id.length - 1;
        newState.hN = calculateHeursitics(newState.numbers);
        levelArray.push(newState);

        if (checkArrayEqual(newState.numbers, finalNumbers)) {
          setFinalStateFound(true);
          return;
        }
      }
    });

    setStateArray((prevState) => {
      const newArray = [...prevState];
      newArray[tempLevel] = levelArray;
      return newArray;
    });

    setCount(tempCount);
    setLevel(tempLevel);
  };

  return (
    <div>
      <Header
        generatePossibleState={generatePossibleState}
        reset={reset}
        level={level}
        showGenerateButton={true}
      />
      <div className="level-container">
        <h3>{`Level: ${level}`}</h3>
      </div>
      <ArcherContainer strokeColor="black" startMarker={true} endMarker={false}>
        <div className="states-container">
          {stateArray.map((states, i) => (
            <div key={i}>
              {states.map((item, j) => (
                <div className="state-container" key={j}>
                  <div className="aStarFunctionContainer">
                    <h5 className="aStarFunction">{`g(N) = ${item.gN}`}</h5>
                    <h5 className="aStarFunction">{`h(N) = ${item.hN}`}</h5>
                    <h5 className="aStarFunction">{`f(N) = ${
                      item.gN + item.hN
                    }`}</h5>
                  </div>
                  <ArcherElement
                    id={item.id}
                    relations={[
                      {
                        targetId: item.parentId,
                        sourceAnchor: "left",
                        targetAnchor: "right",
                        label: item.transition,
                        style: { strokeWidth: 2 },
                        startMarker: true,
                      },
                    ]}
                  >
                    <div>
                      <Board state={item} />
                    </div>
                  </ArcherElement>
                  <h5 className="label">{item.count}</h5>
                </div>
              ))}
            </div>
          ))}
        </div>
      </ArcherContainer>

      <div className="finalState">
        <p className="aStarP">Final State</p>
        <Board state={{ numbers: finalNumbers }} />
      </div>

      <div className="aStarDefinition">
        <p className="aStarP">{`f(N) = g(N) + h(N), where`}</p>
        <p className="aStarP">{`g(N) = Actual Cost from Start Node to n`}</p>
        <p className="aStarP">{`h(N) = Estimation Cost from n to Goal Node`}</p>
      </div>
    </div>
  );
};

export default AStar;
