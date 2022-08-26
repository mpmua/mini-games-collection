  const gameWrap = document.getElementById("game-wrap");
  const character = document.querySelector(".character-image");
  const skyElem = document.querySelector(".sky");
  const score = document.querySelector(".score");
  const sandElem = document.querySelector(".sand");
  const roadElement = document.querySelector(".road");
  const gameOverWrapper = document.querySelector(".game-over-wrapper");
  const allDivs = document.getElementsByTagName("div");
  const allSections = document.getElementsByTagName("section");
  const allImgages = document.getElementsByTagName("img");
  const initialsInputElem = document.querySelector(".initials-input");
  const scoreSubmitButton = document.querySelector(".score-submit-button");
  const submitScoreText = document.querySelector(".submit-score-text");
  const gameIntroText = document.querySelector(".game-intro-text");


// --------------------FIREBASE----------------------

// var userScoresList;
// var scoreListLi;
// var loadLeaderboardAgain;
// var scoresArray = [];

// function loadLeaderboard() {

// // This array stores the name+scores from firebase initially

// // This array sorts the 'scoresArray' in order from highest to lowest scores
// var finalScoresArray;
// var loadingText = document.querySelector(".loading-text");  
  
//   userScoresList = firebase.database().ref("Ice Cream Run/scores");

//   userScoresList.on('value', function gotData(userScoresList) {

//   var scores = userScoresList.val();
//   var keys = Object.keys(scores);
//   var keysLength = keys.length;

//     for (let i = 0; i < keys.length; i++) {

//       var k = keys[i];
//       var name = scores[k].name;
//       var score = scores[k].score;

//     scoresArray.push({
          
//           name: name,
//           score: score
          
//       });


//       finalScoresArray = scoresArray.sort((a, b) => (a.score < b.score) ? 1 : -1);
      
//       if (i==keys.length-1) {
        
//         loadLeaderboardAgain();
        
//       }
  
       
//   }
  
//   }, function errorData() {
  
//   console.log("errorData function triggered");
  
//   });
  
//   console.log(scoresArray);


//   loadLeaderboardAgain = function() {
      
//       loadingText.style.display = "none";
      

//     for (let v = 0; v < 10; v++) {

// scoreListLi = document.createElement('li');
// scoreListLi.setAttribute("class", "score-list-li");
// scoreListElem.appendChild(scoreListLi);

// scoreListLi.innerHTML +=
// `<div> ${v+1}${"."}</div>` + 
// `<div>${finalScoresArray[v].name}</div>` + 
// `<div>${finalScoresArray[v].score}</div>`;

// if (v == 9) {

//   scoreListElem.appendChild(startButton);

// }

// }

//   };
  
// }

// loadLeaderboard();

  // --------------END OF FIREBASE----------------



 var scoreListElem = document.getElementById('scores-table');

 var scoreListLi = document.createElement('li');
 var maxCharText = document.querySelector(".max-char-text");
 var touchAnywhereText = document.querySelector(".touch-anywhere-text");
 var roadLine;

 // Create Start Button
 var startButton = document.createElement("button");
 startButton.setAttribute("class", "start-button");
 scoreListElem.appendChild(startButton);
 startButton.innerText = "Start";
 startButton.addEventListener("click", startGame);

// Sets the speeds so that the below are already running before user hits the start button
let roadLineSpeed = 0.7;
let cactusSpeed = 0.5;
let cloudSpeed = 0.1;

// Increases speed of various objects as per below when the user score reaches certain milestones
function increaseSpeed() {
  
  if (scoreCounter == 1000 || scoreCounter == 2000 || scoreCounter == 3000 || scoreCounter == 4000) {
    
    obstacleSpeed += 0.1;
    roadLineSpeed += 0.1;
    cactusSpeed += 0.2;
    cloudSpeed += 0.2;
    
    
  }

}

