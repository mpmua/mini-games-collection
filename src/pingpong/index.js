import { Capacitor } from "@capacitor/core";
import { isTouchDevice } from "../js/global";

const pageWrap = document.querySelector("#page-wrap");
const scoreDiv = document.querySelector(".score");
const currentScoreElem = document.querySelector(".score");
const highScoreElem = document.querySelector(".high-score");
const gameStartScreen = document.querySelector(".game-start-screen");
const gameStartText = document.querySelector(".game-start-text");
const startBtn = document.querySelector(".start-btn");
const ball = document.querySelector(".ball");
const playerHandle = document.querySelector(".player-handle");
const enemyHandle = document.querySelector(".enemy-handle");

let timerId;
let gameOver = false;
let ballCurrentPosition;

let ballSpeed;
let xDirection;
let yDirection;

function storedHighScoreCheck() {
  if (localStorage.getItem("highScore") == null) {
    localStorage.setItem("highScore", 0);
  }
}

storedHighScoreCheck();

function displayGameStartScreen() {
  gameStartText.innerHTML = "Keep the ball in play";

  startBtn.addEventListener("click", () => {
    if (Capacitor.getPlatform() === "android" || isTouchDevice()) {
      document.addEventListener("touchmove", movePlayerHandle, {
        passive: false,
      });
    } else if (Capacitor.getPlatform() === "web") {
      document.addEventListener("mousemove", movePlayerHandle, {
        passive: false,
      });
    }

    gameStartScreen.style.display = "none";
    ballCurrentPosition = [190, 200];
    userScore = 0;
    ballSpeed = 1;
    xDirection = ballSpeed;
    yDirection = ballSpeed;

    timerId = setInterval(moveBall, 1);
  });
}

let storedHighScore = localStorage.getItem("highScore");

displayGameStartScreen();

let userScore = 0;
currentScoreElem.innerHTML = `Score ${userScore} <br>
                        High Score: ${storedHighScore}`;

function moveEnemyHandle(ballXPos) {
  let pageWidth = pageWrap.offsetWidth - enemyHandle.offsetWidth;
  let enemyHandleWidthHalf = enemyHandle.offsetWidth / 2;

  enemyHandle.style.left = ballXPos - enemyHandleWidthHalf + "px";
}

let southWest;
let southEast;
let northWest;
let northEast;
let ballDirection;

function moveBall() {
  userScore++;
  currentScoreElem.innerHTML = `Score ${userScore} <br>
                        High Score: ${storedHighScore}`;

  checkForCollisions(ballSpeed);

  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;

  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.top = ballCurrentPosition[1] + "px";

  moveEnemyHandle(ballCurrentPosition[0]);

  if (userScore % 1000 === 0 && userScore > 0 && userScore <= 10000) {
    if (ballDirection === "southWest") {
      ballSpeed += 0.5;
      xDirection = -ballSpeed;
      yDirection = ballSpeed;
    } else if (ballDirection === "northWest") {
      ballSpeed += 0.5;
      xDirection = -ballSpeed;
      yDirection = -ballSpeed;
    } else if (ballDirection === "northEast") {
      ballSpeed += 0.5;
      xDirection = ballSpeed;
      yDirection = -ballSpeed;
    } else if (ballDirection === "southEast") {
      ballSpeed += 0.5;
      xDirection = ballSpeed;
      yDirection = ballSpeed;
    }
  }
}

