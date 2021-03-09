// Dynamic display using window.innerHeight for width and height
// Idea scrapped due to inconsistency in speed at different screen
//const gameHeight = window.innerHeight * 0.9;
//const gameWidth = window.innerWidth * 0.9;

const lsHighScore = "spaceInvadersHighScore";

// Game standard size
const gameHeight = 1000;
const gameWidth = 1200;

// Empty as to form different stages
let gameSummary = {};

// Indicate start of level
let LEVEL = 1;
// milliseconds to show next stage
const levelDurIndicator = 2000;

// Variables to start
let player;
let gameBorderXMin, gameBorderXMax, gameBorderYMin, gameBorderYmax;
let animateFrames;
let SCORE, HIGH_SCORE, gameOver;

// Dom elements UI
const scoreHeader = document.getElementById("score");
const highScoreHeader = document.getElementById("highScore");
const levelIndicator = document.getElementById("levelIndicator");
const startGameButton = document.getElementById("startGameButton");
const startGameDom = document.getElementById("startScreen");
startGameDom.style.width = gameWidth + "px";
startGameDom.style.height = gameHeight + "px";

// millisecond on level shown

// Sound
const bulletAudio = new Audio("audio/laser.m4a");
bulletAudio.volume = 0.2;
const enemyHitAudio = new Audio("audio/enemyhit.m4a");
const gameOverAudio = new Audio("audio/gameover.m4a");
gameOverAudio.volume = 0.4;

// Dom element
const gameDom = document.querySelector("#Space");
const allBulletsDom = document.querySelector("#bulletsAll");

// To set the game height and width dynamically.
// Previously also used for window.innerheight and innerwidth
gameDom.style.width = gameWidth + "px";
gameDom.style.height = gameHeight + "px";

// Move to keys (Key code up=38 down 40 left 37 right 39 space 32)
const leftKeyCode = 37;
const rightKeyCode = 39;
const upKeyCode = 38;
const downKeyCode = 40;
const spaceKeyCode = 32;
const xKeyCode = 88;

// For keymovement
let movement = {
  leftMove: false,
  rightMove: false,
  upMove: false,
  downMove: false,
  spaceMove: false,
  xMove: false,
};

// Update the image on the screen
// CSS transform, movement on the screen
const updatePosMap = (ele, x, y) => {
  ele.style.transform = `translate(${x}px, ${y}px)`;
};

// Starting pos of player
const playerPos = () => {
  gameSummary.playerXPos = gameWidth / 2;
  gameSummary.playerYPos = gameHeight * 0.9;

  updatePosMap(player, gameSummary.playerXPos, gameSummary.playerYPos);
};

const setPlayerImage = () => {
  player = document.createElement("img");
  //console.log(gameSummary);
  player.src = gameSummary.playerImage;
  player.className = "player";
  player.width = gameDom.offsetWidth * gameSummary.playerSize;

  gameDom.appendChild(player);

  // Game dimension
  // Borders and padding
  gameBorderXMin = player.width;
  gameBorderXMax = gameWidth - player.width - 50;
  gameBorderYMin = 0;
  gameBorderYmax = gameHeight;
};

// To update gameSummary with levels  if not default
const initGameSummary = (levelObject) => {
  // levelObject must be spreaded after initialGameSummary as now the key value pairs
  // in level object will overwrite the key value pairs in initialGameSummary object.

  gameSummary = levelObject
    ? { ...initialGameSummary, ...levelObject }
    : initialGameSummary;
};

// Update scores and the highscores with storage
const updateScores = () => {
  if (SCORE > HIGH_SCORE) {
    HIGH_SCORE = SCORE;
    localStorage.setItem(lsHighScore, HIGH_SCORE);
  }

  highScoreHeader.innerText = `High Score: ${HIGH_SCORE}`;
  scoreHeader.innerText = `Score: ${SCORE}`;
};

