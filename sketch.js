const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var INTRO=1;
var STORY=2;
var PLAY=3;
var END=0;
var gameState=INTRO;

var kai,ground,soldiers;
var space1;
var kai1,kai_running,kai_jumping;
var SoldierGroup,CoinGroup,AirObstaclegroup;
var soldier_running;
var coin_rotating;
var obstacle1,obstacle2,obstacle3;

var count=0;
var survivalTime=0;

function preload()
{
  kai1=loadAnimation("kai1.png");
  kai_running=loadAnimation("kai2.png","kai4.png","kai3.png");
  kai_jumping=loadAnimation("kai5.png");

  soldier_running=loadAnimation("soldier4.png","soldier1.png","soldier2.png","soldier3.png","soldier5.png","soldier6.png");
  coin_rotating=loadAnimation("coin1.png","coin2.png","coin3.png","coin4.png","coin5.png","coin6.png");

  space1=loadImage("background.png");
  story_image=loadImage("story1.png");
 
  story_image2=loadImage("story2.jpg");
  intro_text=loadImage("text.png");
  intro1=loadImage("intro.jpg");
  intro_button=loadImage("introbutton.png");

  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");

}

function setup() {
	createCanvas(1600, 600);
	engine = Engine.create();
	world = engine.world;

   story1=createSprite(800,300,1600,600);
  story1.addImage(story_image);
  story1.scale=0.79;
  
  

  blank_intro=createSprite(800,300,1600,600);
  blank_intro.addImage(intro1);
  blank_intro.scale=2.8;
  
  button1=createSprite(800,500,100,100);
  button1.addImage(intro_button);
  button1.scale=0.5;

  text1=createSprite(700,250,800,400);
  text1.addImage(intro_text);

  story2=createSprite(800,300,1600,600);
  story2.addImage(story_image2);
  story2.scale=2;

  backGround=createSprite(800,300,1600,600);
  backGround.addImage(space1);
   backGround.scale=1.5;
  backGround.velocityX=-4;
  backGround.x=backGround.width/2;

  kai=createSprite(100,590,100,200);
  kai.addAnimation("kai_standing",kai1);
  kai.addAnimation("kai_running",kai_running);
  
  kai.addAnimation("kai_jumping",kai_jumping);
  
  kai.scale=0.8;

  SoldierGroup=createGroup();
  CoinGroup=createGroup();
  AirObstacleGroup=createGroup();

  


    ground=createSprite(800,580,1600,10);
    ground.velocityX=-4;
    ground.x=ground.width/2;
    ground.visible=false;
    invisibleGround=createSprite(800,595,1600,10);
    invisibleGround.visible=false;
	
    
  

	//Create the Bodies Here.


  

	Engine.run(engine);


  
}


function draw() {
  
  background(255);


if(gameState===INTRO){
 
     
  
  kai.visible=false;
  backGround.visible=false;
  SoldierGroup.visible=false;
  text1.visible=true;
  button1.visible=true;
  story1.visible=false;
  story2.visible=false;
  
  

  

if(mousePressedOver(button1)){
   story1.visible=true;
   
   button1.visible=false;
   blank_intro.visible=false;
   text1.visible=false;
   story2.visible=false;
  
gameState=STORY;
   
  
}
  
    
}  
    
  



if(gameState===STORY ){
  if(keyDown("ENTER")){
    
  story1.visible=false;
    blank_intro.visible=false;
    button1.visible=false;
    text1.visible=false;
    story2.visible=true;
    
    
    
    
  }
  if(keyDown("space")){
    gameState=PLAY;
  }
  
   
}
   
if(gameState===PLAY){
  
  survivalTime=Math.ceil(frameCount/5);
  story2.visible=false;
  
  kai.visible=true;
 
  backGround.visible=true;
  
SoldierGroup.visible=true;
CoinGroup.visible=true;
  
 if(kai.collide(invisibleGround)){
   kai.changeAnimation("kai_running");
 }

if(keyDown("space")){
  kai.changeAnimation("kai_jumping");
  kai.velocityY=-20;
} 



  

// if(SoldierGroup.isTouching(kai)){
//   gameState=END;
// }

if(CoinGroup.collide(kai)){
  count=count+1;
 
}
if(backGround.x<0){
  backGround.x=backGround.width/2;
}

if(ground.x<0){
  ground.x=ground.width/2;
}
 }

//  if(gameState===END){
//    SoldierGroup.velocityX=0;
//    CoinGroup.velocityX=0;
//    AirObstacleGroup.velocityX=0;
//  }
  
   
 


kai.velocityY=kai.velocityY+1;

kai.collide(invisibleGround);



if(gameState===PLAY){
  spawnObstacles();
  spawnCoins();
  spawnAirObstacles();
}
  

  drawSprites();
  if(gameState===STORY ){
 fill("white");
   textSize(30);
   text("Press Enter to continue...",1200,580);
  }

  if(gameState===PLAY ){
    fill("white");
    textSize(35);
    textFont("Georgia");
    text("Press Space to continue...",1200,580);
    text("Coins Collected:"+count,100,100);
     text("Survival Time:"+survivalTime,100,50);
  }
}

function spawnObstacles(){
  if(frameCount % 450 === 0) {

     soldiers=createSprite(1600,515,20,50);
     soldiers.addAnimation("soldier_running",soldier_running);
     soldiers.scale=0.5;
    soldiers.velocityX =-9;
    //assign scale and lifetime to the obstacle           
    soldiers.lifetime =200;
    //add each obstacle to the group
    SoldierGroup.add(soldiers);
  }
}

function spawnCoins(){
  if(frameCount %20===0){
    coins=createSprite(1600,random(280,560),100,200);
  coins.addAnimation("coin_rotating",coin_rotating);
  coins.scale=0.8;
  coins.velocityX=-8;
  coins.lifetime=190;
  CoinGroup.add(coins);

  }
}

function spawnAirObstacles(){
  if(frameCount %600===0){
     AirObstacles=createSprite(1600,random(100,270),100,200);
     AirObstacles.velocityX=-18;
     AirObstacles.scale=0.5;

     rand=Math.round(random(1,3));
     switch(rand){
       case 1:
         AirObstacles.addImage("obstacle_image",obstacle1);
         break;

       case 2:
        AirObstacles.addImage("obstacle_image",obstacle2);
        break;

       case 3:
          AirObstacles.addImage("obstacle_image",obstacle3);
          break;


     }
    
     

     AirObstacles.addAnimation("obstacle"+rand);

     AirObstacleGroup.add(AirObstacles);



     
  }
  
}




