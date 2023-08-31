const Header = ({ generatePossibleState, reset, level }) => {
  return (
    <div className="content">
      <h1 className="title">8 Puzzle Game State Simulation</h1>
      <div>
        <button className="button" onClick={generatePossibleState}>
          Next
        </button>
        <button
          className="button"
          style={{ backgroundColor: "#DD5555" }}
          onClick={reset}
        >
          Reset
        </button>
      </div>
      <h3>{`Level: ${level}`}</h3>
    </div>
  );
};

export default Header;