// Level animation
const indicateLevel = () => {
  levelIndicator.innerText = `Level ${LEVEL}`;
  levelIndicator.style.display = "block";

  // Animation of next stage sentence
  levelIndicator.style.animation = `fadeInOut ${levelDurIndicator}ms linear`;

  setTimeout(() => {
    levelIndicator.style.display = "none";
    levelIndicator.style.animation = null;
  }, levelDurIndicator);
};

const changeLevel = () => {
  LEVEL += 1;
  //console.log(LEVEL);
  initGameSummary(levelObjects[LEVEL]);
  // can also add default values up after each stage level* values

  // Reset player image as tend to disappear somehow
  if (!player) {
    setPlayerImage();
  }

  player.src = gameSummary.playerImage;

  indicateLevel();
  playerPos();
  enemySpace();
};

// Vert and horizontal space of enemies
const enemySpace = () => {
  const spaceBetweenEnemy =
    (gameWidth - gameSummary.enemyHorPad * 2) / (gameSummary.enemyPerRow - 1);

  for (let i = 0; i < gameSummary.numEnemyrow; i++) {
    const y = gameSummary.enemyVerPad + i * gameSummary.enemyVerSpace;
    for (let j = 0; j < gameSummary.enemyPerRow; j++) {
      const x = j * spaceBetweenEnemy + gameSummary.enemyHorPad;
      enemySpawn(x, y, gameSummary.enemyImage);
    }
  }
};

// Enemy spawn
const enemySpawn = (x, y, enemyImage) => {
  const enemy = document.createElement("img");
  enemy.src = enemyImage;
  enemy.className = "enemy";
  enemy.width = gameDom.offsetWidth * gameSummary.enemySize;

  gameDom.appendChild(enemy);

  // new object for enemy position and data
  const enemyPos = {
    x,
    y,
    cooldown: randomTime(gameSummary.minEnemyCD, gameSummary.maxEnemyCD),
    enemy,
    lives: gameSummary.enemyHitsToDestroy - 1,
  };

  gameSummary.enemy.push(enemyPos);

  // Update the image on the screen
  updatePosMap(enemy, x, y);
};

// Random time for enemy shooting interval
const randomTime = (min, max) => {
  return Math.random() * (max - min) + min;
};

// Enemy animation
const enemyAnimation = (timeInter) => {
  // sin and cos formula for movement with relationship to time
  const dx =
    Math.sin(gameSummary.recordedTime / gameSummary.enemyHorSpd) *
    gameSummary.enemyHorAngle;

  const dy =
    Math.sin(gameSummary.recordedTime / gameSummary.enemyVerSpd) *
    gameSummary.enemyVerAngle;

  const enemy = gameSummary.enemy;

  // movement of enemy
  for (let i = 0; i < enemy.length; i++) {
    const enemyPos = enemy[i];

    const x = enemyPos.x + dx;
    const y = enemyPos.y + dy;

    /*
    if (enemyPos.x + enemyPos.width === gameWidth) {
      continue;
    }
    */
    updatePosMap(enemyPos.enemy, x, y);

    enemyPos.cooldown -= timeInter;

    // To produce enemy bullets to be release if below cooldown
    if (enemyPos.cooldown <= 0) {
      enemyShooting(x, y, gameSummary.enemyBulletImg);
      enemyPos.cooldown = gameSummary.maxEnemyCD;
    }
  }
  gameSummary.enemy = gameSummary.enemy.filter((e) => !e.outOfBound);
};

// Creating bullets from enemies
const enemyShooting = (x, y, enemyBulletImg) => {
  const bulletDomElement = document.createElement("img");
  bulletDomElement.src = enemyBulletImg;
  bulletDomElement.className = "enemyBullets";
  bulletDomElement.width = gameDom.offsetWidth * gameSummary.enemyBulletSize;

  gameDom.appendChild(bulletDomElement);

  const bullets = { x, y, bulletDomElement };

  // Store bullets coords
  gameSummary.enemyBullets.push(bullets);

  updatePosMap(bulletDomElement, x, y);
};

