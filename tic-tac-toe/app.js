const board = document.getElementById('board');
const message = document.getElementById('message');
const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameActive = true;

function checkWinner() {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
      return cells[a].textContent;
    }
  }

  if ([...cells].every(cell => cell.textContent)) {
    return 'Draw';
  }

  return null;
}

function handleClick(event) {
  const cell = event.target;

  if (cell.textContent || !gameActive) {
    return;
  }

  cell.textContent = currentPlayer;

  const winner = checkWinner();

  if (winner) {
    if (winner === 'Draw') {
      message.textContent = 'It\'s a draw!';
    } else {
      message.textContent = `${winner} wins!`;
    }
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function resetGame() {
  cells.forEach(cell => cell.textContent = '');
  message.textContent = '';
  currentPlayer = 'X';
  gameActive = true;
}

board.addEventListener('click', handleClick);
