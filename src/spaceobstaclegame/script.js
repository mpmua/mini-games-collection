import { Capacitor } from "@capacitor/core";
import satelliteImg from "./img/satellite.png";
import rocketImg from "./img/rocket.png";
import spaceImg from "./img/space-background.jpg";

const pageWrap = document.getElementById("page-wrap");
const currentScoreElem = document.querySelector(".score");
const highScoreElem = document.querySelector(".high-score");
const player = document.getElementById("player");
const playerImg = document.querySelector(".player-img");

playerImg.src = rocketImg;
pageWrap.style.backgroundImage = `url(${spaceImg})`;

let playerScore;
// let playerScoreElem = document.createElement("div");
// playerScoreElem.setAttribute("class", "score");
// playerScoreElem.innerText = playerScore;
// pageWrap.appendChild(playerScoreElem);

const leaderboardWrap = document.getElementById("leaderboard-wrap");
const gameIntroText = document.querySelector(".game-intro-text");
const gameOverWrapper = document.querySelector(".game-over-wrapper");
const submitScoreText = document.querySelector(".submit-score-text");
const scoreSubmitButton = document.querySelector(".score-submit-button");
const initialsInputElem = document.querySelector(".initials-input");

const scoreListElem = document.getElementById("scores-table");
const maxCharText = document.querySelector(".max-char-text");

const scoreListLi = document.createElement("li");

// Create start button
const startButton = document.createElement("button");
startButton.setAttribute("class", "start-button");
startButton.innerText = "Start";

// --------------------FIREBASE----------------------

// var userScoresList;
// var scoreListLi
// var loadLeaderboardAgain;
// var scoresArray = [];

// // This array sorts the 'scoresArray' in order from highest to lowest scores
// var finalScoresArray;

// function loadLeaderboard() {

// // This array stores the name+scores from firebase initially

// var loadingText = document.querySelector(".loading-text");

//   userScoresList = firebase.database().ref("scores");

//   userScoresList.on('value', function gotData(userScoresList) {

//   var scores = userScoresList.val();
//   var keys = Object.keys(scores);

//     for (let i = 0; i < keys.length; i++) {

//       var key = keys[i];
//       var name = scores[key].name;
//       var score = scores[key].score;

//     scoresArray.push({

//           name: name,
//           score: score

//       });

//       if (i==keys.length-1) {

//         loadLeaderboardAgain();
//         // console.log("i==keys.length-1")

//       }

//   }

//   }, function errorData() {

//   // console.log("errorData function triggered");

//   });

//   loadLeaderboardAgain = function() {

//       loadingText.style.display = "none";

//       finalScoresArray = scoresArray.sort((a, b) => (a.score < b.score) ? 1 : -1);

//  for (let v = 0; v < scoresArray.length; v++) {

//     if (v == 10) {

//       scoreListElem.appendChild(startButton);
//       return;

// }

// var newGame = true;

// scoreListLi = document.createElement('li');
// scoreListLi.setAttribute("class", "score-list-li");
// scoreListElem.appendChild(scoreListLi);

// scoreListLi.innerHTML +=
// `<div> ${v+1}${"."}</div>` +
// `<div>${scoresArray[v].name}</div>` +
// `<div>${scoresArray[v].score}</div>`;

// }

// // console.log(finalScoresArray)

//   };

// }

// loadLeaderboard();

// --------------END OF FIREBASE----------------

// Create high score element and live score counter

let scoreCount = 0;

scoreListElem.appendChild(startButton);

startButton.addEventListener("click", startGame);

var scoreCountInterval;
var moveObstaclesInterval;
var playerDropInterval;

var obstacleSpeedVar;
obstacleSpeedVar = 0.6;

function increaseSpeed() {
  playerImg.style.transform = `rotate(${defaultRotatePos}deg)`;
}

player.y = 30;
player.style.top = player.y + "%";

var defaultRotatePos = 1;
let disablePlayerDrop;

let jumping = false;
let playerJumpDistance = 0.02;
let playerDropDistance = 0.3;

let playerTop;

function playerDrop() {
  if (defaultRotatePos < 90 && gameOver == true) {
    defaultRotatePos += 0.6;
    playerImg.style.transform = `rotate(${defaultRotatePos}deg)`;
  }

  if (jumping == false) {
    //    playerDropDistance += 0.5;

    playerTop = (player.getBoundingClientRect().top / window.innerHeight) * 100;
    player.style.top = playerTop + 0.3 + "%";
    //   player.style.top = playerDropDistance + "%";
  } else {
  }
}

let jumpCount;

