var path,boy,cash,diamonds,jewelry,sword,over;
var pathImg,boyImg,cashImg,diamondsImg,jewelryImg,swordImg,endImg;
var treasureCollection = 10;
var cashG,diamondsG,jewelryG,swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jewelryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,height.width/2,20);
path.addImage(pathImg);
path.velocityY = 10;


//creating boy running
boy = createSprite(windowWidth/2,windowHeight/1.5,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jewelryG=new Group();
swordGroup=new Group();

//boy.setCollider("circle",boy.x,boy.y,500);



}

function draw() {


  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX || touches.length;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > windowHeight-50 ){
    path.y = height/2;
  }

  if(boy.x<windowWidth/19){
    boy.x = windowWidth/19;
  }
  if(boy.x>windowWidth/1.05){
    boy.x = windowWidth/1.05;
  }
   
   treasureCollection =  treasureCollection-0.02;

    createCash();
    createDiamonds();
    createjewelry();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+1;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+3;
      
    }else if(jewelryG.isTouching(boy)) {
      jewelryG.destroyEach();
      treasureCollection=treasureCollection+2;
     
    }else{
      if(swordGroup.isTouching(boy) || treasureCollection <0) {
        gameState=END;
        
        
        boy.x=windowWidth/2;
        boy.y=windowHeight/1.5;
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jewelryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);

        cashG.destroyEach();
        diamondsG.destroyEach();
        jewelryG.destroyEach();
        swordGroup.destroyEach();
        
        over = createSprite(windowWidth/2,windowHeight/2,20,20);
        over.addImage("gameover", endImg);
       
       
    }
  }
  
  drawSprites();
  textSize(25);
  if(treasureCollection <3){
    fill("red")
  }
  else{
    if(treasureCollection>3){
      fill("white")
    }
  }
  text("ENERGY: "+ Math.round(treasureCollection),25,45);
  }

}

function createCash() {
  if (World.frameCount % 100 == 0) {
  var cash = createSprite(Math.round(random(windowWidth/9, windowWidth/1.2),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 9;
  cash.lifetime = 210;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 220 == 0) {
  var diamonds = createSprite(Math.round(random(windowWidth/9, windowWidth/1.2),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 9;
  diamonds.lifetime = 210;
  diamondsG.add(diamonds);
}
}

function createjewelry() {
  if (World.frameCount % 310 == 0) {
  var jewelry = createSprite(Math.round(random(windowWidth/8, windowWidth/1.2),40, 10, 10));
  jewelry.addImage(jewelryImg);
  jewelry.scale=0.13;
  jewelry.velocityY = 9;
  jewelry.lifetime = 210;
  jewelryG.add(jewelry);
  }
}

function createSword(){
  if (World.frameCount % 430 == 0) {
  var sword = createSprite(Math.round(random(windowWidth/8, windowWidth/1.2),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 12;
  sword.lifetime = 210;
  swordGroup.add(sword);
  }
}
