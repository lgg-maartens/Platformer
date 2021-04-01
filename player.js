class Player{
   
  constructor() {
    this.x = 150;
    this.y = 300;
    this.w = 30;
    this.h = 30;
    this.color = 0;
    this.jumps = 1;

    this.prevX = this.x;
    this.prevY = this.y;

    // jump variable
    this.maxJumpframes = 20;
  }

  move(){
    if (keyIsDown(LEFT_ARROW)){
      if(!this.isColliding().includes("left"))
        this.x -= MOVESPEED;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      if(!this.isColliding().includes("right"))
        this.x += MOVESPEED;              
    }

    // spatie
    if (keyIsDown(32)) {
      if(this.framesJumped < this.maxJumpframes){
        this.y -= 13;
        this.framesJumped += 1;
      }
    }
  }

  // deze functie geeft true terug als we botsen. Anders false
  isColliding(){
    // normaal gesproken
    let colliding = [];

    // voor elk blok controleren of we er niet tegenaan botsen
    blocks.forEach(function(block) {
      
      let bottomLeft    = player.y + player.h;
      let topRight      = player.x + player.w;
      
      let blockBottom   = block.y + block.h;
      let blockRight    = block.x + block.w;     

      let topCollision      = player.y >= block.y && player.y <= blockBottom;
      let bottomCollision   = bottomLeft >= block.y && bottomLeft <= blockBottom;
      
      // horizontaal
      if(bottomCollision || topCollision){
        
        let leftCollision   = player.x >= block.x && player.x <= blockRight;
        let rightCollision  = topRight >= block.x && topRight <= blockRight;

        //verticaal        
        if(leftCollision || rightCollision){

          let topLeftCollision      = leftCollision && topCollision;
          let topRightCollision     = topCollision && rightCollision;
          let bottomLeftCollision   = bottomCollision && leftCollision;
          let bottomRightCollision  = bottomCollision && rightCollision;

          console.log(topLeftCollision, topRightCollision, bottomLeftCollision, bottomRightCollision);

          if(bottomLeftCollision && bottomRightCollision){
            player.y = block.y - player.h;
            colliding.push('bottom')
          }

          if(topRightCollision && bottomRightCollision){
            player.x = block.x - player.w;
            colliding.push('right')
          }

          if(topLeftCollision && bottomLeftCollision){
            player.x = block.x + block.w;
            colliding.push('left')
          }

          if(topLeftCollision && topRightCollision){
            player.y = block.y + block.h;
            colliding.push('top')
          }
        }
      }
    });

    //console.log(colliding);
    return colliding;
  }
}


//   x   y   w  h
// 150 410  30 30
//   0 440 640 40
