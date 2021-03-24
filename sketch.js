var PLAY=1;
var END=0;
var gameState=PLAY;

var ghost,ghostImg;
var tower,towerImg;
var door,doorImg;
var climb,climbImg;
var invisibleblock;
var doorGrp,climberGrp,invisibleblockGrp;
var edges;
function preload(){
  ghostImg=loadImage("ghost-standing.png");
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climbImg=loadImage("climber.png");
  
}

function setup(){
  createCanvas(400,400);
  
  tower=createSprite(200,200,20,20);
  tower.addImage("towerImg",towerImg);
  tower.scale=0.7
  tower.velocityY=5;
  
  ghost=createSprite(200,200,20,20);
  ghost.addImage("ghostImg",ghostImg);
  ghost.scale=0.3;

  edges=createEdgeSprites();
  
  doorGrp=new Group();
  climberGrp=new Group();
  invisibleblockGrp=new Group();
}

function draw(){
  background("white");
 
  if(gameState===PLAY){
     
  if(tower.y>400){
    tower.y=200;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-5;
    
  }
   ghost.velocityY= ghost.velocityY+0.5;
  
  if(keyDown("right")){
    ghost.x=ghost.x+4;
    
  }
    
  if(keyDown("left")){
    ghost.x=ghost.x-4;
    
  }
    ghost.collide(climberGrp);
    
    if(ghost.isTouching(invisibleblockGrp)|| ghost.isTouching(edges[3])){
      
      gameState=END;
      
    }
      
  spawnDoor();
  }
 
  if(gameState===END){
    background("black");
    
    tower.destroy();
    ghost.destroy();
    doorGrp.destroyEach();
    climberGrp.destroyEach();
    invisibleblockGrp.destroyEach();
    stroke("yellow");
    textSize(25);
    text("GAME OVER",125,200);
  
    
    
    
  }
  
  drawSprites();
}

function spawnDoor(){

  if(frameCount%150===0){
     door=createSprite(Math.round(random (50,300)),20,50,60);
  door.addImage("doorImg",doorImg);
  door.scale=0.8;
  door.velocityY=4; 
    doorGrp.add(door);
    
    
    climber=createSprite(door.x,70,20,20);
    climber.addImage("climbImg",climbImg);
    climber.velocityY=4; 
    climberGrp.add(climber);
    
    
    invisibleblock=createSprite(door.x,90,80,10)
    invisibleblock.velocityY=4;
    invisibleblock.visible=false;
    invisibleblockGrp.add(invisibleblock);
    
    ghost.depth=door.depth+1;
    ghost.depth=climber.depth+1;
    
  }
  
}