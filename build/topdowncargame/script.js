const allDivs = document.getElementsByTagName("div");
const allSections = document.getElementsByTagName("section");
const allImgages = document.getElementsByTagName("img");
const playerElem = document.querySelector(".player");
const objectsWrapper = document.querySelector(".objects-wrapper");
const gameWrapElem = document.querySelector("#game-wrap");
const initialsInputElem = document.querySelector(".initials-input");
const gameOverWrapper = document.querySelector(".game-over-wrapper");
const submitScoreText = document.querySelector(".submit-score-text");
const scoreSubmitButton = document.querySelector(".score-submit-button");
const gameIntroText = document.querySelector(".game-intro-text");

var randomNumber;
var randomObstacle;
var randomObstaclePos;
var randomObstacleY;

var amountOfEnemyCars;
var enemyCarSpeed;
var roadLinesSpeed;

// --------------------FIREBASE----------------------

// var userScoresList;
// var scoreListLi
// var loadLeaderboardAgain;
// var scoresArray = [];

// // This array sorts the 'scoresArray' in order from highest to lowest scores
// var finalScoresArray;

// function loadLeaderboard() {

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
//         console.log("i==keys.length-1")
        
//       }
  
       
//   }
  
  
  
//   }, function errorData() {
  
//   console.log("errorData function triggered");
  
//   });

//   finalScoresArray = scoresArray.sort((a, b) => (a.score < b.score) ? 1 : -1);

  
  
//    console.log(scoresArray);


//   loadLeaderboardAgain = function() {
      
//       loadingText.style.display = "none";
      
//       finalScoresArray = scoresArray.sort((a, b) => (a.score < b.score) ? 1 : -1);
      
//  for (let v = 0; v < scoresArray.length; v++) {
   
//     if (v == 10) {

//        scoreListElem.appendChild(startButton);
//        return;

// }

// scoreListLi = document.createElement('li');
// scoreListLi.setAttribute("class", "score-list-li");
// scoreListElem.appendChild(scoreListLi);

// scoreListLi.innerHTML +=
// `<div> ${v+1}${"."}</div>` + 
// `<div>${finalScoresArray[v].name}</div>` + 
// `<div>${finalScoresArray[v].score}</div>`;

// }

// console.log(finalScoresArray)

//   };
  
    
// }

// loadLeaderboard();
  // --------------END OF FIREBASE----------------

      

 var scoreListElem = document.getElementById('scores-table');
 var maxCharText = document.querySelector(".max-char-text");
 var scoreListLi = document.createElement('li');

 var roadLine;

 var startButton = document.createElement("button");
 startButton.setAttribute("class", "start-button");
 scoreListElem.appendChild(startButton);
 startButton.innerText = "Start";


var gameOver = false;
var restartGame = false;

startButton.addEventListener("click", function() {

   let allRandomObstacles = document.querySelectorAll(".random-objects");
   allRandomObstacles.forEach(function(item) {
    
    item.y -= 140;
    item.style.left = (Math.floor(Math.random() * randomObstacleWidthMinusGameWidth)) + "px";

    amountOfEnemyCars = 1;
    enemyCarSpeed = 0.4;
    roadLinesSpeed = 0.6;
    player.score = 0;
  
  clearInterval(runStartupFunctionsInterval);
  clearInterval(runFunctionsInterval);
  runStartupFunctionsInterval = setInterval(runStartupFunctions, 10);

  // BELOW HAS BEEN COMMENTED OUT TO REMOVE LEADERBOARD
    // maxCharText.style.visibility = "hidden";
    // initialsInputElem.style.visibility = "hidden";
    // scoreSubmitButton.style.visibility = "hidden";
    // initialsInputElem.value = null;
    scoreListElem.style.visibility = "hidden";  
    gameOverWrapper.style.visibility = "hidden";
    
    gameOver = false;
    document.addEventListener("touchmove", movePlayerCar);
    
  });

  runFunctionsInterval = setInterval(runFunctions, 10)
  
  
});
  
var runFunctionsInterval;

var player = {speed: 5, score: 0};

function collisionDetection(player, obstacle) {

    playerRect = player.getBoundingClientRect();
    obstacleRect = obstacle.getBoundingClientRect();
    
    return !(playerRect.bottom < obstacleRect.top || playerRect.top > obstacleRect.bottom || playerRect.right < obstacleRect.left || playerRect.left > obstacleRect.right);
    
}

