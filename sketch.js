var spaceShip, spaceShipBrake, spaceShipUp, spaceShipDown, spaceShipForward, spaceShipIdle, spaceShipShot;
var bg, bgImg;
var shotGunEnemy, shotGunEnemyImg, homingGunEnemy, homingGunEnemyImg, laserEnemy, laserEnemyImg; 
var laserEnemyGroup, homingGunEnemyGroup, shotGunEnemyGroup;
var spaceShipShotGroup, homingGunShotGroup, laserShotGroup, shotgunShotGroup;
var spaceEnemy;
var score = 0;
var life = 3;
var gameState = 0;

function preload(){
  bgImg = loadImage("background.png");
  spaceShipBrake = loadImage("playerBrake.png");
  spaceShipUp = loadImage("playerUp.png");
  spaceShipDown = loadImage("playerDown.png");
  spaceShipForward = loadImage("playerForward.png");
  spaceShipIdle = loadImage("playerIdle.png");

  shotGunEnemyImg = loadImage("shotGunEnemy.png"); 
  homingGunEnemyImg = loadImage("homingGunEnemy.png");
  laserEnemyImg = loadImage("laserEnemy.png");

  laserEnemyShot = loadImage("guardGunShot4.png");
  shotGunEnemyShot = loadImage("shotGunShot2.png");
  homingGunEnemyShot = loadImage("homingGunShot3.png");
  spaceShipShot = loadImage("machineGunShot3.png");


}

function setup() {
  createCanvas(windowWidth,windowHeight);

  bg = createSprite(width/2,height/2);
  bg.addImage(bgImg);
  bg.scale = 1.4;
  bg.velocityX = -2;

  spaceShip = createSprite(80,windowHeight/2,50,50);
  spaceShip.addImage(spaceShipIdle);
  spaceShip.scale = 1.5;
  
  spaceShipShotGroup = createGroup();
  laserShotGroup = createGroup();
  homingGunShotGroup = createGroup();
  shotgunShotGroup = createGroup();

  laserEnemyGroup = createGroup();
  shotGunEnemyGroup = createGroup();
  homingGunEnemyGroup = createGroup();

}

function draw() {
  background(0);

  if(gameState===0){

    if(bg.x<500){
      bg.x = bg.width/2;
    }

    if(keyWentDown("space")){
      spaceShipBullet();
    }

    if(keyDown(UP_ARROW)){
      spaceShip.y -= 10;
      spaceShip.addImage(spaceShipUp);
    }

    if(keyDown(DOWN_ARROW)){
      spaceShip.y += 10;
      spaceShip.addImage(spaceShipDown);
    }

    if(keyDown(RIGHT_ARROW)){
      spaceShip.x += 10;
      spaceShip.addImage(spaceShipForward);
    }

    if(keyDown(LEFT_ARROW)){
      spaceShip.x -= 10;
      spaceShip.addImage(spaceShipBrake);
    }
    spawnLaserEnemy();
    spawnShotgunEnemy();
    spawnHomingGunEnemy();

    if(spaceShipShotGroup.isTouching(homingGunEnemyGroup)){
      homingGunEnemyGroup.destroyEach();
      score +=10;
    }

    if(spaceShipShotGroup.isTouching(laserEnemyGroup)){
      laserEnemyGroup.destroyEach();
      score +=10;
    }

    if(spaceShipShotGroup.isTouching(shotGunEnemyGroup)){
      shotGunEnemyGroup.destroyEach();
      score +=10;
    }

    if(homingGunShotGroup.isTouching(spaceShip)){
      homingGunShotGroup.destroyEach();
      life--;
    }

    if(laserShotGroup.isTouching(spaceShip)){
      laserShotGroup.destroyEach();
      life--;
    }

    if(shotgunShotGroup.isTouching(spaceShip)){
      shotgunShotGroup.destroyEach();
      life--;
    }

    if(life===0){
      gameState = 1;
    }
  }

  if(gameState===1){
    spaceShip.destroy();
    homingGunEnemyGroup.destroyEach();
    laserEnemyGroup.destroyEach();
    shotGunEnemyGroup.destroyEach();
    shotgunShotGroup.destroyEach();
    laserShotGroup.destroyEach();
    homingGunShotGroup.destroyEach();
    bg.velocityX = 0;

  }



  drawSprites();

  fill("white");
  textSize(30);
  text("Score: "+score,width-2120,height/4-220);

  text("Lives Left: "+life,width-2120,height-40);

  if(gameState===1){
    fill("white");
    textSize(130);
    text("GAME OVER",width/3-75,height/2);
  }
}

function spaceShipBullet(){
  var bullet = createSprite(spaceShip.x,spaceShip.y,10,10);
  bullet.addImage(spaceShipShot);
  bullet.velocityX = 15;
  bullet.lifetime = width/15;
  spaceShipShotGroup.add(bullet);
}
