// default bullets

const playerShooting = (x, y, playerBulletImg) => {
  const bulletDomElement = document.createElement("img");

  // name of bulletDOmElement must be standardize with enemyShooting due to remove child and different name. Will cause error
  bulletDomElement.src = playerBulletImg;
  bulletDomElement.className = "playerBullets";
  bulletDomElement.width = gameDom.offsetWidth * gameSummary.playerBulletSize;

  allBulletsDom.appendChild(bulletDomElement);
  const bullets = { x, y, bulletDomElement };
  gameSummary.playerBullets.push(bullets);

  updatePosMap(bulletDomElement, x, y);
};

// Create player special left most bullet
const playerSpecShootingL = (x, y, playerBulletImg) => {
  const bulletDomElement = document.createElement("img");

  // name of bulletDOmElement must be standardize with enemyShooting due to remove child and different name. Will cause error
  bulletDomElement.src = playerBulletImg;
  bulletDomElement.className = "playerBullets";
  bulletDomElement.width = gameDom.offsetWidth * gameSummary.playerBulletSize;

  allBulletsDom.appendChild(bulletDomElement);
  const bullets = { x, y, bulletDomElement };
  gameSummary.playerSpecBullet.push(bullets);

  updatePosMap(bulletDomElement, x, y);
};

// Create player special 2nd left bullet
const playerSpecShootingL2 = (x, y, playerBulletImg) => {
  const bulletDomElement = document.createElement("img");

  // name of bulletDOmElement must be standardize with enemyShooting due to remove child and different name. Will cause error
  bulletDomElement.src = playerBulletImg;
  bulletDomElement.className = "playerBullets";
  bulletDomElement.width = gameDom.offsetWidth * gameSummary.playerBulletSize;

  allBulletsDom.appendChild(bulletDomElement);
  const bullets = { x, y, bulletDomElement };
  gameSummary.playerSpecBullet3.push(bullets);

  updatePosMap(bulletDomElement, x, y);
};

// Create player special 3rd left bullet
const playerSpecShootingL3 = (x, y, playerBulletImg) => {
  const bulletDomElement = document.createElement("img");

  // name of bulletDOmElement must be standardize with enemyShooting due to remove child and different name. Will cause error
  bulletDomElement.src = playerBulletImg;
  bulletDomElement.className = "playerBullets";
  bulletDomElement.width = gameDom.offsetWidth * gameSummary.playerBulletSize;

  allBulletsDom.appendChild(bulletDomElement);
  const bullets = { x, y, bulletDomElement };
  gameSummary.playerSpecBullet5.push(bullets);

  updatePosMap(bulletDomElement, x, y);
};

// Create player most right bullet
const playerSpecShootingR = (x, y, playerBulletImg) => {
  const bulletDomElement = document.createElement("img");
  // name of bulletDOmElement must be standardize with enemyShooting due to remove child and different name. Will cause error
  bulletDomElement.src = playerBulletImg;
  bulletDomElement.className = "playerBullets";
  bulletDomElement.width = gameDom.offsetWidth * gameSummary.playerBulletSize;

  allBulletsDom.appendChild(bulletDomElement);
  const bullets = { x, y, bulletDomElement };
  gameSummary.playerSpecBullet2.push(bullets);
  updatePosMap(bulletDomElement, x, y);
};

// Create player special 2nd right bullet
const playerSpecShootingR2 = (x, y, playerBulletImg) => {
  const bulletDomElement = document.createElement("img");
  // name of bulletDOmElement must be standardize with enemyShooting due to remove child and different name. Will cause error
  bulletDomElement.src = playerBulletImg;
  bulletDomElement.className = "playerBullets";
  bulletDomElement.width = gameDom.offsetWidth * gameSummary.playerBulletSize;

  allBulletsDom.appendChild(bulletDomElement);
  const bullets = { x, y, bulletDomElement };
  gameSummary.playerSpecBullet4.push(bullets);

  updatePosMap(bulletDomElement, x, y);
};

// Create player special 3rd right bullet
const playerSpecShootingR3 = (x, y, playerBulletImg) => {
  const bulletDomElement = document.createElement("img");
  // name of bulletDOmElement must be standardize with enemyShooting due to remove child and different name. Will cause error
  bulletDomElement.src = playerBulletImg;
  bulletDomElement.className = "playerBullets";
  bulletDomElement.width = gameDom.offsetWidth * gameSummary.playerBulletSize;

  allBulletsDom.appendChild(bulletDomElement);
  const bullets = { x, y, bulletDomElement };
  gameSummary.playerSpecBullet6.push(bullets);

  updatePosMap(bulletDomElement, x, y);
};
var child = document.getElementById("img");