// FUNCTION TO MOVE PLAYER HORIONTALLY
function movePlayerCar(e) {

    let testing = gameWrapElem.offsetWidth - playerElem.offsetWidth;
    let playerXPos = e.touches[0].pageX;
    
    if (playerXPos < testing && playerXPos > 0) {
  
          playerElem.style.left = playerXPos + "px";
          // let playerCarAdjustment = playerElem.offsetWidth / 2;
          // playerElem.style.left = (e.touches[0].pageX - playerCarAdjustment) + "px";

    }
    
    
    
    
}

function generateRoadLines() {

  for (let l = 0; l < 8; l++) {
    
      var roadLine = document.createElement("div");
      roadLine.setAttribute("class", "road-line");
      roadLine.style.left = "30%";
      roadLine.y = (l * 14);
      roadLine.style.top =+ roadLine.y + "%";
      gameWrapElem.appendChild(roadLine);
      
      roadLine = document.createElement("div");
      roadLine.setAttribute("class", "road-line");
      roadLine.style.left = "70%";
      roadLine.y = (l * 14);
      roadLine.style.top =+ roadLine.y + "%";
      gameWrapElem.appendChild(roadLine);
  
}

}

generateRoadLines();
  
  var allRoadLines = document.querySelectorAll(".road-line");
  var roadLinesSpeed = 0.6;

function moveRoadLines() {

  allRoadLines.forEach(function(line) {
    
    if (line.y > 100) {
      
      line.y -= 100;
      
      
    }
    
      line.style.top = line.y + "%";
      line.y += roadLinesSpeed;
      
    
  });
  
}

function generateObstacles() {

    let gameWrapElemWidth = gameWrapElem.getBoundingClientRect().width;

    for (a = 0; a < 5; a++) {
       
       // CREATE OBSTACLES
       randomObstacle = document.createElement('div');
       randomObstacle.setAttribute("class", "random-objects");
       gameWrapElem.appendChild(randomObstacle);
      
       var randomCarImg = document.createElement('img');
       randomCarImg.setAttribute("class", "random-car-img")
       randomCarImg.src = generateRandomCarImg();
       randomObstacle.appendChild(randomCarImg);

       // CALCULATIONS TO ENSURE OBSTACLES DONT GO PAST WIDTH OF GAME SCREEN 
       randomObstacleWidthMinusGameWidth = gameWrapElem.offsetWidth - randomObstacle.offsetWidth;
       randomObstaclePos = Math.floor(Math.random() * randomObstacleWidthMinusGameWidth);
       randomObstacle.style.left = randomObstaclePos + "px";
       
       // THIS WILL SEPERATE THE OBSTACLES BY GIVING THEM DIFFERENT HEIGHTS
  
       randomObstacle.y = a*30 - 140;
       randomObstacle.style.top = randomObstacle.y + "%";

    }

    
}

var imagesArray = ["img/truck.png", "img/ambulance.png",
 "img/mini-truck.png", "img/mini-van.png", "img/taxi.png"];

function generateRandomCarImg() {
  
  return imagesArray[Math.floor(Math.random() * imagesArray.length)];
  
}

generateObstacles();

var allRandomObstacles;

// MOVE OBSTACLES
function moveObstacles() {

  allRandomObstacles = document.querySelectorAll(".random-objects");
  
    allRandomObstacles.forEach(function(item) {

      if (collisionDetection(playerElem, item)) {
        
        gameOverFunc();
        console.log("collision")
        
      }
        
        if (item.y >= 100) {
            
            item.y -= 150;
            item.style.left = (Math.floor(Math.random() * randomObstacleWidthMinusGameWidth)) + "px";
 
        }
       
       item.style.top = item.y + "%";
       item.y += enemyCarSpeed;
       
    
    })

}    

function runFunctions () {
    
 if (gameOver == false) {

  moveObstacles();
  scoreCounter.innerText = `Score: ${player.score++}`;

 }
  
  }
  
function highScoreCheckInitial() {

console.log(localStorage.getItem("top-down-game-score"))

 latestHighScore = localStorage.getItem("top-down-game-score");

if (latestHighScore > 0) {

  console.log("highScore > 0")
  highScoreElem.innerText = `High Score ${latestHighScore}`; 

} else {

  highScoreElem.innerText = `High Score `; 

}

}

// Create score and high score elements