function jump() {
  if (gameOver == false) {
    playerDropDistance = 0.02;

    jumping = true;
    jumpCount = 0;

    var jumpInterval = setInterval(() => {
      playerTop =
        (player.getBoundingClientRect().top / window.innerHeight) * 100;

      if (jumpCount < 25) {
        //   clearInterval(playerDrop);

        player.style.top = playerTop - 0.3 + "%";

        //   playerJumpDistance += 0.015;
        //     player.style.top = (playerTop-playerJumpDistance) + "%";
      } else if (jumpCount > 30) {
        clearInterval(jumpInterval);
        jumping = false;
        jumpCount = 0;
        playerJumpDistance = 0.03;
      }

      jumpCount++;
    }, 1);
  }
}

var obstacle;
var bottomObstacle;

/*let randomHeightFunc = function() {
  
  return Math.floor(Math.random() * 28) + 5;
  
}*/

let obstacleVerticalCloseness = function () {
  return Math.floor(Math.random() * 10) + 5;
  // return Math.floor(Math.random() * 1) + 3;
};

var randNumber;
var obstacleSpacing = 60;
function createObstacles() {
  for (let o = 3; o < 6; o++) {
    randNumber = obstacleVerticalCloseness();
    obstacle = document.createElement("div");
    obstacle.setAttribute("class", "obstacle");
    pageWrap.appendChild(obstacle);
    obstacle.x = o * obstacleSpacing;
    obstacle.style.left = obstacle.x + "%";
    obstacle.style.top = -randNumber + "%";

    let obstacleImg = document.createElement("img");
    obstacle.appendChild(obstacleImg);
    obstacleImg.src = satelliteImg;

    obstacle = document.createElement("div");
    obstacle.setAttribute("class", "obstacle");
    pageWrap.appendChild(obstacle);
    obstacle.x = o * obstacleSpacing;
    obstacle.style.left = obstacle.x + "%";
    obstacle.style.bottom = randNumber + "%";

    obstacleImg = document.createElement("img");
    obstacle.appendChild(obstacleImg);
    obstacleImg.src = satelliteImg;
  }
}

createObstacles();

function startGame() {
  defaultRotatePos = 1;
  playerScore = 0;
  scoreCount = 0;
  gameOver = false;
  createObstacles();

  clearInterval(playerDropInterval);

  var allObstacles = document.querySelectorAll(".obstacle");
  allObstacles.forEach(function (item) {
    item.style.display = "none";
    item.x += 120;
  });

  setTimeout(function () {
    moveObstaclesInterval = setInterval(moveObstacles, 10);

    setTimeout(function () {
      allObstacles.forEach(function (item) {
        item.style.display = "block";
        //   item.x += 120;
      });
    }, 100);
    if (Capacitor.getPlatform() === "web") {
      document.addEventListener("click", jump);
    } else if (Capacitor.getPlatform() === "android") {
      document.addEventListener("touchstart", jump);
    }

    scoreListElem.style.visibility = "hidden";
    gameOverWrapper.style.visibility = "hidden";
    // BELOW HAS BEEN COMMENTED OUT TO REMOVE LEADERBOARD
    // initialsInputElem.style.visibility = "hidden";
    // maxCharText.style.visibility = "hidden";
    // scoreSubmitButton.style.visibility = "hidden";
    // initialsInputElem.value = null;
    scoreCountInterval = setInterval(increaseSpeed, 10);
    playerDropInterval = setInterval(playerDrop, 10);
  }, 1);

  //  playerScoreElem.innerText = playerScore;
  player.y = 40;
  player.style.top = player.y + "%";
}

let obstacleSpeed = 0.5;
let allObstacles = document.querySelectorAll(".obstacle");
var randomHeightVar;

function moveObstacles() {
  if (
    playerScore == 5 ||
    playerScore == 10 ||
    playerScore == 15 ||
    playerScore == 20
  ) {
    //   obstacleSpeedVar += 0.1
    //   obstacleSpacing -= 1;
  }

  randomHeightVar = Math.floor(Math.random() * 28) + 1;

  allObstacles.forEach((item) => {
    let playerPos = player.getBoundingClientRect();
    let obstaclePos = item.getBoundingClientRect();

    scoreCount += 1;

    currentScoreElem.innerHTML = "Score " + scoreCount;

    if (
      collisionDetection(playerPos, obstaclePos) ||
      playerPos.top < 0 ||
      playerPos.bottom > pageWrap.getBoundingClientRect().bottom - 20
    ) {
      gameOver = true;
      player.style.top = playerPos.top;
      document.removeEventListener("touchstart", jump);

      gameOverFunc();
    }

    // if (item.getBoundingClientRect().right === player.getBoundingClientRect().right) {
    if (
      player.getBoundingClientRect().right ===
      item.getBoundingClientRect().right
    ) {
      // playerScore+=1;
      // playerScoreElem.innerText = playerScore;
      // playerScoreElem.innerText = (playerScore/2);
    }

    if (item.x < -20 && item.getBoundingClientRect().top > 50) {
      item.x = obstacleSpacing * 2.6;
      item.style.left = item.x + "%";
      item.style.bottom = randomHeightVar + "%";
    } else if (item.x < -20 && item.getBoundingClientRect().top < 50) {
      item.x = obstacleSpacing * 2.6;
      item.style.left = item.x + "%";
      item.style.top = -randomHeightVar + "%";
    }

    item.x -= obstacleSpeedVar;
    item.style.left = item.x + "%";
  });
}

