const board = document.querySelector(".board");
const rollDice = document.querySelector(".roll-dice");
const message = document.querySelector(".message");
const reset = document.querySelector(".reset");
const dice = document.querySelector(".dice-value");

rollDice.addEventListener("click", onRollDice);

const boardSize = 10;
const initPlayerPosition = 1;
const snakesAndLadders = {
  16: 6,
  47: 26,
  49: 11,
  56: 53,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  98: 78,
};
function drawBoard() {
  board.innerHTML = "";
  for (let i = 0; i < boardSize * boardSize; i++) {
    cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = i + 1;
    board.appendChild(cell);
  }
}

function onRollDice() {
  const value = Math.floor(Math.random() * 6) + 1;
  dice.textContent = `Dice Value:${value}`;
  move(value);
}

function move(position) {
  const currentPosition = getCurrentPlayerPosition();
  const newPlayerPosition = currentPosition + position;

  message.textContent=''
  if (snakesAndLadders[newPlayerPosition]) {
    message.textContent = `You encountered snake or a ladder you are moving to: ${snakesAndLadders[newPlayerPosition]}`;
    setPlayerPosition(snakesAndLadders[newPlayerPosition]);
  } else if(newPlayerPosition<=100 ) {
    setPlayerPosition(newPlayerPosition);
  }
  else {
    message.textContent="Hooray !! You win"
  }
}

function setPlayerPosition(position) {
  localStorage.setItem("playerPosition", position);
  drawBoard();
  const currentCell = document.querySelector(`.cell:nth-child(${position}`);
  currentCell.classList.add("player-position");
}

function getCurrentPlayerPosition() {
  return parseInt(localStorage.getItem("playerPosition")) || initPlayerPosition;
}

document.addEventListener("DOMContentLoaded", () => {
  drawBoard(), setPlayerPosition(1);
});