/*var currentScoreElem = document.createElement("div");
scoreCounter.appendChild(currentScoreElem);*/

var scoreCounter = document.createElement("div");
scoreCounter.setAttribute("class", "score-counter");
gameWrapElem.appendChild(scoreCounter);
scoreCounter.innerText = `Score: 0`;

var highScoreElem = document.createElement("div");
highScoreElem.setAttribute("class", "score-counter");
gameWrapElem.appendChild(highScoreElem);

highScoreCheckInitial();

function displayHighScore() {

  latestHighScore = localStorage.getItem("top-down-game-score");

    if (latestHighScore > previousHighScore) {

      highScore = latestHighScore;

    }

}

var previousHighScore;
  

document.addEventListener("touchmove", movePlayerCar);

var playerPos = playerElem.getBoundingClientRect();
var gameOver;


function gameOverFunc() {
  
  gameIntroText.style.display = "none";
   scoreListElem.removeChild(startButton);
  scoreListElem.insertBefore(startButton, scoreListElem.childNodes[0]);
//  startButton.innerHTML = `<i class="fas fa-undo-alt"></i>`;
  startButton.style.backgroundColor = "yellow";
  startButton.innerHTML = "Restart";
  // BELOW HAS BEEN COMMENTED OUT TO REMOVE LEADERBOARD
  // document.querySelector(".score-list-li:nth-child(4)").style.backgroundColor = "#e2c210";
  // document.querySelector(".score-list-li:nth-child(5)").style.backgroundColor = "silver";
  // document.querySelector(".score-list-li:nth-child(6)").style.backgroundColor = "#CD7F32";    
   gameOver = true;
  
   gameOverWrapper.style.visibility = "visible";
   scoreListElem.style.visibility = "visible";
   // BELOW HAS BEEN COMMENTED OUT TO REMOVE LEADERBOARD
  //  maxCharText.style.visibility = "visible";
  //  submitScoreText.innerHTML = `Submit Score?`;
  //  initialsInputElem.style.visibility = "visible";
  //  scoreSubmitButton.style.visibility = "visible";
  //  scoreListElem.style.borderTopLeftRadius = "0";
  //  scoreListElem.style.borderTopRightRadius = "0";
   clearInterval(runStartupFunctionsInterval);
   amountOfEnemyCars = 1;
   enemyCarSpeed = 0.4;
   roadLinesSpeed = 0.6;
   document.removeEventListener("touchmove", movePlayerCar);
 //  startButton.innerHTML = "Restart";
   
   previousHighScore = localStorage.getItem("top-down-game-score");

   if (player.score > previousHighScore) {

     localStorage.setItem("top-down-game-score", player.score);
     console.log(localStorage.getItem("top-down-game-score"))
   
   }

   displayHighScore();
   highScoreCheckInitial();
 
}

// --------------FIREBASE-------------------


// var userScore;

// scoreSubmitButton.addEventListener("click", submitScore);

// function submitScore() {
  
//   player.score -= 1;
  
//   let allLeaderboardLi = document.querySelectorAll(".score-list-li");
  
//   if (initialsInputElem.value.length == 3) {
    
//     allLeaderboardLi.forEach(function(item) {
    
//       scoreListElem.removeChild(item);
//       console.log("childRemoved");
    
//   })

//   for (let y = 0; y < scoresArray.length; y++) {
  
//     scoresArray.splice(y)
//     console.log("removed")
    
//   }

//   userScore = {
    
//     name: initialsInputElem.value.toUpperCase(),
//     score: player.score

//   }

// userScoresList.push(userScore);

// maxCharText.style.visibility = "hidden";
// scoreSubmitButton.style.visibility = "hidden";
// initialsInputElem.style.visibility = "hidden";
// submitScoreText.innerHTML = "Score Submitted!";

// console.log(scoresArray);


//   }
  
  
// }



// -------------------END FIREBASE--------------------
  
function runStartupFunctions() {
  
  if (gameOver == false) {
  
  moveRoadLines();
  
  if (player.score == 500 || player.score == 1000 || player.score == 1500 || player.score == 2000 ||
     player.score == 2500 || player.score == 3000 || player.score == 3500 || player.score == 4000 || player.score == 4500) {
    
    enemyCarSpeed += 0.1;
    roadLinesSpeed += 0.1;
    
  };
  
  }
  
}

var runStartupFunctionsInterval = setInterval(runStartupFunctions, 10);