import getStateColor from "../utils/getStateColor";

const Board = ({ state }) => {
  return (
    <div className="board-container">
      {state.numbers.map((row, rowIndex) => (
        <div className="board-row" key={rowIndex}>
          {row.map((number, colIndex) => (
            <div
              className="board-element"
              style={{
                backgroundColor: getStateColor(state),
              }}
              key={colIndex}
            >
              {number}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
