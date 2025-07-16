const boardSize = 19;
const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');

let board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
let currentPlayer = 'black';
let gameOver = false;

function createBoard() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    if (gameOver) return;

    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    if (board[row][col]) {
        return; // Cell already occupied
    }

    board[row][col] = currentPlayer;
    const stone = document.createElement('div');
    stone.classList.add('stone', currentPlayer);
    event.target.appendChild(stone);

    if (checkWin(row, col)) {
        gameOver = true;
        setTimeout(() => alert(`${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} wins!`), 100);
        return;
    }

    currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
}

function checkWin(row, col) {
    const directions = [
        { x: 1, y: 0 },  // Horizontal
        { x: 0, y: 1 },  // Vertical
        { x: 1, y: 1 },  // Diagonal \ 
        { x: 1, y: -1 }  // Diagonal / 
    ];

    for (const dir of directions) {
        let count = 1;

        // Check in the positive direction
        for (let i = 1; i < 5; i++) {
            const newRow = row + i * dir.y;
            const newCol = col + i * dir.x;
            if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize && board[newRow][newCol] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }

        // Check in the negative direction
        for (let i = 1; i < 5; i++) {
            const newRow = row - i * dir.y;
            const newCol = col - i * dir.x;
            if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize && board[newRow][newCol] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }

        if (count >= 5) {
            return true;
        }
    }

    return false;
}

function resetGame() {
    board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
    currentPlayer = 'black';
    gameOver = false;
    createBoard();
}

resetButton.addEventListener('click', resetGame);

createBoard();
