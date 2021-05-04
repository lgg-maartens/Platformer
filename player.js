class Player{
   
  constructor() {
    this.x = 150;
    this.y = 300;
    this.w = 30;
    this.h = 30;
    this.color = [255, 204, 0];        
    

    // for easy readable calculation
    this.halfWidth = this.w / 2;
    this.halfHeight = this.h / 2 ;

    // jump variables    
    this.maxJumpframes = 20;
    this.framesJumped = 0;
  }

  move(){

    // start with gravity
    this.gravity();

    if (keyIsDown(LEFT_ARROW)){
      if(COLLISION != "left" && this.x >= 0)
        this.x -= MOVESPEED;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      if(COLLISION != "right" && this.x + this.w < WIDTH)
        this.x += MOVESPEED;              
    }

    // if (keyIsDown(UP_ARROW)) {
    //   if(COLLISION != "top")
    //     this.y -= MOVESPEED;              
    // }

    // if (keyIsDown(DOWN_ARROW)) {
    //   if(COLLISION != "bottom")
    //     this.y += MOVESPEED;              
    // }

    
    // spatie
    if (keyIsDown(32)) {      
      if(this.framesJumped < this.maxJumpframes){
        this.y -= 13;
        this.framesJumped += 1;
      }
    }
  }

  gravity(){
    if(COLLISION != "bottom"){
      this.y += FALLSPEED;
    }
  }
 
  draw(){    
    fill(this.color)
    rect(this.x, this.y, this.w, this.h);
  }
}