import { Capacitor } from "@capacitor/core";

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

// // Game Start And Game Over Screen
function displayGameStartScreen() {
  gameStartText.innerHTML = "Keep the ball in play";

  startBtn.addEventListener("click", () => {
    if (Capacitor.getPlatform() === "web") {
      document.addEventListener("mousemove", movePlayerHandle, {
        passive: false,
      });
    } else if (Capacitor.getPlatform() === "android") {
      document.addEventListener("touchmove", movePlayerHandle, {
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
  enemyHandle.style.left = ballXPos - 40 + "px";
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

  if (
    userScore == 1000 ||
    userScore == 2000 ||
    userScore == 3000 ||
    userScore == 4000 ||
    userScore == 5000 ||
    userScore == 6000 ||
    userScore == 7000 ||
    userScore == 8000 ||
    userScore == 9000 ||
    userScore == 10000
  ) {
    if (ballDirection == "southWest") {
      ballSpeed += 0.5;
      xDirection = -ballSpeed;
      yDirection = ballSpeed;
    } else if (ballDirection == "northWest") {
      ballSpeed += 0.5;
      xDirection = -ballSpeed;
      yDirection = -ballSpeed;
    } else if (ballDirection == "northEast") {
      ballSpeed += 0.5;

      xDirection = ballSpeed;
      yDirection = -ballSpeed;
    } else if (ballDirection == "southEast") {
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
      pageWrap.getBoundingClientRect().right &&
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
      pageWrap.getBoundingClientRect().right &&
    xDirection == ballSpeed &&
    yDirection == -ballSpeed
  ) {
    northWest = true;
    ballDirection = "northWest";

    changeDirection(ballSpeed);
    return;
  }

  if (
    ballCurrentPosition[0] <= pageWrap.getBoundingClientRect().left &&
    xDirection == -ballSpeed &&
    yDirection == -ballSpeed
  ) {
    northEast = true;
    ballDirection = "northEast";
    changeDirection(ballSpeed);
    return;
  }

  if (
    ballCurrentPosition[0] <= pageWrap.getBoundingClientRect().left &&
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
  // console.log("changeDirection")

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
var testing;
console.log(pageWrap.offsetWidth);
function movePlayerHandle(e) {
  // let testing = pageWrap.offsetWidth - playerHandle.offsetWidth;
  testing = document.body.offsetWidth - playerHandle.offsetWidth;

  let playerXPos;
  if (Capacitor.getPlatform() === "web") {
    playerXPos = e.pageX;
  } else if (Capacitor.getPlatform() === "android") {
    playerXPos = e.touches[0].pageX;
  }

  // if (playerXPos < testing && playerXPos > 0) {

  if (
    playerHandle.getBoundingClientRect().right <
      pageWrap.getBoundingClientRect().right &&
    playerXPos > 0
  ) {
    console.log(playerXPos);
    playerHandle.style.left = playerXPos + "px";
  }

  // if (
  //   playerHandle.getBoundingClientRect().right >
  //   pageWrap.getBoundingClientRect().right
  // ) {
  //   testing = true;

  //   console.log("EXCEEDED");
  // }
  // // if (testing) {
  // //   let position = e.pageX;
  // //   playerHandle.style.right = position + "px";
  // //   console.log(e.pageX);
  // // }
  // e.preventDefault();
  // e.stopPropagation();
  // let playerHandleAdjustment = playerHandle.offsetWidth / 2;
  // if (Capacitor.getPlatform() === "web") {
  //   playerHandle.style.left = e.pageX - playerHandleAdjustment + "px";
  // } else if (Capacitor.getPlatform() === "android") {
  //   playerHandle.style.left =
  //     e.touches[0].pageX - playerHandleAdjustment + "px";
  // }
}