// Player default shooting animation
const playerShootAnimation = (timeInter) => {
  const ammos = gameSummary.playerBullets;

  for (let i = 0; i < ammos.length; i++) {
    const ammo = ammos[i];

    ammo.y -= timeInter * gameSummary.playerBulletSpeed;

    // Delete ammo out of screen
    if (ammo.y < gameBorderYMin) {
      deleteAmmo(ammo);
    }

    updatePosMap(ammo.bulletDomElement, ammo.x, ammo.y);

    // GetBoundingClientRect to get rectangle properties to compare
    checkCollide(ammo);
  }

  gameSummary.playerBullets = gameSummary.playerBullets.filter(
    (e) => !e.outOfBound
  );

  // Go to next level
  if (gameSummary.enemy.length === 0) {
    // Clear all html as bullets will lag when transition to next stage
    allBulletsDom.innerHTML = "";
    changeLevel();
  }
};

// Player Spec shooting animation left most
const playerSpecAnimationL = (timeInter) => {
  const ammos = gameSummary.playerSpecBullet;

  for (let i = 0; i < ammos.length; i++) {
    const ammo = ammos[i];

    ammo.y -= timeInter * gameSummary.playerSpecBulletSpd;
    ammo.x -= 0.8 * timeInter * gameSummary.playerSpecBulletSpd;

    // Delete ammo out of screen
    if (ammo.y < gameBorderYMin) {
      deleteAmmo(ammo);
    }

    updatePosMap(ammo.bulletDomElement, ammo.x, ammo.y);

    // GetBoundingClientRect to get rectangle properties to compare
    checkCollide(ammo);
  }

  gameSummary.playerSpecBullet = gameSummary.playerSpecBullet.filter(
    (e) => !e.outOfBound
  );

  if (gameSummary.enemy.length === 0) {
    // Clear all html as bullets will lag when transition to next stage
    allBulletsDom.innerHTML = "";
    changeLevel();
  }
};

// Player Spec shooting animation 2nd left
const playerSpecAnimationL2 = (timeInter) => {
  const ammos = gameSummary.playerSpecBullet3;

  for (let i = 0; i < ammos.length; i++) {
    const ammo = ammos[i];

    ammo.y -= timeInter * gameSummary.playerSpecBulletSpd;
    ammo.x -= 0.5 * timeInter * gameSummary.playerSpecBulletSpd;

    // Delete ammo out of screen
    if (ammo.y < gameBorderYMin) {
      deleteAmmo(ammo);
    }

    updatePosMap(ammo.bulletDomElement, ammo.x, ammo.y);

    // GetBoundingClientRect to get rectangle properties to compare
    checkCollide(ammo);
  }

  gameSummary.playerSpecBullet3 = gameSummary.playerSpecBullet3.filter(
    (e) => !e.outOfBound
  );

  if (gameSummary.enemy.length === 0) {
    // Clear all html as bullets will lag when transition to next stage
    allBulletsDom.innerHTML = "";
    changeLevel();
  }
};

// Player Spec shooting animation 2nd left
const playerSpecAnimationL3 = (timeInter) => {
  const ammos = gameSummary.playerSpecBullet5;

  for (let i = 0; i < ammos.length; i++) {
    const ammo = ammos[i];

    ammo.y -= timeInter * gameSummary.playerSpecBulletSpd;
    ammo.x -= 0.2 * timeInter * gameSummary.playerSpecBulletSpd;

    // Delete ammo out of screen
    if (ammo.y < gameBorderYMin) {
      deleteAmmo(ammo);
    }

    updatePosMap(ammo.bulletDomElement, ammo.x, ammo.y);

    // GetBoundingClientRect to get rectangle properties to compare
    checkCollide(ammo);
  }

  gameSummary.playerSpecBullet5 = gameSummary.playerSpecBullet5.filter(
    (e) => !e.outOfBound
  );

  if (gameSummary.enemy.length === 0) {
    // Clear all html as bullets will lag when transition to next stage
    allBulletsDom.innerHTML = "";
    changeLevel();
  }
};

