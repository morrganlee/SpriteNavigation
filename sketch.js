/***********************************************************************************
  Sprite Navigation

  Simple use of the p5.play library
------------------------------------------------------------------------------------
	To use:
	Add this line to the index.html

  <script src="p5.timer.js"></script>
***********************************************************************************/

// This is a 'sprite' which we can move
var ghost;
var speed = 10;

// Second sprite that used ASWD to move
var frog;

// The is a static sprite
var bug;
var bug2;
var bug3;
var bugImg;

// chomp sound
var chompSound;

function preload() {
  bugImg = loadImage('assets/bug.png');
}
// Setup code goes here
function setup() {
  createCanvas(windowWidth, windowHeight);

  // create a sprite with location
  ghost = createSprite(100, 150);
  frog = createSprite(300, 150);

  // This is a *numbered* sequence of PNG files
  // We add animation to different sprites
  ghost.addAnimation('floating', 'assets/ghost_standing0001.png', 'assets/ghost_standing0007.png');
  
  // create bugs across the screen
  bug = createSprite(width/2, height/2);
  bug2 = createSprite(width/3, windowHeight-200);
  bug3 = createSprite((2 * width/3), 250);
  bug.addImage('bug', bugImg);
  bug2.addImage('bug', bugImg);
  bug3.addImage('bug', bugImg);

  // Add image to second sprite
  frog.addAnimation('bounce', 'assets/frog-01.png', 'assets/frog-08.png');

  // load the chomp sound
  soundFormats('mp3');
  chompSound = loadSound('assets/chomp.mp3');

  frameRate(30);
 }

// Draw code goes here
function draw() {
  // could draw a PNG file here
  background(255);

  // trap keyboard arrow keys
  checkMovement();

  // drawSprites is a function in p5.play, draws all the sprites
  drawSprites();

  // callback function
  ghost.overlap(frog, ghostCollision);

  // interaction w bug
  frog.overlap(bug, bugCollision);
  frog.overlap(bug2, bugCollision);
  frog.overlap(bug3, bugCollision);
}

// This will reset position
function keyPressed() {
  if( key === ' ') {
    frog.position.x = width/2;
    frog.position.y = height/2;
  }
}

function checkMovement() {
  // Check x movement
  // if(keyIsDown(RIGHT_ARROW)) {
  //   ghost.velocity.x = speed;
  // }
  // else if(keyIsDown(LEFT_ARROW)) {
  //   ghost.velocity.x = -speed;
  // }
  // else {
  //   ghost.velocity.x = 0;
  // }
  // A D keys
  if(keyIsDown(68)){
    frog.velocity.x = speed;
    ghost.velocity.x = speed;
  }
  else if(keyIsDown(65)){
    frog.velocity.x = -speed;
    ghost.velocity.x = -speed;
  }
  else{
    frog.velocity.x = 0;
    ghost.velocity.x = 0;
  }

  // Check y movement
  // if(keyIsDown(DOWN_ARROW)) {
  //   ghost.velocity.y = speed;
  // }
  // else if(keyIsDown(UP_ARROW)) {
  //   ghost.velocity.y = -speed;
  // }
  // else {
  //   ghost.velocity.y = 0;
  // }
  // S W keys
  if(keyIsDown(83)){
    frog.velocity.y = speed;
    ghost.velocity.y = speed;
  }
  else if(keyIsDown(87)){
    frog.velocity.y = -speed;
    ghost.velocity.y = -speed;
  }
  else {
    frog.velocity.y = 0;
    ghost.velocity.y = 0;
  }
}

// SpriteA is the sprite in question, spriteA will be ghost in this case
// SpriteB is the one that it collided with
function ghostCollision(spriteA, spriteB) {
  spriteB.position.x = 100;
  spriteB.position.y = 150;

  spriteA.position.x = windowWidth - 100;
  spriteA.position.y = windowHeight - 150;
}

function bugCollision(spriteA, spriteB){
  spriteB.remove();
  // chompSound.play(); // not working!!!!
}