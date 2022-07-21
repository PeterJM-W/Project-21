var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;
var lives = 3

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
//create the canvas and adjust the window sizes to suit the device
 createCanvas(windowWidth, windowHeight)

path=createSprite(windowWidth/2,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {
  
  if(gameState===PLAY){
  background(0);
  if(keyDown(RIGHT_ARROW)){
    boy.x = boy.x + 10
  }
  if(keyDown(LEFT_ARROW)){
    boy.x = boy.x - 10
  }
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if (path.y > windowHeight) {
  path.y = windowHeight/2


}
    
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection + 50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection + 100;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        lives = lives - 1
        swordGroup.destroyEach();
        if(lives == 0){
        gameState=END;
        
        boy.addAnimation("SahilRunning",endImg);
        boy.x=width/2;
        boy.y=height/2;
        boy.scale=0.6;
        
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
        }
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection, width-120,30);
  fill(255, 0, 0)
  text("Lives: "+ lives, width-90,60);
  }

}

function createCash() {
  if (World.frameCount % 100 == 0) {
   // Modify the positions of cash 
    var cash = createSprite(Math.round(random(50, windowWidth - 50),40, 10, 10));
    cash.addImage(cashImg);0
  cash.scale=0.12;
  cash.velocityY = 5;
  cash.lifetime = windowHeight + 200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 160 == 0) {
       // Modify the positions of diamonds 

    var diamonds = createSprite(Math.round(random(50, windowWidth - 50),40, 10, 10));
    diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 5;
  diamonds.lifetime = windowHeight + 200;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 210 == 0) {
    //   Modify the positions of jwellery to make them spawn throughout the available screen size.

    var jwellery = createSprite(Math.round(random(50, windowWidth - 50),40, 10, 10));
    jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 5;
  jwellery.lifetime = windowHeight + 200;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 50 == 0) {
    //   Modify the positions of sword to make them spawn throughout the available screen size.

    var sword = createSprite(Math.round(random(50, windowWidth - 50),40, 10, 10));
    sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 4;
  sword.lifetime = windowHeight + 200;
  swordGroup.add(sword);
  }
}
