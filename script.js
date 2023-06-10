const createPlayer = (char) => {
  let name = prompt(`Please enter the player's name for ${char} mark`);
  if (name === null || name === "") {
    name = char === "X" ? "Player 1" : "Player 2";
  }

  return { name, char };
};

const game = (() => {
  let board = new Array(9).fill("");
  const playerOne = createPlayer("X");
  const playerTwo = createPlayer("O");
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

  const displayCurrentPlayer = function () {
    let currPlayer = fetchCurrentPlayer();
    let currSpeciferContent = document.querySelector(".curr-specifier > span");
    if (board.every((val) => val === board[0])) {
      currSpeciferContent.textContent = "O";
    }
    currSpeciferContent.textContent = currPlayer.char;
  };

  const makeMove = function (index) {
    let currPlayer = fetchCurrentPlayer();
    console.log("currPlayer from makeMove():", currPlayer);
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
    let winner = char === "X" ? playerOne : playerTwo;
    verdict.textContent = `Winner: ${winner.name} (${winner.char})`;
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
    displayCurrentPlayer,
  };
})();

//this function is responsible for placing the marker.
function setBoxBehavior(box) {
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
      console.log("calling decativate boxes:");
    }
    ++game.clicks;
    game.displayCurrentPlayer();
  } else {
    alert("Please select another grid item.");
  }
}

function activateBoxes() {
  const boxes = document.querySelectorAll(".grid-item");
  boxes.forEach((box) => {
    box.addEventListener("click", () => setBoxBehavior(box));
  });
}

function deactivateBoxes() {
  const boxes = document.querySelectorAll(".grid-item");
  boxes.forEach((box) => {
    box.removeEventListener("click", () => setBoxBehavior(box));
  });
}

function restartGame() {
  //TODO: add a div overlay that covers the entire screen and mentions the winner.
  location.reload();
}

activateBoxes();
