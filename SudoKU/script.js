document.addEventListener('DOMContentLoaded', () => {
    const sudokuGrid = document.querySelector('.sudoku-grid');
    const checkSolutionButton = document.getElementById('checkSolution');
    const clearSolutionButton = document.getElementById('clearSolution');
    let puzzle = [
        5, 3, null, null, 7, null, null, null, null,
        6, null, null, 1, 9, 5, null, null, null,
        null, 9, 8, null, null, null, null, 6, null,
        8, null, null, null, 6, null, null, null, 3,
        4, null, null, 8, null, 3, null, null, 1,
        7, null, null, null, 2, null, null, null, 6,
        null, 6, null, null, null, null, 2, 8, null,
        null, null, null, 4, 1, 9, null, null, 5,
        null, null, null, null, 8, null, null, 7, 9
    ];

    function initializeGame() {
        sudokuGrid.innerHTML = '';
        puzzle = shufflePuzzle(puzzle);

        for (let i = 0; i < 81; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.addEventListener('input', handleInput);
            if (puzzle[i]) {
                input.value = puzzle[i];
                input.disabled = true;
            }
            sudokuGrid.appendChild(input);
        }

        checkSolutionButton.addEventListener('click', () => {
            checkSolution();
        });

        clearSolutionButton.addEventListener('click', () => {
            clearSolution();
        });
    }

    function handleInput(event) {
        const value = event.target.value;
        if (!/^[1-9]$/.test(value)) {
            event.target.value = '';
        }
    }

    function checkSolution() {
        const inputs = sudokuGrid.querySelectorAll('input');
        const userSolution = Array.from(inputs).map(input => input.value.trim() || null);
        const solution = puzzle.map(value => value ? String(value) : '');

        if (JSON.stringify(userSolution) === JSON.stringify(solution)) {
            Swal.fire('Congratulations!', 'You solved the puzzle!', 'success');
        } else {
            Swal.fire('Oops!', 'The solution is incorrect. Please try again.', 'error');
        }
    }

    function clearSolution() {
        initializeGame();
    }

    initializeGame();
});

function shufflePuzzle(puzzle) {
    const newPuzzle = [...puzzle];
    const rows = 9;
    const cols = 9;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (newPuzzle[row * cols + col] !== null) {
                const newRow = Math.floor(Math.random() * rows);
                const newCol = Math.floor(Math.random() * cols);
                const newIndex = newRow * cols + newCol;

                // Swap values
                const temp = newPuzzle[newIndex];
                newPuzzle[newIndex] = newPuzzle[row * cols + col];
                newPuzzle[row * cols + col] = temp;
            }
        }
    }

    return newPuzzle;
}

