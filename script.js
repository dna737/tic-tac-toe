const createPlayer = (num, char) => {
  return { num, char };
};

const game = (() => {
  let board = new Array(9).fill("");
  const playerOne = createPlayer(1, "X");
  const playerTwo = createPlayer(2, "O");
  let clicks = 0; //These clicks act like a binary switch to identify the current player.
  const verdict = document.querySelector(".verdict"); //shows the final result of the match.

  const fetchCurrentPlayer = function () {
    let currPlayer = null;
    if (game.clicks % 2 === 0) {
      currPlayer = playerOne;
    } else {
      currPlayer = playerTwo;
    }
    return currPlayer;
  };

  const makeMove = function (index) {
    let currPlayer = fetchCurrentPlayer();
    board[index] = currPlayer.char;
    console.log("currPlayer:", currPlayer, "\t index:", index);
    //NOTE: the code below is a rough layout of what needs to be implemented later in this method.

    board[index] = currPlayer.char; //esdf continue from here.
  };
  const validateInput = function (index) {
    return board[index] === "";
  };

  const placePlayerMarker = function (index, gridItem) {
    let marker = document.createElement("h1");
    marker.textContent = fetchCurrentPlayer(index).char;
    marker.classList.add("white-text", "marker");
    gridItem.appendChild(marker);
  };

  const checkEndGame = function () {
    return (
      checkDiagonals() || checkVerticals() || checkHorizontals() || checkDraw()
    );
  };

  const displayVerdict = function (char) {
    verdict.textContent = `Winner: ${char}`;
  };

  const checkDiagonals = function () {
    let decreasingDiagonal =
      board[0] !== "" && board[0] === board[4] && board[4] === board[8];
    let increasingDiagonal =
      board[2] !== "" && board[2] === board[4] && board[2] === board[6];
    if (decreasingDiagonal) {
      displayVerdict(board[0]);
    } else if (increasingDiagonal) {
      displayVerdict(board[2]);
    }

    return decreasingDiagonal || increasingDiagonal;
  };

  const checkVerticals = function () {
    let leftVertical =
      board[0] !== "" && board[3] === board[0] && board[6] === board[0];
    let midVertical =
      board[1] !== "" && board[1] === board[4] && board[1] === board[7];
    let rightVertical =
      board[2] !== "" && board[5] === board[2] && board[5] === board[8];

    if (leftVertical) {
      displayVerdict(board[0]);
    } else if (midVertical) {
      displayVerdict(board[1]);
    } else if (rightVertical) {
      displayVerdict(board[2]);
    }

    return leftVertical || midVertical || rightVertical;
  };

  const checkHorizontals = function () {
    let topHorizontal =
      board[0] !== "" && board[0] === board[1] && board[0] === board[2];
    let midHorizontal =
      board[3] !== "" && board[3] === board[4] && board[3] === board[5];
    let bottomHorizontal =
      board[6] !== "" && board[6] === board[7] && board[6] === board[8];

    if (topHorizontal) {
      displayVerdict(board[0]);
    } else if (midHorizontal) {
      displayVerdict(board[3]);
    } else if (bottomHorizontal) {
      displayVerdict(board[6]);
    }
    return topHorizontal || midHorizontal || bottomHorizontal;
  };

  const checkDraw = function () {
    result = !board.includes("");
    if (result) {
      verdict.textContent = "It's a tie!";
    }

    return result; //all the spots on the board have been taken.
  };

  return {
    board,
    makeMove,
    clicks,
    validateInput,
    placePlayerMarker,
    checkEndGame,
  };
})();

function activateBoxes() {
  const boxes = document.querySelectorAll(".grid-item");
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      let itemIndex = parseInt(
        box.classList[box.classList.length - 1].substring(5)
      ); //fetches "item-0".."item-8"

      if (game.validateInput(itemIndex)) {
        game.makeMove(itemIndex);
        game.placePlayerMarker(itemIndex, box);
        if (game.checkEndGame()) {
          setTimeout(() => {
            restartGame();
          }, "1000");
          deactivateBoxes();
        }
        ++game.clicks;
      } else {
        alert("Please select another grid item.");
      }
    });
  });
}

function deactivateBoxes() {
  const boxes = document.querySelectorAll(".grid-item");
  boxes.forEach((box) => {
    box.removeEventListener("click");
  });
}

function restartGame() {
  //TODO: add a div overlay that covers the entire screen and mentions the winner.
  location.reload();
}

activateBoxes();
