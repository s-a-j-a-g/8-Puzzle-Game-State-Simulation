import { useEffect, useState } from "react";
import Board from "../components/Board";
import Header from "../components/Header";
import checkArrayEqual from "../utils/checkArrayEqual";
import { initialNumbers } from "../data/data";
import { ArcherContainer, ArcherElement } from "react-archer";
import checkValidMove from "../utils/checkVaildMove";

const DFS = () => {
  const initialState = {
    numbers: initialNumbers,
    id: "1",
    parentId: "",
    transition: "",
    isRecursive: false,
  };

  useEffect(() => {
    // Save the original console.warn function
    const originalWarn = console.warn;

    // Replace console.warn with an empty function
    console.warn = function () {};

    // Restore the original console.warn when the component unmounts
    return () => {
      console.warn = originalWarn;
    };
  }, []);

  const [stateArray, setStateArray] = useState([[initialState]]);

  let tempArray = [[initialState]];

  const reset = () => {
    setStateArray([[initialState]]);
  };

  const checkRecursiveOrNot = (stateToCheck) => {
    for (const states of stateArray) {
      for (const state of states) {
        if (checkArrayEqual(state.numbers, stateToCheck)) {
          return true;
        }
      }
    }
    return false;
  };

  const performL = (state) => {
    if (state.isRecursive) return;
    let result, newState, isRecursive;

    const arrayLevel = state.id.length;
    let childIndex = 1;

    result = checkValidMove(state.numbers, "L");
    if (result) {
      let { currentPosition, nextPosition } = result;
      newState = structuredClone(state);
      newState.numbers[currentPosition.i][currentPosition.j] =
        newState.numbers[nextPosition.i][nextPosition.possibleJ];
      newState.numbers[nextPosition.i][nextPosition.possibleJ] = null;
      isRecursive = checkRecursiveOrNot(newState.numbers);
      if (isRecursive) {
        newState.isRecursive = true;
      }
      newState.transition = "L";

      //   childIndex++;
      newState.id = `${state.id}${childIndex}`;
      newState.parentId = `${state.id}`;

      const newArray = [...tempArray];
      newArray[arrayLevel] = [newState];
      tempArray = [...newArray];

      console.log(tempArray);

      generatePossibleState(newState);
    }
    return;
  };

  const performU = (state) => {
    if (state.isRecursive) return;
    let result, newState, isRecursive;

    const arrayLevel = state.id.length;
    let childIndex = 2;

    result = checkValidMove(state.numbers, "U");
    if (result) {
      let { currentPosition, nextPosition } = result;

      newState = structuredClone(state);

      newState.numbers[currentPosition.i][currentPosition.j] =
        newState.numbers[nextPosition.possibleI][nextPosition.j];
      newState.numbers[nextPosition.possibleI][nextPosition.j] = null;

      isRecursive = checkRecursiveOrNot(newState.numbers);
      if (isRecursive) {
        newState.isRecursive = true;
      }
      newState.transition = "U";

      //   childIndex++;
      newState.id = `${state.id}${childIndex}`;
      newState.parentId = `${state.id}`;

      const newArray = [...tempArray];
      newArray[arrayLevel] = [newState];
      tempArray = [...newArray];

      console.log(tempArray);

      generatePossibleState(newState);
    }
    return;
  };

  //   const performD = (state) => {
  //     if (state.isRecursive) return;
  //     let result, newState, isRecursive;

  //     const arrayLevel = state.id.length;
  //     let childIndex = 3;

  //     result = checkValidMove(state.numbers, "D");
  //     if (result) {
  //       let { currentPosition, nextPosition } = result;

  //       newState = structuredClone(state);

  //       newState.numbers[currentPosition.i][currentPosition.j] =
  //         newState.numbers[nextPosition.possibleI][nextPosition.j];
  //       newState.numbers[nextPosition.possibleI][nextPosition.j] = null;

  //       isRecursive = checkRecursiveOrNot(newState.numbers);
  //       if (isRecursive) {
  //         newState.isRecursive = true;
  //       }
  //       newState.transition = "U";

  //       //   childIndex++;
  //       newState.id = `${state.id}${childIndex}`;
  //       newState.parentId = `${state.id}`;

  //       //   setStateArray((prevState) => {
  //       //     const newArray = [...prevState];
  //       //     newArray[arrayLevel] = [newState];
  //       //     return newArray;
  //       //   });

  //       const newArray = [...tempArray];
  //       newArray[arrayLevel] = [newState];
  //       tempArray = [...newArray];

  //       console.log(tempArray);
  //       generatePossibleState(newState);
  //     }
  //     return;
  //   };

  const generatePossibleState = (state) => {
    performL(state);
    performU(state);
    // performD(state);
    // performR(state);

    // setStateArray((prevState) => {
    //   const newArray = [...prevState];
    //   newArray[arrayLevel] = [newState];
    //   return newArray;
    // });

    setStateArray(tempArray);
  };

  return (
    <div>
      <Header
        generatePossibleState={() => generatePossibleState(stateArray[0][0])}
        reset={reset}
        // level={level}
      />
      <h1>DFS</h1>

      <ArcherContainer
        strokeColor="black"
        // noCurves={true}
        startMarker={true}
        endMarker={false}
      >
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

export default DFS;
