class EmptyBox extends Rectangle { 
    constructor(x, y, width, height) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw(ctx, x, y, randomColor) {
        // define draw the empty box at x and y coordinates with width and height
        // then call it in your game loop
        //Fill rectangle with random color
        if(randomColor){
            ctx.context.strokeStyle='randomColor';
        }
        ctx.beginPath();
        ctx.rect(x || this.x, y || this.y, this.width, this.height);
  
        
        ctx.stroke();
    }
}
