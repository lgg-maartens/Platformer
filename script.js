var [WIDTH, HEIGHT] = [640, 480];
var [MOVESPEED, FALLSPEED] = [5,5]

// collision
var lastX;
var lastY;

// blocks
var ground      = new Block({x:0,   y:440, w:WIDTH, h:40,   color:[0,255,0]});
var platform    = new Block({x:250, y:350, w:150,   h:30,   color:[123,123,123]});
var topPlatform = new Block({x:100, y:200, w:100,   h:30,   color:[123,123,123]});
var wallRight   = new Block({x:500, y:240, w:20,    h:200,  color:[123,123,123]});
var pipeBottom  = new Block({x:50,  y:400, w:80,    h:100,  color:[1,110,30]});
var pipeTop     = new Block({x:30,  y:380, w:120,   h:20,   color:[1,110,30]});

var blocks = [ground, platform, topPlatform, wallRight, pipeBottom, pipeTop];

var player;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(100);
  player = new Player();
}

function draw() {
  background(255);
  fill(0);

  player.draw();

 // alle blokken tekenen
  blocks.forEach(b => b.draw());

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