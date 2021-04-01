var [WIDTH, HEIGHT] = [640, 480];
var [MOVESPEED, FALLSPEED] = [5,5]

// collision
var lastX;
var lastY;

// blocks
var ground =        { x:0,    y:440, w:WIDTH, h:40,   color:[0,255,0]};
var platform =      { x:200,  y:350, w:200,   h:30,   color:[123,123,123]}
var topPlatform =   { x:100,  y:200, w:100,   h:30,   color:[123,123,123]}
var wall =          { x:500,  y:240, w:20,   h:200,   color:[123,123,123]}

blocks = [ground,platform,topPlatform, wall];

var player;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(100);
  player = new Player();
}

function draw() {
  background(255);
  fill(0);

  drawBlock(player);

 // alle blokken tekenen
  blocks.forEach(drawBlock);

  gravity();
  player.move();
}

function gravity(){  
  if(!player.isColliding().includes("bottom")){
    player.y += FALLSPEED;
  }  
}

function keyReleased() {
	switch(keyCode) {
		case 32:
			player.framesJumped = 0;
			break;
	}
}

function drawBlock(block){
  fill(block.color)
  rect(block.x, block.y, block.w, block.h);
}