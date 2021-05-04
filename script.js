var [WIDTH, HEIGHT] = [640, 480];
var [MOVESPEED, FALLSPEED] = [5,5]

// global collision variable
var COLLISION;

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
  // white background
  background(255);
  fill(0);  

  // set player collision
  COLLISION = checkCollision();

  // draw the blocks
  blocks.forEach(b => b.draw());

  // draw the player
  player.draw();  

  // move the player
  player.move();  
}


function keyReleased() {
	switch(keyCode) {
		case 32:
			player.framesJumped = 0;
			break;
	}
}

function checkCollision(){   

  colliding = false;

  // check collision for each block
  blocks.forEach(function(block) {
    
    // calculate difference from x and y axis centres
    let dx = (player.x + player.halfWidth) - (block.x + block.halfWidth);
    let dy = (player.y + player.halfHeight) - (block.y + block.halfHeight);

    let combinedHalfWidths  = player.halfWidth + block.halfWidth;
    let combinedHalfHeights = player.halfHeight + block.halfHeight;

    // x-axis collision?
    if(Math.abs(dx) < combinedHalfWidths){
      
      // y-axis collision?
      if(Math.abs(dy) < combinedHalfHeights){          

        let overlapX = combinedHalfWidths - Math.abs(dx);
        let overlapY = combinedHalfHeights - Math.abs(dy);          

        // collision is on the smallest overlap
        if(overlapX >= overlapY){
          if(dy > 0) {
            player.y += overlapY;
            colliding = "top";
          }
          else {            
            player.y -= overlapY;
            colliding = "bottom";            
          }
        }
        else{
          if(dx > 0){ 
            player.x += overlapX; 
            colliding = "left";
          }
          else {
            player.x -= overlapX;
            colliding = "right";
          }
        }

        //showDebug({ overlapX:overlapX, overlapY:overlapY, dx:dx, dy:dy, colliding:colliding});
      }
    }

  });

  return colliding;
}

function showDebug(options){
  fill(0)
  text("overlapX: " + options.overlapX,10,20)
  text("dx: " + options.dx,100,20)
  text("overlapY: "   + options.overlapY,10,40)        
  text("dy: " + options.dy,100,40)
  text("colliding: " + options.colliding,10,60)
}