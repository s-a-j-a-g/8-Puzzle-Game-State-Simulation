import { useState } from "react";
import Board from "../components/Board";
import Header from "../components/Header";
import { ArcherContainer, ArcherElement } from "react-archer";
import generatePossibleState from "../utils/performLUDR";
import { initialState } from "../data/data";

const DFS = () => {
  const [stateArray, setStateArray] = useState([[initialState]]);
  const [showGenerateButton, setShowGenerateButton] = useState(true);

  const reset = () => {
    setStateArray([[initialState]]);
    setShowGenerateButton(true);
  };

  const generate = () => {
    const result = generatePossibleState(stateArray[0][0]);
    setStateArray(result);
    setShowGenerateButton(false);
  };

  return (
    <div>
      <Header
        generatePossibleState={generate}
        reset={reset}
        showGenerateButton={showGenerateButton}
      />

      <ArcherContainer strokeColor="black" startMarker={true} endMarker={false}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {stateArray.map((states, i) => (
            <div key={i}>
              {states.map((item, j) => (
                <div
                  style={{
                    margin: "30px 40px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  key={j}
                >
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
    </div>
  );
};

export default DFS;
