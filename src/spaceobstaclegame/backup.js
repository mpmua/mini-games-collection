let pageWrap = document.getElementById("page-wrap");
let player = document.getElementById('player');
let playerImg = document.querySelector(".player-img");

let playerScore = 0;
let playerScoreElem = document.createElement("div");
playerScoreElem.setAttribute("class", "score");
playerScoreElem.innerText = playerScore;
pageWrap.appendChild(playerScoreElem);

const leaderboardWrap = document.getElementById("leaderboard-wrap");
const gameOverWrapper = document.querySelector(".game-over-wrapper");
const submitScoreText = document.querySelector(".submit-score-text");
const scoreSubmitButton = document.querySelector(".score-submit-button");
let initialsInputElem = document.querySelector(".initials-input");

var scoreListElem = document.getElementById('scores-table');
var maxCharText = document.querySelector(".max-char-text");
  
var scoreListLi = document.createElement('li');
 
// Create start button
var startButton = document.createElement("button");
startButton.setAttribute("class", "start-button");
startButton.innerText = "Start";

// --------------------FIREBASE----------------------

var userScoresList;
var scoreListLi
var loadLeaderboardAgain;
var scoresArray = [];

// This array sorts the 'scoresArray' in order from highest to lowest scores
var finalScoresArray;

function loadLeaderboard() {

// This array stores the name+scores from firebase initially

var loadingText = document.querySelector(".loading-text");
  
  userScoresList = firebase.database().ref("scores");

  userScoresList.on('value', function gotData(userScoresList) {

  var scores = userScoresList.val();
  var keys = Object.keys(scores);

    for (let i = 0; i < keys.length; i++) {

      var key = keys[i];
      var name = scores[key].name;
      var score = scores[key].score;

    scoresArray.push({
          
          name: name,
          score: score
          
      });

      if (i==keys.length-1) {
        
        loadLeaderboardAgain();
        // console.log("i==keys.length-1")
        
      }
  
       
  }
  
  
  
  }, function errorData() {
  
  // console.log("errorData function triggered");
  
  });

  loadLeaderboardAgain = function() {
      
      loadingText.style.display = "none";
      
      finalScoresArray = scoresArray.sort((a, b) => (a.score < b.score) ? 1 : -1);
      
 for (let v = 0; v < scoresArray.length; v++) {
   
    if (v == 10) {

      scoreListElem.appendChild(startButton);    
      return;

}

var newGame = true;

scoreListLi = document.createElement('li');
scoreListLi.setAttribute("class", "score-list-li");
scoreListElem.appendChild(scoreListLi);

scoreListLi.innerHTML +=
`<div> ${v+1}${"."}</div>` + 
`<div>${scoresArray[v].name}</div>` + 
`<div>${scoresArray[v].score}</div>`;

}

// console.log(finalScoresArray)

  };
  
    
}

loadLeaderboard();

  // --------------END OF FIREBASE----------------
  
  startButton.addEventListener("click", startGame);
  
  var scoreCountInterval;
  var moveObstaclesInterval;
  var playerDropInterval;
  
var obstacleSpeedVar;
obstacleSpeedVar = 0.5;

function increaseSpeed() {

//  playerImg.style.transform = `rotate(${defaultRotatePos}deg)`;
//  console.log(defaultRotatePos)

}

var playerTop;
setInterval(() => {
  playerTop = (player.getBoundingClientRect().top / window.innerHeight) * 100;
}, 10);

player.y = 50;
player.style.top = player.y + "%";

var defaultRotatePos = 1;
let disablePlayerDrop;

let jumping = false;

function playerDrop() {
 
      if (defaultRotatePos < 40 && gameOver == true) {

//         defaultRotatePos+=0.2;
        // playerImg.style.transform = `rotate(${defaultRotatePos}deg)`;
    
      }
      
    if (jumping == false)  {
         
       player.style.top = (playerTop+0.4) + "%";
    
    } 

}

let jumpCount;

function jump() {
  


  jumping = true;
  jumpCount = 0;
  
  var jumpInterval = setInterval( () => {
    
    

    if (jumpCount < 25) {

      player.style.top = (playerTop-0.70) + "%";

    }
    
    else if (jumpCount > 30) {

      clearInterval(jumpInterval);
      jumping = false;
      jumpCount = 0;

    }

    jumpCount++;
    
  

  }, 1)

}
  
var obstacle;
var bottomObstacle;

let randomHeightFunc = function() {
  
  return Math.floor(Math.random() * 32) + 5;
  
}