setInterval(increaseSpeed, 10)

 function createClouds() {
   
   for (b = 2; b < 6; b++) {
   
   let cloudWrapper = document.createElement("div");
   cloudWrapper.setAttribute("class", "cloud");
   skyElem.appendChild(cloudWrapper);
   
   let cloudImg = document.createElement("img");
   cloudImg.setAttribute("class", "cloud-img");
   cloudImg.src = "img/cloud.png";
   cloudWrapper.appendChild(cloudImg);

   // This positions out the clouds
   cloudWrapper.x = b*30;
   cloudWrapper.y = Math.floor(Math.random() * 30) + 20;
   cloudWrapper.style.left = cloudWrapper.x + "%";
   cloudWrapper.style.top = cloudWrapper.y + "%";
   
 }
 
}

createClouds();

let allClouds = document.querySelectorAll(".cloud");
 
function moveClouds() {

  allClouds.forEach(function(item) {
 
    if (item.x < -15) {

      item.x = 120;
      item.y = Math.floor(Math.random() * 30) + 20;
      item.style.top = item.y + "%";

    }

    item.x -= cloudSpeed;
    item.style.left = item.x + "%";
    
  })
  
}; 
 
 function createRoadLines() {
    
  for (let l = 0; l < 15; l++) {
    
    roadLine = document.createElement("div");
    roadLine.setAttribute("class", "road-lines");
    document.querySelector(".road").appendChild(roadLine);
    roadLine.y = (l*10);
    roadLine.style.left = roadLine.y + "%";
    
  }

  
        }
      
createRoadLines();

let allRoadLines = document.querySelectorAll(".road-lines");

function moveRoadLines()  {
  
allRoadLines.forEach( (item) => {

  // Pushes the line back
  if (item.y < -20) {
    
    item.y = 100;
    
  }
  
  // This modifies the item.y position so the line moves towards the left
  item.y -= roadLineSpeed;
  item.style.left = item.y + "%";

});

};

function createCactuses() {
  
  for (c = 0; c < 4; c++) {
  
      // CREATE CACTUSES
      let cactus = document.createElement("div");
      cactus.setAttribute("class", "cactus");
      sandElem.appendChild(cactus);

      let cactusImg = document.createElement("img");
      cactusImg.setAttribute("class", "cactus-img");
      cactusImg.src = "img/cactus.png";
      cactus.appendChild(cactusImg);
      
      // THIS WILL SEPERATE THE CACTUSES BY GIVING THEM DIFFERENT POSITIONS
      cactus.y =  c * (Math.floor(Math.random() * 20) + 5);
      cactus.x = (c*30); 
      cactus.style.left = cactus.x + "%";
      cactus.style.top = cactus.y + "%";

      }

};

createCactuses();

let allCactuses = document.querySelectorAll(".cactus");

function moveCactuses() {
  
  allCactuses.forEach(function(item) {
    
    // Pushes the cactus back so it can be brought back onto the screen
    if (item.x < -5) {

      item.x = 120;
      item.y =  c * (Math.floor(Math.random() * 13) + 5);
      item.style.top = item.y + "%";

    }

    // Modifies the item.x value so the cactus moves from right to left
    item.x -= cactusSpeed;
    item.style.left = item.x + "%";
    
  })
  
};

// The below two arrays store the enemy object images, the functions are used to pick a random image
var planeArray = ["img/yellow-plane.png", "img/red-plane.png"];

var carArray = ["img/mini-cooper.png", "img/swat-van.png"];

function pickRandCar() {
  
  return carArray[Math.floor(Math.random() * carArray.length)];
  
}

function pickRandPlane() {
  
  return planeArray[Math.floor(Math.random() * planeArray.length)];
  
}

function generateRandObstacles(obstacleWrapper, obstacleImg) {
  
   let randNumber1 = Math.floor(Math.random() * 4);  
  
  if (randNumber1 !== 3) {
    
    obstacleWrapper.y = 10;
    obstacleWrapper.style.height = "120%";
    obstacleWrapper.style.width = "10%";
    obstacleImg.src = pickRandCar();
  
    
    } else if (randNumber1 == 3) {
      
      obstacleWrapper.y = 190;
      obstacleWrapper.style.height = "60%";
      obstacleWrapper.style.width = "11%";  
      obstacleImg.src = pickRandPlane();
      ;
      
    }
       
    obstacleWrapper.style.left = obstacleWrapper.x + "%";
    obstacleWrapper.style.bottom = obstacleWrapper.y + "%";

  
}

