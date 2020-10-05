const snakeBox = document.getElementById("snakeBox");
const snakeHead = document.getElementById("snakeHead");

let gridSize = 20;

const sizebtns = document.getElementsByClassName("size-btn");
for (var i = 0; i < sizebtns.length; i++) {
  addListener(sizebtns[i], i);
}

function addListener(btn, i) {
  btn.addEventListener("click", function () {
    gridSize = i * 20 + 20;
    console.log(gridSize);
  });
}
const pxPerRute = snakeBox.offsetHeight / gridSize;
// velocity
let vx = 0;
let vy = 0;
// posisjon
let px = 8;
let py = 8;
// eple posisjon
let ax = 15;
let ay = 8;

let halelength = 5;

let hale = [];
haleInit(hale);
apple = document.createElement("div");
appleInit(apple);

// appleInit(apple);
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
      event.preventDefault();
      if (!started) {
        gameLoop = setInterval(moveSnake, 120);
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
      clearInterval(gameLoop);
      started = false;
    }
  }
}

function moveSnake() {
  lastVisited.unshift({ x: px, y: py });
  px += vx;
  py += vy;
  borders();

  if (lastVisited.length >= hale.length + 5) {
    lastVisited = lastVisited.slice(0, hale.length + 5);
  }

  if (ax === px && ay === py) {
    randomApplePos();
  }

  if (haleCrash(px, py)) {
    tap();
  } else {
    changeVisualPosition(snakeHead, px, py);
    for (var i = 0; i < hale.length; i++) {
      hale[i].x = lastVisited[i].x;
      hale[i].y = lastVisited[i].y;
      changeVisualPosition(hale[i].elm, hale[i].x, hale[i].y);
    }
  }
}

function changeVisualPosition(div, x, y) {
  div.style.left = x * pxPerRute + "px";
  div.style.top = y * pxPerRute + "px";
}

function borders() {
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

    changeVisualPosition(hale[i].elm, hale[i].x, hale[i].y);
  }
}

function addHaledel(x, y) {
  elm = document.createElement("div");
  elm.classList.add("snake-square");
  snakeBox.appendChild(elm);
  hale.push({ elm: elm, x: x, y: y });
}

function appleInit(apple) {
  apple.classList.add("apple");
  snakeBox.appendChild(apple);
  changeVisualPosition(apple, ax, ay);
}

function randomApplePos() {
  ax = Math.floor(Math.random() * gridSize);
  ay = Math.floor(Math.random() * gridSize);

  if (haleCrash(ax, ay)) {
    randomApplePos();
  } else {
    changeVisualPosition(apple, ax, ay);
    addHaledel(
      lastVisited[lastVisited.length - 1].x,
      lastVisited[lastVisited.length - 1].y
    );
  }
}

function haleCrash(x, y) {
  let crash = false;
  for (var i = 0; i < hale.length; i++) {
    if (x === hale[i].x && y === hale[i].y) {
      crash = true;
    }
  }
  return crash;
}

function tap() {
  clearInterval(gameLoop);
  document.getElementById("tap").style.visibility = "visible";
}
