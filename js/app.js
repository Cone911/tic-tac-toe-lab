///*-------------------------------- UPDATES: -------------------------------*/
//VERSION 1.1:
// Added CSS Styling: font type, colors for tokens.
// Added confetti for winner.
// Added highlights for the winning combo squares.
// Added sound effects for clicks, tie and winning music.


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

/*----------------------------- AUDIO ---------------------------------------*/

const clickSound = new Audio('/SoundFX/Click(Pen).mp3');
const tieSound = new Audio('/SoundFX/Windows XP Error.mp3');
const moneyMusic = new Audio('/SoundFX/Money (Extract).mp3');
moneyMusic.volume = 0.4;
tieSound.volume = 0.4;

/*---------------------------- Variables (state) ----------------------------*/

let board = ["", "", "", "", "", "", "", "", ""];
let turn;
let winner = false;
let tie = false;

/*------------------------ Cached Element References ------------------------*/

const messageEl = document.getElementById("message");
const resetBtnEl = document.getElementById("reset-btn");
const boardEl = document.querySelector(".board");
const confettiEl = document.getElementById('confetti');


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

  clearHighlight(); //Clears Highlighted Winning Combo.
  moneyMusic.pause(); //Pauses the winning music.
  moneyMusic.currentTime =  0;
  
  render();
}

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
    board.forEach((element, index) => {
      const square = squareEls[index];
    
      square.classList.remove('token-x', 'token-o');
      if (element === "X") {
        square.textContent = "X";
        square.classList.add('token-x');
      } else if (element === "O") {
        square.textContent = "O";
        square.classList.add('token-o');
      } else if (element === "") {
        square.textContent = "";
      }
    });
  };

function updateMessage() {
  if (winner === false && tie == false) {
    messageEl.innerHTML = `<span style="color: red; font-size: 54px;">${turn}</span> <-- it's your turn.`;
    confettiEl.classList.add('hidden');
  }

  if (winner === false && tie == true) {
    messageEl.textContent = `It's a tie!`;
    confettiEl.classList.add('hidden');
    tieSound.play();
  }

  if (winner) {
    messageEl.textContent = `${turn} WINS!`;
    confettiEl.classList.remove('hidden');
    moneyMusic.play();
  }
}

function handleClick(event) {
  if (!event.target.classList.contains("sqr")) return;

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
    clickSound.play();
    board[index] = turn;
}

function checkForWinner() {
  winningCombos.forEach((array) => {
    if (board[array[0]] !== "") {
      if (
        board[array[0]] == board[array[1]] &&
        board[array[0]] == board[array[2]]) 
        {
            winner = true;
            squareEls[array[0]].classList.add('highlightWinCombo');
            squareEls[array[1]].classList.add('highlightWinCombo');
            squareEls[array[2]].classList.add('highlightWinCombo');
            
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

function clearHighlight() {
    squareEls.forEach((square) => {
      square.classList.remove('highlightWinCombo');
    });
}
  
