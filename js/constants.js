const initialGameSummary = {
  // Settings can be changed
  // Players
  playerBulletSpeed: 500,
  moveSpeed: 300,
  playerBulletCD: 0.5,
  playerImage: "img/player1.png",
  playerBulletImg: "img/bulletplayer1.png",

  // Players special bullets
  playerSpecCD: 2,
  playerSpecBulletSpd: 200,
  playerSpecCD2: 0,

  // Enemy
  enemyHorPad: 80, // horizontal padding to the left and right side
  enemyPerRow: 8, // How many enemies per row
  enemyVerPad: 100, // Top vertical padding
  enemyVerSpace: 300, // between each row spacing of enemy
  numEnemyrow: 2, //number of enemies per row
  enemyHitsToDestroy: 1, // number of hits to destroy
  maxEnemyCD: 10, // max cooldown of enemy shooting
  minEnemyCD: 0.5, // min cooldown of enemy shooting
  enemyBulletSpeed: 400, // Speed of enemy bullet
  enemyImage: "img/enemy1.png",
  enemyBulletImg: "img/bulletenemy1.png",

  // Enemy speed
  enemyHorSpd: 1000, // lower the faster of horizontal speed
  enemyVerSpd: 1000, // lower the faster of vertical speed

  enemyHorAngle: 50, // horizontal movement
  enemyVerAngle: 10, // vertical movement

  // Dont change
  playerXPos: 0,
  playerYPos: 0,
  playerBullets: [],
  playerCD: 0,
  recordedTime: Date.now(),
  enemy: [],
  enemyBullets: [],

  playerSpecBullet: [],
  playerSpecBullet2: [],
  playerSpecBulletImg: "img/bulletplayer2.png",

  // Players special bullets second set

  playerSpecBullet3: [],
  playerSpecBullet4: [],
  playerSpecBulletImg2: "img/bulletplayer4.png",

  // PLayer Special bullets third set
  playerSpecBullet5: [],
  playerSpecBullet6: [],
  playerSpecBulletImg3: "img/bulletplayer5.png",
  playerSize: 0.07,
  playerBulletSize: 0.04,
  enemySize: 0.07,
  enemyBulletSize: 0.03,
};
