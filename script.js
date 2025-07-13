const cells = document.querySelectorAll('.cell');
const turnElement = document.getElementById('turn');
const resetButton = document.getElementById('reset');
const resultScreen = document.getElementById('result-screen');
const resultMessage = document.getElementById('result-message');
const playAgainButton = document.getElementById('play-again');
const onePlayerButton = document.getElementById('one-player');
const twoPlayerButton = document.getElementById('two-player');
const winSound = document.getElementById('win-sound');
const clickSound = document.getElementById('click-sound');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let onePlayerMode = false;

// Function to check winner
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const combination = winningCombinations[i];
    if (gameBoard[combination[0]] === gameBoard[combination[1]] && gameBoard[combination[1]] === gameBoard[combination[2]] && gameBoard[combination[0]] !== '') {
      return gameBoard[combination[0]];
    }
  }

  if (!gameBoard.includes('')) {
    return 'draw';
  }

  return null;
}

// Function to handle cell click
function handleCellClick(index) {
  if (gameOver || gameBoard[index] !== '') {
    return;
  }

  gameBoard[index] = currentPlayer;
  if (currentPlayer === 'X') {
    cells[index].textContent = 'X';
    cells[index].classList.add('X');
  } else {
    cells[index].textContent = 'O';
    cells[index].classList.add('O');
  }
  clickSound.play();

  const winner = checkWinner();
  if (winner === 'X' || winner === 'O') {
    gameOver = true;
    resultMessage.textContent = `Player ${winner} wins!`;
    resultScreen.style.display = 'flex';
    resultScreen.classList.add('pop');
    winSound.play();
    cells.forEach(cell => cell.classList.add(winner === 'X' ? 'win-animation' : 'lose-animation'));
  } else if (winner === 'draw') {
    gameOver = true;
    resultMessage.textContent = 'It\'s a draw!';
    resultScreen.style.display = 'flex';
    resultScreen.classList.add('pop');
    cells.forEach(cell => cell.classList.add('draw-animation'));
  } else {
    if (onePlayerMode) {
      currentPlayer = 'O';
      makeComputerMove();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      turnElement.textContent = `Turn: ${currentPlayer}`;
    }
  }
}

// Function to make computer move
function makeComputerMove() {
  const emptyCells = gameBoard.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  gameBoard[randomIndex] = 'O';
  cells[randomIndex].textContent = 'O';
  cells[randomIndex].classList.add('O');
  clickSound.play();

  const winner = checkWinner();
  if (winner === 'X' || winner === 'O') {
    gameOver = true;
    resultMessage.textContent = `Player ${winner} wins!`;
    resultScreen.style.display = 'flex';
    resultScreen.classList.add('pop');
    winSound.play();
    cells.forEach(cell => cell.classList.add(winner === 'O' ? 'win-animation' : 'lose-animation'));
  } else if (winner === 'draw') {
    gameOver = true;
    resultMessage.textContent = 'It\'s a draw!';
    resultScreen.style.display = 'flex';
    resultScreen.classList.add('pop');
    cells.forEach(cell => cell.classList.add('draw-animation'));
  } else {
    currentPlayer = 'X';
    turnElement.textContent = `Turn: ${currentPlayer}`;
  }
}

// Function to handle reset
function handleReset() {
  gameOver = false;
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O', 'win-animation', 'lose-animation', 'draw-animation');
  });
  turnElement.textContent = `Turn: ${currentPlayer}`;
  resultScreen.style.display = 'none';
  resultScreen.classList.remove('pop');
}

// Function to handle one player mode
function handleOnePlayerMode() {
  onePlayerMode = true;
  handleReset();
}

// Function to handle two player mode
function handleTwoPlayerMode() {
  onePlayerMode = false;
  handleReset();
}

// Add event listeners
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(index));
});
resetButton.addEventListener('click', handleReset);
playAgainButton.addEventListener('click', handleReset);
onePlayerButton.addEventListener('click', handleOnePlayerMode);
twoPlayerButton.addEventListener('click', handleTwoPlayerMode);