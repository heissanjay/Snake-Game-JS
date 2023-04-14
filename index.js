const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const BLOCK = 20;

var appleX;
var appleY;
var rotateX = 20; // BLOCK
var rotateY = 0;
var gameOn = true;
var score = 0 ;
var scoreEl = document.getElementById("score");

function initGame () {
  ctx.fillStyle = 'black';
  ctx.fillRect( 0, 0, WIDTH, HEIGHT );
  setApple();
  showApple();
  drawSnake();
}

var snake = [
  {x : BLOCK * 2, y : 0},
  {x : BLOCK , y : 0},
  { x: 0, y: 0 }
]

// apple to be appear on the game board
function setApple () {
  // we need random x and y coordinates
  appleX = Math.floor(Math.random() * WIDTH / BLOCK) * BLOCK;
  appleY = Math.floor(Math.random() * HEIGHT / BLOCK) * BLOCK;

}

function showApple () {
  ctx.fillStyle = 'red';
  ctx.fillRect(appleX, appleY, BLOCK, BLOCK);
}

function resetBoard() {
  ctx.fillStyle = 'black';
  ctx.fillRect( 0, 0, WIDTH, HEIGHT );
}


function drawSnake() {
  ctx.fillStyle = 'green';
  ctx.strokeStyle = '#fff';
  snake.forEach( (snakeBlock)=> {
    ctx.fillRect(snakeBlock.x,snakeBlock.y, BLOCK, BLOCK);
    ctx.strokeRect(snakeBlock.x,snakeBlock.y, BLOCK, BLOCK);
  })
}

// move the snake
function move() {
  // set the head of the snake
  const head = { x: snake[0].x + rotateX, y: snake[0].y+ rotateY };
  snake.unshift(head);

  // check if the snake has eaten the apple
  if( head.x === appleX && head.y === appleY ) {
    score += 1;
    scoreEl.innerHTML = score;
    // remove the apple
    resetBoard();
    setApple();
    showApple();
  } else {
   // remove the tail of the snake
  snake.pop();
  }
}

window.addEventListener('keydown', (e) => {
  setTimeout( () => {
    if (e.key === 'ArrowLeft' && rotateX !== BLOCK) {
      rotateX = -BLOCK;
      rotateY = 0;
    } else if (e.key === 'ArrowRight' && rotateX !== -BLOCK) {
      rotateX = BLOCK;
      rotateY = 0;
    } else if (e.key === 'ArrowUp' && rotateY !== BLOCK) {
      rotateX = 0;
      rotateY = -BLOCK;
    } else if (e.key === 'ArrowDown' && rotateY !== -BLOCK) {
      rotateX = 0;
      rotateY = BLOCK;
    }
  }, 1)
})

function checkWallHit() {
  if (snake[0].x < 0 || snake[0].x > WIDTH || snake[0].y < 0 || snake[0].y > HEIGHT) {
    gameOn = false;
  }
}
// check if the snake bit
function checkBite() {
  for(let i = 1; i < snake.length; i++) {
    if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      gameOn = false;
    }
  }
}



function gameLoop() {
  if(gameOn) {
  setTimeout( () => {
    resetBoard();
    move();
    showApple();
    drawSnake();
    checkWallHit();
    checkBite();
    gameLoop();
  }, 1000/15)
}else if(!gameOn) {
  resetBoard();
  ctx.font="bold 40px Sherif";
  ctx.fillStyle = "red";
  ctx.textAlgin = "center";
  ctx.fillText ("G A M E O V E R !!", WIDTH/6, HEIGHT/2);
}
}


initGame();
gameLoop();