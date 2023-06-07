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
  let clicks = 0; //These clicks will be useful to identify the current player.
  const makeMove = function (currPlayer, index) {
    board[index] = currPlayer.char;
    //TODO: make it more restrictive later.
    console.log("currPlayer:", currPlayer, "\t index:", index);
    //TODO: create another function that displays the result on the screen ("X" mark after the first click, etc.), and
    //then implement the validators.
    //NOTE: the code below is a rough layout of what needs to be implemented later in this method.
    /*
    let currPlayer = null;
    if(clicks % 2 == 0){
        currPlayer = playerOne;
    }else{
        currPlayer = playerTwo;
    }

    do stuff with currPlayer's attributes.
    */
  };
  const validateInput = function (index) {
    return board[index] === "";
  };

  return { board, makeMove, clicks, validateInput };
})();

function activateBoxes() {
  const boxes = document.querySelectorAll(".grid-item");
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      let itemIndex = parseInt(
        box.classList[box.classList.length - 1].substring(5)
      );
      /*FIXME: 
      1. use the itemIndex's value to update game.board
      2. add <p> to the clicked box. The text content can be anything for now.
      3. after step 2, replace it with either "X" or "O".
      4. After that, think about the switching of "X" and "O" after every turn.
      */

      //TODO: increment `game.clicks` to make sure the input varies.
      console.log(itemIndex);
      console.log(game.validateInput(itemIndex));
      //FIXME: add an if-else statement. If the move is correct, then call the makeMove function; otherwise, call the displayInvalidInput() function.
      ++game.clicks;
    });
  });
}

activateBoxes();

function displayGame() {
  console.log(game.board);
}

//TODO: be wary of replacing the current item in the array once the user clicks the grid item. Once a box has been used, it should be irreplaceable.

displayGame();