// Bullets animation
const enemyShootAnimation = (timeInter) => {
  const ammos = gameSummary.enemyBullets;

  for (let i = 0; i < ammos.length; i++) {
    const ammo = ammos[i];
    ammo.y += timeInter * gameSummary.enemyBulletSpeed;

    if (ammo.y > gameBorderYmax) {
      // console.log(ammo);
      deleteAmmo(ammo);
    }

    updatePosMap(ammo.bulletDomElement, ammo.x, ammo.y);

    // Hit collision. If hit will destroy
    // getBoundingClientRect convert to numbers
    const r1 = ammo.bulletDomElement.getBoundingClientRect();
    const r2 = player.getBoundingClientRect();

    if (rectsIntersect(r1, r2)) {
      gameOverAudio.play();

      deletePlayer();
      break;
    }
  }
  // Delete bullets pit pf screen
  gameSummary.enemyBullets = gameSummary.enemyBullets.filter(
    (e) => !e.outOfBound
  );
};

// Remove enemies once destroy
const deleteEnemy = (val) => {
  gameDom.removeChild(val.enemy);
  val.outOfBound = true;
};

const deleteAmmo = (val) => {
  val.bulletDomElement.remove();
  val.outOfBound = true;
};

/* /////ERRORRRR No idea why 
const deleteAmmo = val => {
	gameDom.removeChild(val.bulletDomElement);
	val.outOfBound = true;
};

// Guess is kill last enemy and enemy fires a bullet. Both are send to the gameDom. However when deleting, is slower and createNewLevel function is used which  reset gameSummary. Inside gameSummary, enemyBullets are empty and javascript cannot delete something that dont exist??? 
*/

// For pressing key
const keyDown = (key) => {
  //console.log(key);
  key.preventDefault();
  if (key.keyCode === leftKeyCode) {
    movement.leftMove = true;
  } else if (key.keyCode === rightKeyCode) {
    movement.rightMove = true;
  } else if (key.keyCode === upKeyCode) {
    movement.upMove = true;
  } else if (key.keyCode === downKeyCode) {
    movement.downMove = true;
  } else if (key.keyCode === spaceKeyCode) {
    movement.spaceMove = true;
    bulletAudio.play();
  } else if (key.keyCode === xKeyCode) {
    movement.xMove = true;
  }
};
// need to be used for key movement
const keyUp = (key) => {
  key.preventDefault();

  if (key.keyCode === leftKeyCode) {
    movement.leftMove = false;
  } else if (key.keyCode === rightKeyCode) {
    movement.rightMove = false;
  } else if (key.keyCode === upKeyCode) {
    movement.upMove = false;
  } else if (key.keyCode === downKeyCode) {
    movement.downMove = false;
  } else if (key.keyCode === spaceKeyCode) {
    movement.spaceMove = false;
  } else if (key.keyCode === xKeyCode) {
    movement.xMove = false;
  }
};

const boundaryMap = () => {
  const playerDom = document.querySelector(".player");

  // Set up boundary so not to go out of page
  // Teleport from left to right and right to left on x axis
  if (gameSummary.playerXPos < gameBorderXMin - gameBorderXMax * 0.02) {
    gameSummary.playerXPos = gameBorderXMax * 1.06;
    updatePosMap(playerDom, gameSummary.playerXPos, gameSummary.playerYPos);
  }
  if (gameSummary.playerXPos > gameBorderXMax * 1.07) {
    gameSummary.playerXPos = gameBorderXMin;
    updatePosMap(playerDom, gameSummary.playerXPos, gameSummary.playerYPos);
  }

  // Prevent from going out of map
  // This time is set boundary and not to teleport
  if (gameSummary.playerYPos > gameBorderYmax * 0.92) {
    gameSummary.playerYPos = gameBorderYmax * 0.92;
    updatePosMap(playerDom, gameSummary.playerXPos, gameSummary.playerYPos);
  }
  if (gameSummary.playerYPos < gameBorderYmax * 0.4) {
    gameSummary.playerYPos = gameBorderYmax * 0.4;
    updatePosMap(playerDom, gameSummary.playerXPos, gameSummary.playerYPos);
  }
};

