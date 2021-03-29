var [WIDTH, HEIGHT] = [640, 480];
var [MOVESPEED] = [5]

// jump variable
var maxJumpframes = 20;
var framesJumped = 0;

// collision
var lastX;
var lastY;

// blocks
var player =        { x:150,  y:300, w:30,    h:30,   color:0};
var ground =        { x:0,    y:440, w:WIDTH, h:40,   color:[0,255,0]};
var platform =      { x:200,  y:350, w:200,   h:30,   color:[123,123,123]}
var topPlatform =   { x:100,  y:200, w:100,   h:30,   color:[123,123,123]}
var wall =          { x:500,  y:240, w:20,   h:200,   color:[123,123,123]}

blocks = [ground,platform,topPlatform, wall];

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(100);
}

function draw() {
  background(255);
  fill(0);

  drawBlock(player);

 // alle blokken tekenen
  blocks.forEach(drawBlock);

  gravity();
  move();

}

function gravity(){  
  if(!isColliding()){
    player.y += 5;
  }
}

function move(){
  if (keyIsDown(LEFT_ARROW)) {
    if(!isColliding())
      player.x -= MOVESPEED;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    if(!isColliding())
      player.x += MOVESPEED;
  }

  // spatie
  if (keyIsDown(32)) {
    if(framesJumped < maxJumpframes){
      player.y -= 13;
      framesJumped += 1;
    }
  }
}

function keyReleased() {
	switch(keyCode) {
		case 32:
			framesJumped = 0;
			break;
	}
}

function drawBlock(block){
  fill(block.color)
  rect(block.x, block.y, block.w, block.h);
}

// deze functie geeft true terug als we botsen. Anders false
function isColliding(){
  // normaal gesproken
  colliding = false;

  // voor elk blok controleren of we er niet tegenaan botsen
  blocks.forEach(function(block) {
    
    let blockBottom   = block.y + block.h;
    let blockRight    = block.x + block.w;
    let playerBottom  = player.y + player.h;
    let playerRight   = player.x + player.w;

    let topCollision    = player.y >= block.y && player.y <= blockBottom;
    let bottomCollision = playerBottom >= block.y && playerBottom <= blockBottom;

    // horizontaal
    if(bottomCollision || topCollision){
      
      let leftCollision   = player.x >= block.x && player.x <= blockRight;
      let rightCollision  = playerRight >= block.x && playerRight <= blockRight;

      //verticaal        
      if(leftCollision || rightCollision){
        console.log()
        colliding = true;
      }            
    }
  });

  return colliding;
}