let obstacleVerticalCloseness = function() {
  
  return Math.floor(Math.random() * 10) + 5;
  
}

var randNumber;
let obstacleSpacing = 55;
function createObstacles() {
  
  for (let o = 3; o < 6; o++) {
    
    randNumber = obstacleVerticalCloseness();
    obstacle = document.createElement("div");
    obstacle.setAttribute("class", "obstacle");
    pageWrap.appendChild(obstacle);
    obstacle.x = o*obstacleSpacing;
    obstacle.style.left = obstacle.x + "%";
    obstacle.style.top = -randNumber + "%";

    let obstacleImg = document.createElement("img");
    obstacle.appendChild(obstacleImg);
    obstacleImg.src = "img/satellite.png";
    
    obstacle = document.createElement("div");
    obstacle.setAttribute("class", "obstacle");
    pageWrap.appendChild(obstacle);
    obstacle.x = o*obstacleSpacing;
    obstacle.style.left = obstacle.x + "%";
    obstacle.style.bottom = randNumber + "%";

    obstacleImg = document.createElement("img");
    obstacle.appendChild(obstacleImg);
    obstacleImg.src = "img/satellite.png";

    
  }
  
}

createObstacles();

function startGame() {
  
  playerScore = 0;
  gameOver = false;
  createObstacles();
  clearInterval(playerDropInterval);

  var allObstacles = document.querySelectorAll(".obstacle");
  allObstacles.forEach(function(item) {
       
       item.style.display = "none";
       item.x += 120;
      
    })
    
  setTimeout(function() {
    
  moveObstaclesInterval = setInterval(moveObstacles, 10);
    
    setTimeout(function() {
      
      allObstacles.forEach(function(item) {
       
       item.style.display = "block"
    //   item.x += 120;
      
    })
      
    }, 100);
  
  document.addEventListener("touchstart", jump);
  scoreListElem.style.visibility = "hidden";
  gameOverWrapper.style.visibility = "hidden";
  initialsInputElem.style.visibility = "hidden";
  maxCharText.style.visibility = "hidden";
  scoreSubmitButton.style.visibility = "hidden";
  scoreCountInterval = setInterval(increaseSpeed, 10);
  playerDropInterval = setInterval(playerDrop, 10);
  initialsInputElem.value = null;
  
  }, 1);  
    
   playerScoreElem.innerText = playerScore;
   player.y = 40;  
   player.style.top = player.y + "%";
    
  
}

let obstacleSpeed = 1;
let allObstacles = document.querySelectorAll(".obstacle");
var randNumber2;

function generateRandNum() {
  
  randNumber2 = randomHeightFunc();

} 

setInterval(generateRandNum, 500);

/*setInterval( () => {
  
    let playerPos = player.getBoundingClientRect();
    let obstaclePos = obstacle.getBoundingClientRect();
    
    if (playerPos.bottom-2 > obstaclePos.top || playerPos.top-2 < obstaclePos.bottom || playerPos.right-2 > obstaclePos.left || playerPos.left+2 < obstaclePos.right || playerPos.bottom > pageWrap.getBoundingClientRect().bottom - 20) {
      
      // console.log("collision")
      document.removeEventListener("touchstart", jump);
      
      gameOverFunc();
      
    }
}, 1)*/

let randomHeightFunc2 = function() {
  
  return Math.floor(Math.random() * 1) + 10;
  
}

function moveObstacles() {
  
  allObstacles.forEach( (item) => {
  
  let playerPos = player.getBoundingClientRect();
  let obstaclePos = item.getBoundingClientRect();
  
    if (collisionDetection(playerPos, obstaclePos) || playerPos.top < 0 || playerPos.bottom > pageWrap.getBoundingClientRect().bottom - 20) {
      
      // console.log("collision")
      gameOver = true;
    //  player.style.backgroundColor = "blue";
      player.style.top = playerPos.top;
      document.removeEventListener("touchstart", jump);
      
      gameOverFunc();
      
    }
    
    if (item.getBoundingClientRect().left == player.getBoundingClientRect().left ) {
      
      Math.floor(playerScore+=1);
      playerScoreElem.innerText = (playerScore/2);
    //  playerScoreElem.innerText = (playerScore+=1);
      console.log("playerScore " + playerScore)
      
    }
    
    if (item.x < -20 && item.getBoundingClientRect().top > 50) {
    
      item.x = obstacleSpacing * 2.5;
      item.style.left = item.x + "%";
      item.style.bottom = randNumber2 + "%";
      // console.log("randNumber2 in 1 is " + randNumber2);
      
    } else if (item.x < -20 && item.getBoundingClientRect().top < 50) {
      
       item.x = obstacleSpacing * 2.5;
       item.style.top = -randNumber2 + "%";
      //  console.log("randNumber2 in 2 is " + randNumber2);
      
    }
  
    item.x -= obstacleSpeedVar;
    item.style.left = item.x + "%";
    
   /* let yo = 0;
    
    if (yo == 0) {
      
       item.style.top -= (1 + "%");
      
    } else if (yo == 5) {
      
       item.style.top += randomHeightFunc2();
      
    } else if (yo == 10) {
      
      yo = 0;
      
    }*/
    
   
  
});

};



