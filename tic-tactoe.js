document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetBtn = document.getElementById('reset-btn');
    const status = document.getElementById('status');

    let currentPlayer = 'x';
    let board = Array(9).fill(null);
    let gameActive = true;

    function handleClick(event) {
        const index = event.target.dataset.index;

        if (board[index] || !gameActive) return;

        board[index] = currentPlayer;
        event.target.classList.add(currentPlayer);

        if (checkWinner()) {
            status.textContent = `${currentPlayer.toUpperCase()} Wins!`;
            gameActive = false;
            return;
        }

       
        if (board.every(cell => cell)) {
            status.textContent = 'It\'s a Tie!';
            gameActive = false;
            return;
        }
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    function resetGame() {
        board = Array(9).fill(null);
        cells.forEach(cell => cell.classList.remove('x', 'o'));
        status.textContent = '';
        gameActive = true;
        currentPlayer = 'x';
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    resetBtn.addEventListener('click', resetGame);
});
