var btn = document.getElementById('btn');
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var vx = 20;
//var vy =0 ;
var count = 0;
var clear=0;
var Score=0;
  
var snake = {
  x: 160,
  y: 160,
  dx: 0,
  dy: vx,
  cells: [], 
  maxCells: 4
};
var food = {
  x: 320,
  y: 320
};


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;}


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
  

 // console.log(snake.x+" "+snake.y);
  if (snake.x < 0) {
    Score=0;
    updateScore();
    snake.x = canvas.width-vx ;
  cancelAnimationFrame(clear);
     snake.cells = [];
     vx=0;
     document.getElementById("Over").style.display="block";
  }
  else if (snake.x >= canvas.width) {
    Score=0;
    updateScore();
    snake.x = 0;
    snake.cells = [];
    vx=0;
   document.getElementById("Over").style.display="block"; 
  }
  
  
  if (snake.y < 0) {
    Score=0;
    updateScore();
    snake.y = canvas.height - vx;
    cancelAnimationFrame(clear);
    snake.cells = [];
     vx=0;
      document.getElementById("Over").style.display="block";
  }
  else if (snake.y >= canvas.height) {
    Score=0;
    updateScore();
    snake.y = 0;
   cancelAnimationFrame(clear);
     snake.cells = [];
     vx=0;
    document.getElementById("Over").style.display="block";  
  }
  
  snake.cells.unshift({x: snake.x, y: snake.y});
  
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }
  
  context.fillStyle = 'red';
  context.fillRect(food.x,food.y, vx-1, vx-1);

  context.fillStyle = 'green';
  snake.cells.forEach(function(cell, index) {
    
   
    context.fillRect(cell.x, cell.y, vx-1, vx-1);  
    //console.log(cell.x+" "+cell.y+" "+index);  
    if (cell.x === food.x && cell.y === food.y) {
      snake.maxCells++;
      Score+=5;

      if(Score>10)
      {
        console.log("hello world");
        //speed();
      }
      updateScore();
     
       food.x = getRandomInt(0, 30) * vx;
      food.y = getRandomInt(0, 30) * vx;
    }
   
    for (var i = index + 1; i < snake.cells.length; i++) {
      
  
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {

        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = vx;
        snake.dy = 0;
         food.x = getRandomInt(0, 30) * vx;
         food.y = getRandomInt(0, 30) * vx;
      }
    }
  });
}

document.addEventListener('keydown', function(event) {
  if (event.which === 37 && snake.dx === 0) {
    snake.dx = -vx;
    snake.dy = 0;
  }
  
  else if (event.which === 38 && snake.dy === 0) {
    snake.dy = -vx;
    snake.dx = 0;
  }
  
  else if (event.which === 39 && snake.dx === 0) {
    snake.dx = vx;
    snake.dy = 0;
  }


 
  else if (event.which === 40 && snake.dy === 0) {
    snake.dy = vx;
    snake.dx = 0;
  }
});


start();

function speed()
{
requestAnimationFrame(start);

  if (++count <40) {
    return;
  }
 count=0;
}

