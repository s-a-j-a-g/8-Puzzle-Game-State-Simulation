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

export default checkValidMove;
