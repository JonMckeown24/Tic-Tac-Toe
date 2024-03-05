<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Arial', sans-serif;
      text-align: center;
      margin: 50px;
    }

    #board {
      display: grid;
      grid-template-columns: repeat(3, 100px);
      gap: 10px;
      margin-bottom: 20px;
    }

    .cell {
      width: 100px;
      height: 100px;
      font-size: 2em;
      cursor: pointer;
      border: 2px solid #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>
  <title>Tic Tac Toe</title>
</head>
<body>
  <h1>Tic Tac Toe</h1>
  <div id="board"></div>
  <script>
    const board = document.getElementById('board');
    const cells = [];
    let currentPlayer = 'X';
    let gameActive = true;

    // Create the Tic Tac Toe board
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      cell.addEventListener('click', () => handleCellClick(i));
      cells.push(cell);
      board.appendChild(cell);
    }

    // Handle cell click
    function handleCellClick(index) {
      if (!gameActive || cells[index].textContent !== '') return;

      cells[index].textContent = currentPlayer;
      if (checkWinner()) {
        alert(`Player ${currentPlayer} wins!`);
        resetGame();
      } else if (isBoardFull()) {
        alert('It\'s a draw!');
        resetGame();
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }

    // Check for a winner
    function checkWinner() {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
      ];

      for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (
          cells[a].textContent &&
          cells[a].textContent === cells[b].textContent &&
          cells[a].textContent === cells[c].textContent
        ) {
          gameActive = false;
          return true;
        }
      }

      return false;
    }

    // Check if the board is full (a draw)
    function isBoardFull() {
      return cells.every(cell => cell.textContent !== '');
    }

    // Reset the game
    function resetGame() {
      cells.forEach(cell => {
        cell.textContent = '';
      });
      currentPlayer = 'X';
      gameActive = true;
    }
  </script>
</body>
</html>
