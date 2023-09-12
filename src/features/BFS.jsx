import { useState } from "react";
import Board from "../components/Board";
import Header from "../components/Header";
import checkArrayEqual from "../utils/checkArrayEqual";
import { initialNumbers } from "../data/data";
import { ArcherContainer, ArcherElement } from "react-archer";

const BFS = () => {
  const initialState = {
    numbers: initialNumbers,
    id: "1",
    parentId: "",
    transition: "",
    isRecursive: false,
  };

  const [stateArray, setStateArray] = useState([[initialState]]);
  const [level, setLevel] = useState(0);

  const reset = () => {
    setStateArray([[initialState]]);
    setLevel(0);
  };

  const checkValidMove = (board, move) => {
    let possibleI, possibleJ;

    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        if (board[i][j] === null) {
          if (move === "L") {
            possibleJ = j - 1;
            if (possibleJ >= 0) {
              return {
                currentPosition: { i, j },
                nextPosition: { i, possibleJ },
              };
            }
          } else if (move === "U") {
            possibleI = i - 1;
            if (possibleI >= 0) {
              return {
                currentPosition: { i, j },
                nextPosition: { possibleI, j },
              };
            }
          } else if (move === "D") {
            possibleI = i + 1;
            if (possibleI <= 2) {
              return {
                currentPosition: { i, j },
                nextPosition: { possibleI, j },
              };
            }
          } else if (move === "R") {
            possibleJ = j + 1;
            if (possibleJ <= 2) {
              return {
                currentPosition: { i, j },
                nextPosition: { i, possibleJ },
              };
            }
          }
        }
      }
    }
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
    const tempLevel = level + 1;
    let levelArray = [];
    let childIndex = 0;

    let previousStates = [...stateArray[level]];

    previousStates.forEach((state) => {
      if (state.isRecursive) return;
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
        levelArray.push(newState);
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
        levelArray.push(newState);
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
          levelArray.push(newState);
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
        levelArray.push(newState);
      }
    });

    setStateArray((prevState) => {
      const newArray = [...prevState];
      newArray[tempLevel] = levelArray;
      return newArray;
    });

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h3>{`Level: ${level}`}</h3>
      </div>

      <ArcherContainer strokeColor="black" startMarker={true} endMarker={false}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {stateArray.map((states, i) => (
            <div key={i}>
              {states.map((item, j) => (
                <div style={{ margin: "30px 40px" }} key={j}>
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
                </div>
              ))}
            </div>
          ))}
        </div>
      </ArcherContainer>
    </div>
  );
};

export default BFS;
