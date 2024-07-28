/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
  //Check Horizontals
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //Check Verticals
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //Check Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

/*---------------------------- Variables (state) ----------------------------*/

let board = ["", "", "", "", "", "", "", "", ""];
let turn;
let winner = false;
let tie = false;

/*------------------------ Cached Element References ------------------------*/

const messageEl = document.getElementById("message");
const resetBtnEl = document.getElementById("reset-btn");
const boardEl = document.querySelector(".board");

/*----------------------------- Event Listeners -----------------------------*/

const squareEls = document.querySelectorAll(".sqr");
boardEl.addEventListener("click", handleClick);
resetBtnEl.addEventListener("click", init);

/*-------------------------------- Functions --------------------------------*/

init();

function init() {
  board = ["", "", "", "", "", "", "", "", ""];

  winner = false;
  tie = false;
  turn = "X";
  render();
}

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  board.forEach((element, index) => {
    board[index] === "X" ? (squareEls[index].textContent = "X") : null;
    board[index] === "O" ? (squareEls[index].textContent = "O") : null;
    board[index] === "" ? (squareEls[index].textContent = "") : null;
  });
}

function updateMessage() {
  if (winner === false && tie == false) {
    messageEl.textContent = `${turn}, it's your turn.`;
  }

  if (winner === false && tie == true) {
    messageEl.textContent = `It's a tie!`;
  }

  if (winner) {
    messageEl.textContent = `${turn} WINS!`;
  }
}

function handleClick(event) {
  if (!event.target.classList.contains("sqr")) return;

  // Index finder.
  const squareIndex = event.target.id;
  if (board[squareIndex] === "X" || board[squareIndex] === "O") {
    return;
  }

  if (winner) {
    return;
  }

  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
}

function placePiece(index) {
  board[index] = turn;
}

function checkForWinner() {
  winningCombos.forEach((array) => {
    if (board[array[0]] !== "") {
      if (
        board[array[0]] == board[array[1]] &&
        board[array[0]] == board[array[2]]
      ) {
        winner = true;
      }
    }
  });
}

function checkForTie() {
  if (winner) return;
  tie = !board.includes("");
}

function switchPlayerTurn() {
  if (winner) {
    return;
  } else {
    turn === "X" ? (turn = "O") : (turn = "X");
  }
}
