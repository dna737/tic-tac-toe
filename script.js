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
      console.log("a box has been clicked");
    });
  });
}

activateBoxes();

function displayGame() {
  console.log(game.board);
}

displayGame();
