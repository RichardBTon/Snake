const fart = 20;
let vx = 0;
let vy = 0;

let px = 5;
let py = 5;

const snakeBox = document.getElementById("snake-box");
const snakeHead = document.getElementById("snakeHead");

document.addEventListener("keydown", moveInit);

function moveInit(event) {
  // left: 37
  // up: 38
  // right: 39
  // down: 40

  if (event.keyCode === 37) {
    console.log("left");
    vx = -fart;
    vy = 0;
    changePosition(vx, vy);
  }
  if (event.keyCode === 38) {
    console.log("up");
    vy = -fart;
    vx = 0;
    changePosition(vx, vy);
  }
  if (event.keyCode === 39) {
    console.log("right");
    vx = fart;
    vy = 0;
    changePosition(vx, vy);
  }
  if (event.keyCode === 40) {
    console.log("down");
    vy = fart;
    vx = 0;
    changePosition(vx, vy);
  }
}

function changePosition(vx, vy) {
  snakeHead.style.left = snakeHead.offsetLeft + vx + "px";
  snakeHead.style.top = snakeHead.offsetTop + vy + "px";
}
