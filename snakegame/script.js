const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const stopButton = document.getElementById("stopButton");
const scoreDisplay = document.getElementById("score");

const upArrow = document.getElementById("upArrow");
const downArrow = document.getElementById("downArrow");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

canvas.width = 400;
canvas.height = 500;

const box = 20;
let snake = [{x: 9 * box, y: 10 * box}];
let direction = "RIGHT";
let score = 0;
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};
let game;
let paused = true; // Game starts paused

let lastTouchTime = 0;

document.addEventListener('touchstart', function(event) {
    let now = new Date().getTime();
    if (now - lastTouchTime <= 300) {
        event.preventDefault();
    }
    lastTouchTime = now;
}, { passive: false });

// Prevent zooming on click for non-touch devices
document.addEventListener('click', function(event) {
    event.preventDefault();
}, { passive: false });

document.addEventListener("keydown", changeDirection);
startButton.addEventListener("click", startGame);
pauseButton.addEventListener("click", togglePause);
stopButton.addEventListener("click", stopGame);

upArrow.addEventListener("click", () => setDirection("UP"));
downArrow.addEventListener("click", () => setDirection("DOWN"));
leftArrow.addEventListener("click", () => setDirection("LEFT"));
rightArrow.addEventListener("click", () => setDirection("RIGHT"));

function draw() {
    if (paused) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        scoreDisplay.textContent = score;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert("Game Over");
        stopGame();
    }

    snake.unshift(newHead);
}

function changeDirection(event) {
    if (event.keyCode === 37 && direction !== "RIGHT") direction = "LEFT";
    if (event.keyCode === 38 && direction !== "DOWN") direction = "UP";
    if (event.keyCode === 39 && direction !== "LEFT") direction = "RIGHT";
    if (event.keyCode === 40 && direction !== "UP") direction = "DOWN";
}

function setDirection(newDirection) {
    if (newDirection === "LEFT" && direction !== "RIGHT") direction = "LEFT";
    if (newDirection === "UP" && direction !== "DOWN") direction = "UP";
    if (newDirection === "RIGHT" && direction !== "LEFT") direction = "RIGHT";
    if (newDirection === "DOWN" && direction !== "UP") direction = "DOWN";
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

function startGame() {
    if (!paused) return; // Prevent starting multiple games simultaneously

    paused = false;
    startButton.disabled = true;
    pauseButton.disabled = false;
    stopButton.disabled = false;

    score = 0;
    scoreDisplay.textContent = score;
    snake = [{x: 9 * box, y: 10 * box}];
    direction = "RIGHT";
    food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };

    game = setInterval(draw, 210); // Adjusted snake speed to 210ms
}

function togglePause() {
    paused = !paused;
    pauseButton.textContent = paused ? "Resume" : "Pause";
}

function stopGame() {
    clearInterval(game);
    paused = true;
    startButton.disabled = false;
    pauseButton.disabled = true;
    stopButton.disabled = true;
    stopBackgroundMusic();
    redirectToHomePage();
}
function stopBackgroundMusic() {
    const music = document.getElementById('backgroundMusic');
    music.pause();
}
function redirectToHomePage() {
    // Replace with your home page URL or desired action
    window.location.href = 'index.html'; // Example URL
}