// get board
const gameBoard = document.getElementById('board');
// get context for drawing on canvas
const context = gameBoard.getContext('2d');
// get score and reset button 
const scoreText = document.getElementById('scoreText');
const resetBtn = document.getElementById('resetBtn');
// set board dimensions and color
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = 'black';
// set snake and food color
const snakeColor = 'green';
const snakeBorder = 'yellow';
const foodColor = 'red';
// set unit size
const unitSize = 25;

// set game mechanic variables 
let gameRunning = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;

let snake = [
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize, y: 0 },
  { x: 0, y: 0 },
];

window.addEventListener('keydown', changeDirection);
resetBtn.addEventListener('click', resetGame);

gameStart();

function gameStart() {
  running = true;
  scoreText.textContent = score;
  createFood();
  drawfood();
  nextTick();
};

function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawfood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 75);
  } else {
    displayGameOver();
  }
};

function clearBoard() {
  context.fillStyle = boardBackground;
  context.fillRect(0, 0, gameWidth, gameHeight)
};

function createFood() {
  function randomFood(min, max) {
    const randomPlace = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize
    return randomPlace
  }

  foodX = randomFood(0, gameWidth - unitSize);
  foodY = randomFood(0, gameWidth - unitSize);
};

function drawfood() {
  context.fillStyle = foodColor;
  context.fillRect(foodX, foodY, unitSize, unitSize)
};

function moveSnake() {
  const snakeHead = {
    x: snake[0].x + xVelocity,
    y: snake[0].y + yVelocity,
  };
  snake.unshift(snakeHead);

  //if food was eaten
  if (snake[0].x == foodX && snake[0].y == foodY) {
    score += 1;
    scoreText.textContent = score;
    createFood();
  } else {
    snake.pop();
  }
};

function drawSnake() {
  context.fillStyle = snakeColor;
  context.strokeStyle = snakeBorder;
  snake.forEach(snakePart => {
    context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    context.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  });
};

function changeDirection(event) {
  const keyPress = event.code;

  const movingUp = (yVelocity == -unitSize);
  const movingDown = (yVelocity == unitSize);
  const movingRight = (xVelocity == unitSize);
  const movingLeft = (xVelocity == -unitSize);

  switch (true) {
    case (keyPress == 'ArrowLeft' && !movingRight):
      xVelocity = -unitSize;
      yVelocity = 0;
      break;
    case (keyPress == 'ArrowUp' && !movingDown):
      xVelocity = 0;
      yVelocity = -unitSize;
      break;
    case (keyPress == 'ArrowRight' && !movingLeft):
      xVelocity = unitSize;
      yVelocity = 0;
      break;
    case (keyPress == 'ArrowDown' && !movingUp):
      xVelocity = 0;
      yVelocity = unitSize;
      break;
  }

};

function checkGameOver() {

  // if snake runs into walls game is over
  switch (true) {
    case (snake[0].x < 0):
      running = false;
      break;
    case (snake[0].x >= gameWidth):
      running = false;
      break;
    case (snake[0].y < 0):
      running = false;
      break;
    case (snake[0].y >= gameHeight):
      running = false;
      break;
  }

  //if snake runs into itself, game is over
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false;
    }
  }
};

function displayGameOver() {
  context.font = "3rem MV Boli";
  context.fillStyle = 'white';
  context.textAlign = 'center';
  context.fillText('GAME OVER!', gameWidth / 2, gameHeight / 2);
  running = false;
};

function resetGame() {
  score = 0;
  xVelocity = unitSize;
  yVelocity = 0;

  snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 },
  ];

  gameStart();
};
