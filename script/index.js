// get Board and set size
const board = document.getElementById('board');
let blockSize = 25;
let rows = 20;
let columns = 20;
const context = board.getContext("2d");

// Create Snake
let snakeX = blockSize * 2;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

// create the snake body
let snakeBody = [];


// Create Food
let foodX;
let foodY;

window.onload = function () {
  board.height = rows * blockSize;
  board.width = columns * blockSize;

  placeFood();

  document.addEventListener('keyup', changeDirection);

  // updateBoard();
  setInterval(updateBoard, 1000 / 10);
}

function updateBoard() {
  context.fillStyle = 'black';
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = 'red';
  context.fillRect(foodX, foodY, blockSize, blockSize);

  // grow the snake body
  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] - snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = 'green';
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;

  context.fillRect(snakeX, snakeY, blockSize, blockSize);

  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }
}

function changeDirection(event) {
  if (event.code === 'ArrowUp' && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (event.code === 'ArrowDown' && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (event.code === 'ArrowRight' && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  } else if (event.code === 'ArrowLeft' && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * columns) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}