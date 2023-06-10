/*
1. know what player's turn it is
2. know what character belongs to a player
    3. identify the winning criteria and draw criteria (it's okay if it ends after all the slots have been occupied)
    4. score alterations should be private, so we should be using closures for this (IIFE).
    5. the only functions that could be public are the ones that make a move (for example: makeMove(player))
    
    */

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
    //TODO: make it more restrictive later.
    console.log("currPlayer:", currPlayer, "\t index:", index);
    //NOTE: the code below is a rough layout of what needs to be implemented later in this method.

    board[index] = currPlayer.char; //esdf continue from here.
  };
  const validateInput = function (index) {
    return board[index] === "";
  };

  const placePlayerMarker = function (index, gridItem) {
    console.log("hi from the placePlayerMarker methdo! :)");
    console.log("gridItem", gridItem);
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
    console.log("checkDiagonals");
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
    console.log("checkVerticals");
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
    console.log("checkHorizontals");
    let topHorizontal =
      board[0] !== "" && board[0] === board[1] && board[0] === board[2];
    let midHorizontal =
      board[3] !== "" && board[3] === board[4] && board[3] === board[5];
    let bottomHorizontal =
      board[6] !== "" && board[6] === board[7] && board[6] === board[8];

    if (topHorizontal || midHorizontal || bottomHorizontal) {
      console.log("winnerViaHorizontal!");
    }

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

      /*FIXME: 
        1. use the itemIndex's value to update game.board
        2. add <p> to the clicked box. The text content can be anything for now.
        3. after step 2, replace it with either "X" or "O".
      4. After that, think about the switching of "X" and "O" after every turn.
      */

      console.log(itemIndex);
      console.log(game.validateInput(itemIndex));

      if (game.validateInput(itemIndex)) {
        game.makeMove(itemIndex);
        game.placePlayerMarker(itemIndex, box);
        if (game.checkEndGame()) {
          setTimeout(() => {
            restartGame();
          }, "1000");
          deactivateBoxes();
        }
        console.log("game clicks just incremented!");
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

//TODO: get rid of this function as it's only for debugging purposes.
function displayGame() {
  console.log(game.board);
}

//TODO: be wary of replacing the current item in the array once the user clicks the grid item. Once a box has been used, it should be irreplaceable.

displayGame();
