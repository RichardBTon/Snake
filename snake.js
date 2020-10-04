const snakeBox = document.getElementById("snakeBox");
const snakeHead = document.getElementById("snakeHead");

const gridSize = 20;
const pxPerRute = snakeBox.offsetHeight / gridSize;
console.log(pxPerRute);

let lastVisited = [];
let grid = [];
let fart = 1;
let vx = 0;
let vy = 0;

let px = 5;
let py = 5;

function rutenettInit(rutenett) {
  const row = [];
  row.length = gridSize;
  row.fill(0);
  for (var i = 0; i < gridSize; i++) {
    rutenett.push(row);
  }
}
rutenettInit(grid);

document.addEventListener("keydown", moveInit);

let started = false;
function moveInit(event) {
  // left: 37
  // up: 38
  // right: 39
  // down: 40
  if (!started) {
    hello = setInterval(changePosition, 100);
    started = true;
  }

  if (event.keyCode === 37) {
    console.log("left");
    vx = -fart;
    vy = 0;
  }
  if (event.keyCode === 38) {
    console.log("up");
    vy = -fart;
    vx = 0;
  }
  if (event.keyCode === 39) {
    console.log("right");
    vx = fart;
    vy = 0;
  }
  if (event.keyCode === 40) {
    console.log("down");
    vy = fart;
    vx = 0;
  }
  if (event.keyCode === 32) {
    console.log("pause");
    vy = 0;
    vx = 0;
    clearInterval(hello);
    started = false;
  }
}

function changePosition() {
  snakeHead.style.left = snakeHead.offsetLeft + vx * pxPerRute + "px";
  snakeHead.style.top = snakeHead.offsetTop + vy * pxPerRute + "px";
}
