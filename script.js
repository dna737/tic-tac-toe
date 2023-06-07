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

  const fetchCurrentPlayer = function (index) {
    let currPlayer = null;
    if (index % 2 === 0) {
      currPlayer = playerOne;
    } else {
      currPlayer = playerTwo;
    }
    return currPlayer;
  };

  const makeMove = function (index) {
    let currPlayer = fetchCurrentPlayer(index);
    board[index] = currPlayer.char;
    //TODO: make it more restrictive later.
    console.log("currPlayer:", currPlayer, "\t index:", index);
    //NOTE: the code below is a rough layout of what needs to be implemented later in this method.
    //do stuff with currPlayer's attributes.

    board[index] = currPlayer.char; //esdf continue from here.
  };
  const validateInput = function (index) {
    return board[index] === "";
  };

  const placePlayerMarker = function (gridItem) {
    console.log("hi from the placePlayerMarker methdo! :)");
    console.log(gridItem);
  };

  return { board, makeMove, clicks, validateInput, placePlayerMarker };
})();

function activateBoxes() {
  const boxes = document.querySelectorAll(".grid-item");
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      let gridItem = box.classList[box.classList.length - 1];
      let itemIndex = parseInt(gridItem.substring(5)); //fetches "item-0".."item-8"

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
        ++game.clicks;
        game.placePlayerMarker(gridItem);
      } else {
        alert("Please select another grid item.");
      }
    });
  });
}

activateBoxes();

//TODO: get rid of this function as it's only for debugging purposes.
function displayGame() {
  console.log(game.board);
}

//TODO: be wary of replacing the current item in the array once the user clicks the grid item. Once a box has been used, it should be irreplaceable.

displayGame();
