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

  return { board, playerOne, playerTwo };
})();

function activateBoxes() {
  const boxes = document.querySelectorAll(".grid-item");
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      let itemIndicator = box.classList[box.classList.length - 1];
      /*FIXME: 
      1. use the itemIndicator's value to update game.board
      2. add <p> to the clicked box. The text content can be anything for now.
      3. after step 2, replace it with either "X" or "O".
      4. After that, think about the switching of "X" and "O" after every turn.
      */

      box.textContent = document.createElement("p").classList.add("white-text");
    });
  });
}

activateBoxes();

function displayGame() {
  console.log(game.board);
}

//TODO: be wary of replacing the current item in the array once the user clicks the grid item. Once a box has been used, it should be irreplaceable.

displayGame();