var obstacleWrapper;
var obstacleImg;
  
function createObstacles() {
  
  for (let o = 4; o < 6; o++) {
    
    obstacleWrapper = document.createElement("div");
    obstacleWrapper.setAttribute("class", "obstacle-wrapper");
    // obstacleWrapper is part of the DOM, hence it is an object, .x can be used here to add a value which can be used later (as it is below in the moveobstacles)
    obstacleWrapper.x = o*90;
    
    obstacleImg = document.createElement("img");
    obstacleImg.setAttribute("class", "obstacle-img");
    obstacleImg.x = o*90;
    
    generateRandObstacles(obstacleWrapper, obstacleImg);
    obstacleWrapper.appendChild(obstacleImg);
    roadElement.appendChild(obstacleWrapper);
    
  }
  
}

 createObstacles();
 
 var allObstacles;

 function moveObstacles() {
   
   allObstacles = document.querySelectorAll(".obstacle-wrapper");
   
   allObstacles.forEach(function(item) {
     
    let playerPos = character.getBoundingClientRect();
    let itemPos = item.getBoundingClientRect();

    // Collision detection
    if (itemPos.left < playerPos.right-2 && playerPos.bottom-2 > itemPos.top
       && itemPos.right > playerPos.left+2 && itemPos.bottom > playerPos.top -2) {
         
         gameOver = true;
         
    for (image of allImgages) {
    
      image.style.animationPlayState = "paused";
      
      console.log("animation paused");
    
  }
 
      gameOverFunc();
  
     }
     
     // Checks if obstacle has gone off screen, item.x here is the same as obstacleWrapper.x as item refers to obstacleWrapper
    if (item.x < -40) {
      
      item.x = 140;
      let obstacleImg = item.querySelector("img");
      generateRandObstacles(item, obstacleImg);

    }
    
    // Respawns obstacle offscreen on the right if above if statement is false
    item.x -= obstacleSpeed;
    item.style.left = item.x + "%";
  
  })
   
};

var moveObstaclesInterval;
var increaseScoreInterval;
 
var gameOver = false;

function restartGame() {

  gameOver = false;
  scoreCounter = 0;
  character.classList.remove("animate-jump");
  // maxCharText.style.visibility = "hidden";
  gameOverWrapper.style.visibility = "hidden";
  character.style.animationPlayState = "running";

  allObstacles.forEach(function(item) {

       roadElement.removeChild(item);
  
  });

  createObstacles();
  runStartupFunctions();
  startGame();


}

function startGame() {

  document.body.ontouchstart = playerJump;

  obstacleSpeed = 1.2;
 
 if (gameOver == false) {
   
  moveObstaclesInterval = setInterval(moveObstacles, 10);
  increaseScoreInterval = setInterval(increaseScore, 10);

  }
  
 scoreListElem.style.visibility = "hidden";  
//  scoreSubmitButton.style.visibility = "hidden";
//  initialsInputElem.style.visibility = "hidden";
//  initialsInputElem.value = null;
//  scoreSubmitButton.addEventListener("click", submitScore);

}

function playerJump() {

  document.body.ontouchstart = null;
  
  console.log("playerJump executed");
  
  
  
  if (gameOver == false) {

      if (character.classList != "animate-jump") {
        
        character.classList.add("animate-jump");
        
        }
        
      
}

if (gameOver == false) {
  
        setTimeout(function() {
          
          if (gameOver == true) { 
    
            return;
    
           }
  
  character.classList.remove("animate-jump");
  document.body.ontouchstart = playerJump;
  
}, 500);

}


}

// setTimeout(function() {

//   if (gameOver == false) {
          
//    character.classList.remove("animate-jump");

//   }
  
//   document.body.ontouchstart = playerJump;
//   console.log("playerJump removed");
  
// }, 500);


// }

// --------------FIREBASE-------------------

// var userScore

// function submitScore() {

//   let allLeaderboardLi = document.querySelectorAll(".score-list-li");
  
//   if (initialsInputElem.value.length == 3) {
    
//     allLeaderboardLi.forEach(function(item) {
    
