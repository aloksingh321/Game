var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var vy = 20;
var count = 0;
var clear=0;
var Score=0;
  
var snake = {
  x: 160,
  y: 160,
  dx: 0,
  dy: vy,
 cells: [], 
  max: 4
};
var food = {
  x: 320,
  y: 320
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function updateScore()
{
  document.getElementById("size").innerHTML=Score;
}

function start() {
  var clear=requestAnimationFrame(start);
  
  if (++count < 4) {
    return;
  }
  count = 0;
  //console.log(canvas.width+" "+canvas.height);
  context.clearRect(0,0,canvas.width,canvas.height);
  
  snake.x += snake.dx;
  snake.y += snake.dy;
 


console.log(snake.x+" "+snake.y);
  if (snake.x < 0) {
    Score=0;
    updateScore();
    snake.x = canvas.width-vy ;
  cancelAnimationFrame(clear);
  }
  else if (snake.x >= canvas.width) {
    Score=0;
    updateScore();
    snake.x = 0;
    cancelAnimationFrame(clear);
  }
  
  if (snake.y < 0) {
    Score=0;
    updateScore();
    snake.y = canvas.height - vy;
    cancelAnimationFrame(clear);
  }
  else if (snake.y >= canvas.height) {
    Score=0;
    updateScore();
    snake.y = 0;
   cancelAnimationFrame(clear);
  }
  snake.cells.unshift({x: snake.x, y: snake.y})

  if (snake.cells.length > snake.max) {
    snake.cells.pop();
  }
  context.fillStyle = 'red';
  context.fillRect(food.x, food.y, grid-1, grid-1);
  context.fillStyle = 'black';
  snake.cells.forEach(function(cell, index) {
    
    context.fillRect(cell.x, cell.y, grid-1, grid-1); 

    if (cell.x === food.x && cell.y === food.y) {
      snake.max++;
      Score+=5;
      updateScore();
      food.x = getRandomInt(0, 30) * vy;
      food.y = getRandomInt(0, 30) * vy;
    }
    
    for (var i = index + 1; i < snake.cells.length; i++) {
      

      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 0;
        snake.y = 0;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = vy;
        snake.dy = 0;
        apple.x = getRandomInt(0, 30) * grid;
        apple.y = getRandomInt(0, 30) * grid;
      }
    }
  });
}
document.addEventListener('keydown', function(e) {
  
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -vx;
    snake.dy = 0;
  }

  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -vx;
    snake.dx = 0;
  }
  
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = vx;
    snake.dy = 0;
  }

  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = vx;
    snake.dx = 0;
  }
});
requestAnimationFrame(start);