function collisionDetection(playerPos, obstaclePos) {
  
  return !(playerPos.bottom-2 < obstaclePos.top || playerPos.top-2 > obstaclePos.bottom || playerPos.right-2 < obstaclePos.left || playerPos.left+2 > obstaclePos.right);
  
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

// Create high score element

var highScoreElem = document.createElement("div");
pageWrap.appendChild(highScoreElem);
highScoreElem.setAttribute("class", "high-score");

highScoreCheckInitial();

function displayHighScore() {

  latestHighScore = localStorage.getItem("score");

    if (latestHighScore > previousHighScore) {

      highScore = latestHighScore;

    }

}

// localStorage.setItem("score", 0);
var previousHighScore;
var gameOver = false;

function gameOverFunc() {
  
  gameOver = true;
  console.log("game over");
  scoreListElem.removeChild(startButton);
  scoreListElem.insertBefore(startButton, scoreListElem.childNodes[0]);
//  startButton.innerHTML = `<i class="fas fa-undo-alt"></i>`;
  startButton.innerHTML = `<img class="restart-icon" src="img/restart-icon.png"/>`;
  startButton.style.backgroundColor = "transparent";
  document.querySelector(".score-list-li:nth-child(4)").style.backgroundColor = "#e2c210";
  document.querySelector(".score-list-li:nth-child(5)").style.backgroundColor = "silver";
  document.querySelector(".score-list-li:nth-child(6)").style.backgroundColor = "#CD7F32";
  newGame = false;
  gameOver = true;
  leaderboardWrap.style.top = "60%";
  clearInterval(moveObstaclesInterval);
//  clearInterval(playerDropInterval);
  clearInterval(scoreCountInterval);
  startButton.removeEventListener("click", startGame);
  submitScoreText.innerHTML = `Submit Score?`;
  gameOverWrapper.style.visibility = "visible";
  scoreListElem.style.visibility = "visible";
  initialsInputElem.style.visibility = "visible";
  maxCharText.style.visibility = "visible";
  scoreSubmitButton.style.visibility = "visible";
  scoreListElem.style.borderTopLeftRadius = "0";
  scoreListElem.style.borderTopRightRadius = "0";
//  startButton.innerText = "Restart";
  startButton.addEventListener("click", startGame);
  previousHighScore = localStorage.getItem("score");
  
   if (playerScore > previousHighScore) {
      
    // localStorage.setItem("score", 0);
     localStorage.setItem("score", playerScore/2);
    //  console.log(localStorage.getItem("score", playerScore))
   
   }

   displayHighScore();
   highScoreCheckInitial();
   
   playerScore = 0;

}

//  }

// --------------FIREBASE-------------------


var userScore;

scoreSubmitButton.addEventListener("click", submitScore);

function submitScore() {

  playerScore-=1;
  
  let allLeaderboardLi = document.querySelectorAll(".score-list-li");
  
  if (initialsInputElem.value.length == 3) {
    
    allLeaderboardLi.forEach(function(item) {
    
      scoreListElem.removeChild(item);

  })
  
 /* for (let g = 0; g < scoresArray.length; g++) {
    
    scoresArray.splice(g);
    
  }*/
  
  for (let y = 0; y < scoresArray.length; y++) {
  
  scoresArray.splice(y)
  // console.log(scoresArray[y])
  
}

  
  userScore = {
    
    name: initialsInputElem.value.toUpperCase(),
    score: playerScore

  }

userScoresList.push(userScore);

scoreSubmitButton.style.visibility = "hidden";
initialsInputElem.style.visibility = "hidden";
maxCharText.style.visibility = "hidden";
submitScoreText.innerHTML = "Score Submitted!";
// console.log("name: " + userScore.name + "score " + userScore.score);
// console.log("Leaderboard: " + userScoresList);


//loadLeaderboard();

// console.log(scoresArray);


  }
  
  
}

// --------------END FIREBASE-------------------


  