//       scoreListElem.removeChild(item);
//       console.log("childRemoved");
    
//   })
  
//   console.log(scoresArray);
  
//   for (let g = 0; g < scoresArray.length; g++) {
    
//     scoresArray.splice(g);
    
//   }
  
//   userScore = {
    
//     name: initialsInputElem.value.toUpperCase(),
//     score: scoreCounter

//   }

// userScoresList.push(userScore);

// maxCharText.style.visibility = "hidden";
// scoreSubmitButton.style.visibility = "hidden";
// initialsInputElem.style.visibility = "hidden";
// submitScoreText.innerHTML = "Score Submitted!";

//   }
  
  
// }

// -------------------END FIREBASE--------------------



var scoreCounter = 0;
var highScore;  
var latestHighScore;

function increaseScore() {

  currentScoreElem.innerText = `Score ${scoreCounter++}`;

}

function highScoreCheckInitial() {

 latestHighScore = localStorage.getItem("ice-cream-game-score");

if (latestHighScore > 0) {

  console.log("highScore > 0")
  highScoreElem.innerText = `High Score ${latestHighScore}`; 

} else {

  highScoreElem.innerText = `High Score `; 

}

}

// Create score and high score elements

var currentScoreElem = document.createElement("div");
score.appendChild(currentScoreElem);

var highScoreElem = document.createElement("div");
score.appendChild(highScoreElem);

currentScoreElem.innerText = `Score 0`;

highScoreCheckInitial();

function displayHighScore() {

  latestHighScore = localStorage.getItem("ice-cream-game-score");

    if (latestHighScore > previousHighScore) {

      highScore = latestHighScore;

    }

}

var previousHighScore;

var gameOverFunc = function() {
   
  gameIntroText.style.display = "none";
  scoreListElem.removeChild(startButton);
  scoreListElem.insertBefore(startButton, scoreListElem.childNodes[0]);
  startButton.style.backgroundColor = "yellow";
//  startButton.innerHTML = `<i class="fas fa-undo-alt"></i>`;
  // BELOW HAS BEEN COMMENTED OUT TO REMOVE LEADERBOARD
  // document.querySelector(".score-list-li:nth-child(4)").style.backgroundColor = "#e2c210";
  // document.querySelector(".score-list-li:nth-child(5)").style.backgroundColor = "silver";
  // document.querySelector(".score-list-li:nth-child(6)").style.backgroundColor = "#CD7F32";
   clearInterval(moveCloudsInterval);
   clearInterval(moveRoadLinesInterval);
   clearInterval(moveCactusesInterval);
   clearInterval(moveObstaclesInterval);
   clearInterval(increaseScoreInterval);
   roadLineSpeed = 0.7;
   cactusSpeed = 0.5;
   cloudSpeed = 0.1;
   startButton.innerText = "Restart";
   startButton.addEventListener("click", restartGame);
  //  submitScoreText.innerHTML = `Submit Score?`;
   
   gameOverWrapper.style.visibility = "visible";
   // BELOW HAS BEEN COMMENTED OUT TO REMOVE LEADERBOARD
  //  scoreSubmitButton.style.visibility = "visible";
  //  initialsInputElem.style.visibility = "visible";
  //  maxCharText.style.visibility = "visible";
  //  scoreListElem.style.borderTopLeftRadius = "0";
  //  scoreListElem.style.borderTopRightRadius = "0";
   scoreListElem.style.visibility = "visible";
   previousHighScore = localStorage.getItem("ice-cream-game-score");

   if (scoreCounter > previousHighScore) {

     localStorage.setItem("ice-cream-game-score", scoreCounter-1);
   
   }

   displayHighScore();
   highScoreCheckInitial();

 }
 
var moveCloudsInterval;
var moveRoadLinesInterval;
var moveCactusesInterval;

function runStartupFunctions() {
  
  if (gameOver == false) {
  
  moveCloudsInterval = setInterval(moveClouds, 10);
  moveRoadLinesInterval = setInterval(moveRoadLines, 10);
  moveCactusesInterval = setInterval(moveCactuses, 10);
  
  }
  
}

runStartupFunctions();
