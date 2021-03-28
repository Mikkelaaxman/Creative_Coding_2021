// get the canvas context
const canvas = document.getElementById("canvas"); 
const ctx = canvas.getContext("2d");

let score = 0;

draw();

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "30px Comic Sans MS";
    ctx.fillText(`Score: ${score}`, canvas.width * 0.80, 50);

    ctx.beginPath();
    ctx.arc(500, 500, 200, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200, 0);
    ctx.lineTo(100, 100);
    ctx.lineWidth = 15;
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.fillStyle = "lightblue";
    ctx.moveTo(200, 500);
    ctx.lineTo(300, 600);
    ctx.lineTo(200, 200);
    // ctx.closePath();
    // ctx.stroke();
    ctx.fill();
}

// by destructuring the event like this { key } I can get event.key
window.addEventListener("keydown", ({ key }) => {
    if (key === "w" || key === "a" || key === "s" || key === "d" ) {
        score++;
        draw();
    }
});

