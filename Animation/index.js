/* const { createCanvas, loadImage } = require('canvas')
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const util = new util();

let lastTime;
let requiredElapsedTime = 1000 / 66.666; // To get 15fps 

function setup() {
    setInterval(() => {
     draw();   
    }, 15);
    
}

function draw(now){
    //Callback to get a frame 
    requestAnimationFrame(draw);

    if(!lastTime){
        lastTime = now;
    }

    const elapsedTime = now - lastTime;
    if (elapsedTime > requiredElapsedTime)  {

        update();
        ctx.fillStyle = "lightblue";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.beginPath();
        ctx.moveTo(200, 0);
        ctx.lineTo(100, 100);
        ctx.lineWidth = 15;
        ctx.closePath();
        ctx.stroke();
        
        lastTime = now;
    }
}

window.addEventListener("load", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setup();
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}); */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let horseImage = new Image();

let lastTime;
let requiredElapsed = 1000 / 15; // 15 fps

let circleX;
let circleY;

let firstBox;
let boxX = 20;

const util = new Util();

function setup() {
    circleX = canvas.width / 1000;
    circleY = canvas.height / 1000;
    firstBox = new EmptyBox(50, 50, 5, 5);
    draw();
}

function draw(now) {
    requestAnimationFrame(draw);

    if (!lastTime) {
        lastTime = now;
    }
    const elapsedTime = now - lastTime; // elapsed time is delta time
    if (elapsedTime > requiredElapsed) {
        // do stuff
        update();

        // ctx.fillStyle = "lightblue";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
    
/*         circleX += 1;
        circleY += 1;
        
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(circleX, circleY, 50, 0, Math.PI*2);
        ctx.fill(); */

        // ctx.drawImage(horseImage, 0, 0, canvas.width, canvas.height);

        const x = util.getRandom(0, canvas.width);
        const y = util.getRandom(0, canvas.height);
        let randomColor = Util.randomColor(); 
        
        firstBox.draw(ctx, x, y);
        
        // then the last step
        lastTime = now;
    }
}

// define a util function that gives a random hex color 
// bonus task: Try to use it in firstBox


function update() {
    // updating game logic here
/*     boxX += 10;
    firstBox.x = boxX; */
     
}


window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener("load", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    horseImage.src = "./assets/horse.jpg";
    horseImage.onload = () => {
        setup();        
    }
});

