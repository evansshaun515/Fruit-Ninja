// Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

// sword
var sword
var swordImage; 
var swordSound;

// fruits
var fruit1, fruit2, fruit3, fruit4;

// aliens
var alien1, alien2;

// Game Over
var gameOver;
var gameOverSound;

// Score
var score;

function preload(){
  
  swordImage = loadImage('sword.png');
  
  fruit1 = loadImage('fruit1.png');
  fruit2 = loadImage('fruit2.png');
  fruit3 = loadImage('fruit3.png');
  fruit4 = loadImage('fruit4.png');
  
  alien1 = loadImage('alien1.png');
  alien2 = loadImage('alien2.png');
  
  gameOverImage = loadImage('gameover.png');
  
  swordSound = loadSound('knifeSwooshSound.mp3');
  gameOverSound = loadSound('gameover.mp3');
 
}

function setup(){
  
  
  createCanvas(600,600);
  
  sword = createSprite(300,300,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  
  sword.setCollider('circle',0,0,50);
  //sword.debug = true;
  
  // Score and Groups
  
  score = 0;
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
}

function draw(){
  
  background('lightblue');
  
  text('Score: '+ score, 500,20);
  
  if (gameState === PLAY)
    {
      fruits();
      Enemy();
      
      sword.y = World.mouseY
      sword.x = World.mouseX;
      
      if (fruitGroup.isTouching(sword)){
        fruitGroup.destroyEach();
        score = score + 2;
        swordSound.play();
      }
      
      if (enemyGroup.isTouching(sword)){
        gameState = END;
        gameOverSound.play();
      }
    }
  else if (gameState === END){
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    //fruitGroup.velocityXEach(0);
    //enemyGroup.velocityXEach(0);
    
    sword.addImage(gameOverImage);
    sword.x = 300;
    sword.y = 200;
  }
  
  drawSprites();
  
  
  
}

function fruits(){
  if (World.frameCount%80 === 0){
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    r = Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    }
    if (r == 2) {
      fruit.addImage(fruit2);
    }
    if (r == 3) {
      fruit.addImage(fruit3);
    }
    if (r == 4) {
      fruit.addImage(fruit4);
    }
    
    fruit.y = Math.round(random(50,340));
    
    fruit.velocityX = -(7 + score/10);
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);
  }
}

function Enemy(){
  if (World.frameCount%200 === 0){
    alien = createSprite(400,200,20,20);
    alien.scale = 1;
    r = Math.round(random(1,2));
    if (r == 1){
      alien.addImage(alien1);
    }
    if (r == 2){
      alien.addImage(alien2);
    }
    
    alien.y = Math.round(random(100,300));
    
    alien.velocityX = -(8 + score/9);
    alien.setLifetime = 50;
    
    enemyGroup.add(alien);
    
  }
}