// Player Spec shooting animation right most
const playerSpecAnimationR = (timeInter) => {
  const ammos = gameSummary.playerSpecBullet2;

  for (let i = 0; i < ammos.length; i++) {
    const ammo = ammos[i];

    ammo.y -= timeInter * gameSummary.playerSpecBulletSpd;
    ammo.x += 0.8 * timeInter * gameSummary.playerSpecBulletSpd;

    // Delete ammo out of screen
    if (ammo.y < gameBorderYMin) {
      deleteAmmo(ammo);
    }

    updatePosMap(ammo.bulletDomElement, ammo.x, ammo.y);

    // GetBoundingClientRect to get rectangle properties to compare
    checkCollide(ammo);
  }

  gameSummary.playerSpecBullet2 = gameSummary.playerSpecBullet2.filter(
    (e) => !e.outOfBound
  );

  if (gameSummary.enemy.length === 0) {
    // Clear all html as bullets will lag when transition to next stage
    allBulletsDom.innerHTML = "";
    changeLevel();
  }
};

// Player Spec shooting animation 2nd right
const playerSpecAnimationR2 = (timeInter) => {
  const ammos = gameSummary.playerSpecBullet4;

  for (let i = 0; i < ammos.length; i++) {
    const ammo = ammos[i];

    ammo.y -= timeInter * gameSummary.playerSpecBulletSpd;
    ammo.x += 0.5 * timeInter * gameSummary.playerSpecBulletSpd;

    // Delete ammo out of screen
    if (ammo.y < gameBorderYMin) {
      deleteAmmo(ammo);
    }

    updatePosMap(ammo.bulletDomElement, ammo.x, ammo.y);

    // GetBoundingClientRect to get rectangle properties to compare
    checkCollide(ammo);
  }

  gameSummary.playerSpecBullet4 = gameSummary.playerSpecBullet4.filter(
    (e) => !e.outOfBound
  );

  if (gameSummary.enemy.length === 0) {
    // Clear all html as bullets will lag when transition to next stage
    allBulletsDom.innerHTML = "";
    changeLevel();
  }
};

const playerSpecAnimationR3 = (timeInter) => {
  const ammos = gameSummary.playerSpecBullet6;

  for (let i = 0; i < ammos.length; i++) {
    const ammo = ammos[i];

    ammo.y -= timeInter * gameSummary.playerSpecBulletSpd;
    ammo.x += 0.2 * timeInter * gameSummary.playerSpecBulletSpd;

    // Delete ammo out of screen
    if (ammo.y < gameBorderYMin) {
      deleteAmmo(ammo);
    }

    updatePosMap(ammo.bulletDomElement, ammo.x, ammo.y);

    // GetBoundingClientRect to get rectangle properties to compare
    checkCollide(ammo);
  }

  gameSummary.playerSpecBullet6 = gameSummary.playerSpecBullet6.filter(
    (e) => !e.outOfBound
  );

  if (gameSummary.enemy.length === 0) {
    deleteAmmo(ammos);
    changeLevel();
  }
};

const bulletsCooldown = (timeInter) => {
  // For bullets cooldown
  if (movement.spaceMove && gameSummary.playerCD <= 0) {
    playerShooting(
      gameSummary.playerXPos,
      gameSummary.playerYPos,
      gameSummary.playerBulletImg
    );
    gameSummary.playerCD = gameSummary.playerBulletCD;
  }
  if (gameSummary.playerCD > 0) {
    gameSummary.playerCD -= timeInter;
  }
  // For special bullets cooldown outermost
  if (movement.xMove && gameSummary.playerSpecCD2 <= 0) {
    playerSpecShootingL(
      gameSummary.playerXPos,
      gameSummary.playerYPos,
      gameSummary.playerSpecBulletImg
    );
    playerSpecShootingR(
      gameSummary.playerXPos,
      gameSummary.playerYPos,
      gameSummary.playerSpecBulletImg
    );
    playerSpecShootingL2(
      gameSummary.playerXPos,
      gameSummary.playerYPos,
      gameSummary.playerSpecBulletImg2
    );
    playerSpecShootingR2(
      gameSummary.playerXPos,
      gameSummary.playerYPos,
      gameSummary.playerSpecBulletImg2
    );
    playerSpecShootingL3(
      gameSummary.playerXPos,
      gameSummary.playerYPos,
      gameSummary.playerSpecBulletImg3
    );
    playerSpecShootingR3(
      gameSummary.playerXPos,
      gameSummary.playerYPos,
      gameSummary.playerSpecBulletImg3
    );
    gameSummary.playerSpecCD2 = gameSummary.playerSpecCD;
  }
  if (gameSummary.playerSpecCD2 > 0) {
    gameSummary.playerSpecCD2 -= timeInter;
  }

  // For special bullets 2nd outer
};
