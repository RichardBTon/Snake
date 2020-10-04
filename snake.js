const snakeBox = document.getElementById("snakeBox");
const snakeHead = document.getElementById("snakeHead");

const gridSize = 20;
const pxPerRute = snakeBox.offsetHeight / gridSize;
console.log(pxPerRute);

let lastVisited = [];
let grid = [];

let vx = 0;
let vy = 0;

let px = 8;
let py = 8;
let halelength = 3;

function rutenettInit(rutenett) {
  const row = [];
  row.length = gridSize;
  row.fill(0);
  for (var i = 0; i < gridSize; i++) {
    rutenett.push(row);
  }
}

rutenettInit(grid);
// haleInit();
changeVisualPosition(px, py);

document.addEventListener("keydown", moveInit);

let started = false;

function moveInit(event) {
  // left: 37
  // up: 38
  // right: 39
  // down: 40
  // space = 32

  for (var k = 0; k < 4; k++) {
    if (event.keyCode === 37 + k) {
      if (!started) {
        intervall = setInterval(moveSnake, 100);
        started = true;
      }
    }
  }
  if (event.keyCode === 37) {
    console.log("left");
    vx = -1;
    vy = 0;
  }
  if (event.keyCode === 38) {
    console.log("up");
    vx = 0;
    vy = -1;
  }
  if (event.keyCode === 39) {
    console.log("right");
    vx = 1;
    vy = 0;
  }
  if (event.keyCode === 40) {
    console.log("down");
    vx = 0;
    vy = 1;
  }
  if (event.keyCode === 32) {
    if (started) {
      console.log("pause");
      clearInterval(intervall);
      started = false;
    }
  }
}

function moveSnake() {
  px += vx;
  py += vy;
  borders();
  lastVisited.push([px, py]);
  if (lastVisited.length >= halelength) {
    lastVisited = lastVisited.slice(
      lastVisited.length - halelength,
      lastVisited.length
    );
  }
  console.log(lastVisited);
  changeVisualPosition(px, py);
}

function changeVisualPosition(x, y) {
  snakeHead.style.left = x * pxPerRute + "px";
  snakeHead.style.top = y * pxPerRute + "px";
}

function borders() {
  // console.log("hei");
  // top border
  if (py < 0) {
    py = gridSize - 1;
  }
  // right border
  if (px > gridSize - 1) {
    px = 0;
  }
  // bottom border
  if (py > gridSize - 1) {
    py = 0;
  }
  // left border
  if (px < 0) {
    px = gridSize - 1;
  }
}