function checkForCollisions(ballSpeed) {
  if (
    ball.getBoundingClientRect().bottom >=
      playerHandle.getBoundingClientRect().top &&
    ball.getBoundingClientRect().right >=
      playerHandle.getBoundingClientRect().left &&
    ball.getBoundingClientRect().left <=
      playerHandle.getBoundingClientRect().right &&
    xDirection == ballSpeed &&
    yDirection == ballSpeed
  ) {
    northEast = true;
    ballDirection = "northEast";

    changeDirection(ballSpeed);
    return;
  }

  if (
    ball.getBoundingClientRect().bottom >=
      playerHandle.getBoundingClientRect().top &&
    ball.getBoundingClientRect().right >=
      playerHandle.getBoundingClientRect().left &&
    ball.getBoundingClientRect().left <=
      playerHandle.getBoundingClientRect().right &&
    xDirection == -ballSpeed &&
    yDirection == ballSpeed
  ) {
    northWest = true;
    ballDirection = "northWest";

    changeDirection(ballSpeed);
    return;
  }

  if (
    ball.getBoundingClientRect().top <=
      enemyHandle.getBoundingClientRect().bottom &&
    ball.getBoundingClientRect().right >=
      enemyHandle.getBoundingClientRect().left &&
    ball.getBoundingClientRect().left <=
      enemyHandle.getBoundingClientRect().right &&
    xDirection == ballSpeed &&
    yDirection == -ballSpeed
  ) {
    southEast = true;
    ballDirection = "southEast";

    changeDirection(ballSpeed);
    return;
  }

  if (
    ball.getBoundingClientRect().top <=
      enemyHandle.getBoundingClientRect().bottom &&
    ball.getBoundingClientRect().right >=
      enemyHandle.getBoundingClientRect().left &&
    ball.getBoundingClientRect().left <=
      enemyHandle.getBoundingClientRect().right &&
    xDirection == -ballSpeed &&
    yDirection == -ballSpeed
  ) {
    southWest = true;
    ballDirection = "southWest";

    changeDirection(ballSpeed);
    return;
  }

  if (ballCurrentPosition[1] >= playerHandle.getBoundingClientRect().top) {
    gameOver = true;
    clearInterval(timerId);
    gameStartScreen.style.display = "block";
    gameStartText.innerHTML = "Game Over";
    startBtn.innerHTML = "Restart";

    if (userScore > localStorage.getItem("highScore")) {
      localStorage.setItem("highScore", userScore);
      storedHighScore = localStorage.getItem("highScore");
      currentScoreElem.innerHTML = `Score ${userScore} <br>
                        High Score: ${storedHighScore}`;
    }

    storedHighScoreCheck();
    return;
  }

  if (
    ballCurrentPosition[0] + ball.offsetWidth >=
      pageWrap.getBoundingClientRect().width &&
    xDirection == ballSpeed &&
    yDirection == ballSpeed
  ) {
    southWest = true;
    ballDirection = "southWest";
    changeDirection(ballSpeed);
    return;
  }

  if (
    ballCurrentPosition[0] + ball.offsetWidth >=
      pageWrap.getBoundingClientRect().width &&
    xDirection == ballSpeed &&
    yDirection == -ballSpeed
  ) {
    northWest = true;
    ballDirection = "northWest";

    changeDirection(ballSpeed);
    return;
  }

  if (
    ballCurrentPosition[0] <= 0 &&
    xDirection == -ballSpeed &&
    yDirection == -ballSpeed
  ) {
    northEast = true;
    ballDirection = "northEast";
    changeDirection(ballSpeed);
    return;
  }

  if (
    ballCurrentPosition[0] <= 0 &&
    xDirection == -ballSpeed &&
    yDirection == ballSpeed
  ) {
    southEast = true;
    ballDirection = "southEast";

    changeDirection(ballSpeed);
    return;
  }

  if (
    ballCurrentPosition[1] <= pageWrap.getBoundingClientRect().top &&
    xDirection == -ballSpeed &&
    yDirection == -ballSpeed
  ) {
    southWest = true;
    ballDirection = "southWest";
    changeDirection(ballSpeed);
    return;
  }

  if (
    ballCurrentPosition[1] <= pageWrap.getBoundingClientRect().top &&
    xDirection == ballSpeed &&
    yDirection == -ballSpeed
  ) {
    southEast = true;
    ballDirection = "southEast";
    changeDirection(ballSpeed);
    return;
  }
}

function changeDirection(ballSpeed) {
  if (southWest) {
    southEast = false;
    southWest = false;
    xDirection = -ballSpeed;
    yDirection = ballSpeed;
  } else if (northWest) {
    southEast = false;
    northWest = false;
    xDirection = -ballSpeed;
    yDirection = -ballSpeed;
  } else if (northEast) {
    southEast = false;
    northEast = false;
    xDirection = ballSpeed;
    yDirection = -ballSpeed;
  } else if (southEast) {
    southEast = false;
    xDirection = ballSpeed;
    yDirection = ballSpeed;
  }
}

function movePlayerHandle(e) {
  let pageWidth = pageWrap.offsetWidth - playerHandle.offsetWidth;
  let playerHandleMiddlePoint = playerHandle.offsetWidth / 2;

  let playerXPos;
  if (Capacitor.getPlatform() === "web") {
    playerXPos = e.pageX;
    // playerXPos = e.touches[0].pageX - playerHandleMiddlePoint;
  } else if (Capacitor.getPlatform() === "android") {
    playerXPos = e.touches[0].pageX - playerHandleMiddlePoint;
  }

  if (playerXPos <= pageWidth && playerXPos > 0) {
    playerHandle.style.left = playerXPos + "px";
  }
}