function collisionDetection(playerPos, obstaclePos) {
  return !(
    playerPos.bottom - 2 < obstaclePos.top ||
    playerPos.top - 2 > obstaclePos.bottom ||
    playerPos.right - 2 < obstaclePos.left ||
    playerPos.left + 2 > obstaclePos.right
  );
}

// var scoreCounter = 0;
var highScore;
var latestHighScore;

// function increaseScore() {

//   currentScoreElem.innerText = `Score ${scoreCounter++}`;

// }

function highScoreCheckInitial() {
  latestHighScore = localStorage.getItem("score");

  if (latestHighScore > 0) {
    highScoreElem.innerText = `High Score ${latestHighScore}`;
  } else {
    highScoreElem.innerText = "";
  }
}

highScoreCheckInitial();

function displayHighScore() {
  latestHighScore = localStorage.getItem("score");

  if (latestHighScore > previousHighScore) {
    highScore = latestHighScore;
  }
}

// localStorage.setItem("score", 0);
let previousHighScore;
let gameOver = false;
let newGame = false;

function gameOverFunc() {
  gameOver = true;
  gameIntroText.style.display = "none";

  /*  scoreListElem.removeChild(startButton);
  scoreListElem.insertBefore(startButton, scoreListElem.childNodes[0]);*/
  //  startButton.innerHTML = `<i class="fas fa-undo-alt"></i>`;

  //  startButton.innerHTML = `<img class="restart-icon" src="img/restart-icon.png"/>`;
  startButton.innerHTML = "Restart";
  //  startButton.style.backgroundColor = "transparent";
  // BELOW COMMENTED OUT TO REMOVE LEADERBOARD
  // document.querySelector(".score-list-li:nth-child(4)").style.backgroundColor = "#e2c210";
  // document.querySelector(".score-list-li:nth-child(5)").style.backgroundColor = "silver";
  // document.querySelector(".score-list-li:nth-child(6)").style.backgroundColor = "#CD7F32";
  newGame = false;
  gameOver = true;
  leaderboardWrap.style.top = "60%";
  clearInterval(moveObstaclesInterval);
  //  clearInterval(playerDropInterval);
  clearInterval(scoreCountInterval);
  startButton.removeEventListener("click", startGame);

  gameOverWrapper.style.visibility = "visible";
  scoreListElem.style.visibility = "visible";
  // BELOW COMMENTED OUT TO REMOVE LEADERBOARD
  // submitScoreText.innerHTML = `Submit Score?`;
  // initialsInputElem.style.visibility = "visible";
  // maxCharText.style.visibility = "visible";
  // scoreSubmitButton.style.visibility = "visible";
  // scoreListElem.style.borderTopLeftRadius = "0";
  // scoreListElem.style.borderTopRightRadius = "0";
  //  startButton.innerText = "Restart";
  startButton.addEventListener("click", startGame);
  previousHighScore = localStorage.getItem("score");

  if (scoreCount > previousHighScore) {
    localStorage.setItem("score", 0);
    localStorage.setItem("score", scoreCount);
  }

  displayHighScore();
  highScoreCheckInitial();

  playerScore = 0;
}

//  }

// --------------FIREBASE-------------------

// var userScore;

// scoreSubmitButton.addEventListener("click", submitScore);

// function submitScore() {

//   playerScore-=1;

//   let allLeaderboardLi = document.querySelectorAll(".score-list-li");

//   if (initialsInputElem.value.length == 3) {

//     allLeaderboardLi.forEach(function(item) {

//       scoreListElem.removeChild(item);

//   })

//  /* for (let g = 0; g < scoresArray.length; g++) {

//     scoresArray.splice(g);

//   }*/

//   for (let y = 0; y < scoresArray.length; y++) {

//   scoresArray.splice(y)
//   // console.log(scoresArray[y])

// }

//   userScore = {

//     name: initialsInputElem.value.toUpperCase(),
//     score: playerScore

//   }

// userScoresList.push(userScore);

// scoreSubmitButton.style.visibility = "hidden";
// initialsInputElem.style.visibility = "hidden";
// maxCharText.style.visibility = "hidden";
// submitScoreText.innerHTML = "Score Submitted!";
// // console.log("name: " + userScore.name + "score " + userScore.score);
// // console.log("Leaderboard: " + userScoresList);

// //loadLeaderboard();

// // console.log(scoresArray);

//   }

// }

// --------------END FIREBASE-------------------