// Player movement
// According to time to standardize of framerate movement
const playerAnimation = (timeInter) => {
  if (movement.leftMove) {
    gameSummary.playerXPos -= timeInter * gameSummary.moveSpeed;
  }
  if (movement.rightMove) {
    gameSummary.playerXPos += timeInter * gameSummary.moveSpeed;
  }
  if (movement.upMove) {
    gameSummary.playerYPos -= timeInter * gameSummary.moveSpeed;
  }
  if (movement.downMove) {
    gameSummary.playerYPos += timeInter * gameSummary.moveSpeed;
  }

  // Bullets cooldown
  bulletsCooldown(timeInter);
  const playerDom = document.querySelector(".player");
  // console.log(gameSummary.playerYPos);

  updatePosMap(playerDom, gameSummary.playerXPos, gameSummary.playerYPos);
};

// Hit testing formula for colli
const rectsIntersect = (r1, r2) => {
  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
};

// Collision testing
const checkCollide = (ammo) => {
  const r1 = ammo.bulletDomElement.getBoundingClientRect();
  const enemy = gameSummary.enemy;

  for (let i = 0; i < enemy.length; i++) {
    let enemyPos = enemy[i];
    if (enemyPos.outOfBound) continue;
    const r2 = enemyPos.enemy.getBoundingClientRect();

    if (rectsIntersect(r1, r2)) {
      // Hit enemy
      if (enemyPos.lives > 0) {
        enemyPos.lives -= 1;
        // when hit need to delete ammo
        deleteAmmo(ammo);
        enemyHitAudio.play(); // play enemy hit audio
        // enemyPos.enemy.style.backgroundColor = "red";
        break;
      } else {
        deleteEnemy(enemyPos);
        deleteAmmo(ammo);
        enemyHitAudio.play(); // play enemy hit audio

        // enemy died so update score
        SCORE += 10;

        updateScores();

        break;
      }
    }
  }
};

// Update the screen with delta time and to run all the animation
const screenUpdate = () => {
  const currentTime = Date.now();
  const timeInter = (currentTime - gameSummary.recordedTime) / 1000.0;

  // boundary
  boundaryMap();

  // Player animations
  playerAnimation(timeInter);
  playerShootAnimation(timeInter);
  playerSpecAnimationL(timeInter);
  playerSpecAnimationR(timeInter);
  playerSpecAnimationL2(timeInter);
  playerSpecAnimationR2(timeInter);
  playerSpecAnimationL3(timeInter);
  playerSpecAnimationR3(timeInter);
  // Enemy animations
  enemyAnimation(timeInter);
  enemyShootAnimation(timeInter);
  // console.log("x pos", gameSummary.playerXPos);
  //console.log("y pos", gameSummary.playerYPos);

  // Use for delta time
  gameSummary.recordedTime = currentTime;

  animateFrames = undefined;

  animate();
};

// When player dies
const deletePlayer = () => {
  gameOver = true;

  startGameButton.removeEventListener("click", startNewGame);
  startGameButton.addEventListener("click", () => {
    window.location.reload();
  });

  gameDom.style.display = "none";
  startGameDom.style.display = "flex";
  const theDiv = startGameDom.querySelector("div");
  startGameButton.innerText = "Play Again";

  theDiv.innerHTML = `
        <h1>Game Over </h1>
        <h2>Your Score: ${SCORE}</h2>
        <h2>Your High Score: ${HIGH_SCORE}</h2>
    `;
};

// To control gameover function
const animate = () => {
  if (!animateFrames && !gameOver) {
    animateFrames = window.requestAnimationFrame(screenUpdate);
  }
};

// Trigger new game
const startNewGame = () => {
  window.addEventListener("keydown", keyDown);
  window.addEventListener("keyup", keyUp);

  // Store highscore
  HIGH_SCORE = localStorage.getItem(lsHighScore)
    ? localStorage.getItem(lsHighScore)
    : 0;

  SCORE = 0;
  LEVEL = 0;

  gameOver = false;

  changeLevel();
  updateScores();
  screenUpdate();
};

startGameButton.addEventListener("click", () => {
  startGameDom.style.display = "none";
  gameDom.style.display = "block";
  startNewGame();
});
