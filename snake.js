const snakeBox = document.getElementById("snakeBox");
const snakeHead = document.getElementById("snakeHead");

const gridSize = 20;
const pxPerRute = snakeBox.offsetHeight / gridSize;
console.log(pxPerRute);

let vx = 0;
let vy = 0;

let px = 8;
let py = 8;
let halelength = 3;

// let grid = [];
// function rutenettInit(rutenett) {
//   const row = [];
//   row.length = gridSize;
//   row.fill(0);
//   for (var i = 0; i < gridSize; i++) {
//     rutenett.push(row);
//   }
// }
// rutenettInit(grid);

let hale = [];
haleInit(hale);
let lastVisited = [];
for (var i = 0; i < hale.length; i++) {
  lastVisited.push({ x: hale[i].x, y: hale[i].y });
}
changeVisualPosition(snakeHead, px, py);

document.addEventListener("keydown", moveInit);

let started = false;
let direction = undefined;
function moveInit(event) {
  // left: 37
  // up: 38
  // right: 39
  // down: 40
  // space = 32

  for (var k = 0; k < 4; k++) {
    if (event.keyCode === 37 + k) {
      if (!started) {
        intervall = setInterval(moveSnake, 120);
        started = true;
      }
    }
  }
  if (event.keyCode === 37) {
    if (direction != "right") {
      direction = "left";
      vx = -1;
      vy = 0;
    }
  }
  if (event.keyCode === 38) {
    if (direction != "down") {
      direction = "up";
      vx = 0;
      vy = -1;
    }
  }
  if (event.keyCode === 39) {
    if (direction != "left") {
      direction = "right";
      vx = 1;
      vy = 0;
    }
  }
  if (event.keyCode === 40) {
    if (direction != "up") {
      direction = "down";
      vx = 0;
      vy = 1;
    }
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
  lastVisited.unshift({ x: px, y: py });
  px += vx;
  py += vy;
  borders();

  if (lastVisited.length > halelength) {
    lastVisited = lastVisited.slice(0, halelength);
  }
  console.log(lastVisited);
  changeVisualPosition(snakeHead, px, py);
  for (var i = 0; i < hale.length; i++) {
    hale[i].x = lastVisited[i].x;
    hale[i].y = lastVisited[i].y;
    changeVisualPosition(hale[i].elm, hale[i].x, hale[i].y);
  }
}

function changeVisualPosition(div, x, y) {
  div.style.left = x * pxPerRute + "px";
  div.style.top = y * pxPerRute + "px";
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

function haleInit() {
  for (var i = 0; i < halelength; i++) {
    x = px - (i + 1);
    y = py;
    addHaledel(x, y);
    snakeBox.appendChild(hale[i].elm);
    changeVisualPosition(hale[i].elm, hale[i].x, hale[i].y);
  }
}

function addHaledel() {
  elm = document.createElement("div");
  elm.classList.add("snake-square");
  hale.push({ elm: elm, x: x, y: y });
}
