const board = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const newGameButton = document.getElementById('newGame');
const gameContainer = document.getElementById('game');
const resultScreen = document.getElementById('resultScreen');
const resultMessage = document.getElementById('resultMessage');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

board.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', startNewGame);

function handleCellClick(e) {
  const cellIndex = e.target.dataset.index;

  if (!gameActive || gameState[cellIndex]) return;

  gameState[cellIndex] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add('taken');

  if (checkWinner()) {
    showResult(`${currentPlayer} Wins!`);
    return;
  }

  if (gameState.every(cell => cell)) {
    showResult('It\'s a Draw!');
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
  return winningCombinations.some(combination =>
    combination.every(index => gameState[index] === currentPlayer)
  );
}

function showResult(message) {
  gameActive = false;
  resultMessage.textContent = message;
  gameContainer.classList.add('hidden');
  resultScreen.classList.remove('hidden');
}

function resetGame() {
  gameState.fill(null);
  currentPlayer = 'X';
  gameActive = true;
  board.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
}

function startNewGame() {
  resetGame();
  gameContainer.classList.remove('hidden');
  resultScreen.classList.add('hidden');
}

