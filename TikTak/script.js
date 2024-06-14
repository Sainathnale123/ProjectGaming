let currentPlayer = 'X';
let cells = document.querySelectorAll('.cell');
let message = document.getElementById('message');

function placeMarker(cellIndex) {
    if (cells[cellIndex].innerText === '') {
        cells[cellIndex].innerText = currentPlayer;
        
        if (checkWin()) {
            showMessage(`${currentPlayer} wins!`);
            disableCells();
        } else if (checkDraw()) {
            showMessage(`It's a draw!`);
            disableCells();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.innerText = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    return winConditions.some(combination => {
        return combination.every(index => {
            return cells[index].innerText === currentPlayer;
        });
    });
}

function checkDraw() {
    return [...cells].every(cell => cell.innerText !== '');
}

function disableCells() {
    cells.forEach(cell => {
        cell.onclick = null; // disable onclick
    });
}

function showMessage(msg) {
    let popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h2>${msg}</h2>
            <button onclick="resetGame()">Play Again</button>
        </div>
    `;
    document.body.appendChild(popup);
}

function resetGame() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
        cell.onclick = () => placeMarker(Array.from(cells).indexOf(cell));
    });
    currentPlayer = 'X';
    message.innerText = `Player ${currentPlayer}'s turn`;
    document.querySelector('.popup').remove();
}
