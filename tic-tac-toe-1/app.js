var cells = document.querySelectorAll(".cell");
var board = document.querySelector(".board");
var message = document.querySelector(".message");
var reset=document.querySelector(".reset");
reset.addEventListener("click",onReset);
board.addEventListener("click", handleClick);

var currentPlayer = "X";
var gameActive = true;

function checkWinner() {
  const lists = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let list of lists) {
    const [a, b, c] = list;
    if (
      cells[a].textContent && cells[a].textContent === cells[b]?.textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      return cells[a].textContent;
    }
  }

  if ([...cells].every((cell) => cell.textContent)) {
    return "Draw";
  }
  return null;
}
function handleClick(e) {
  const id = e.target.id;
  if (!gameActive || cells[id].textContent) {
    return;
  }
  cells[id].textContent = currentPlayer;
  const winner = checkWinner();
  if (winner) {
    if (winner === "Draw") {
      message.textContent = "It's a draw!";
      gameActive = false;
    } else {
      message.textContent = winner + " wins!";
      gameActive = false;
    }
    return
  }

  currentPlayer = currentPlayer === "X" ? "0" : "X";
}


function onReset() {
  cells.forEach(cell => cell.textContent = '');
  message.textContent = '';
  currentPlayer = 'X';
  gameActive = true;
}