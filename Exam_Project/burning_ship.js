// get the canvas context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
ctx.canvas.width = WIDTH
ctx.canvas.height = HEIGHT

let REAL_SET = { start: -2, end: 1 }    //Real numbers, Domain of x-Axis 
let IMAGINARY_SET = { start: -1, end: 1 }   //Complex numbers of Y-axis
const ZOOM_FACTOR = 0.1

//16 random hex colors
const colors = new Array(16).fill(0).map((_, i) => i === 0 ? '#000' : `#${((1 << 24) * Math.random() | 0).toString(16)}`)

const MAX_ITERATION = 500

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

function burningShip(x,y,cx,cy) {
    let nx = x * x - y * y + cx;
    let ny = 2.0 * Math.abs(x * y) + cy;
    this.x = nx;
    this.y = ny;
}

function checkCanvasIsSupported() {
    canvas = document.getElementById("canvas");
    canvas.width = 480;
    canvas.height = 320;
    if (canvas.getContext) {
        context = canvas.getContext('2d');
        render();
        //setInterval(render, 100);
    } else {
        alert("Sorry, but your browser doesn't support a canvas.");
    }
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // visualize Burning Ship fractal
    drawBurningShipFractal();
    // draw Sierpinski carpet
    //drawSierpinskiCarpet();
}
function drawBurningShipFractal() {
    // prepare image and pixels
    var image_data = context.createImageData(canvas.width, canvas.height);
    var d = image_data.data;

    
    for (var i = 0; i < canvas.height; i++) {
        for (var j = 0; j < canvas.width; j++) {

            x0 = -1.80 + j * (-1.7 + 1.80) / canvas.width;
            y0 = -0.08 + i * (0.01 + 0.08) / canvas.height;
            x = 0;
            y = 0;
            iteration = 0;

            while ((x * x + y * y < 4) && (iteration < MAX_ITERATION)) {
                x_n = x * x - y * y + x0;
                y_n = 2 * Math.abs(x * y) + y0;
                x = x_n;
                y = y_n;
                iteration++;
            }

            // set pixel color [r,g,b,a]
            d[i * canvas.width * 4 + j * 4 + 0] = 25 + iteration * 30;
            d[i * canvas.width * 4 + j * 4 + 1] = 25 + iteration * 10;
            d[i * canvas.width * 4 + j * 4 + 2] = 85 - iteration * 5;
            d[i * canvas.width * 4 + j * 4 + 3] = 255;
        }
    }

    // draw image
    context.putImageData(image_data, 0, 0);
}

canvas.addEventListener('dblclick', e => {
    const zfw = (WIDTH * ZOOM_FACTOR)
    const zfh = (HEIGHT * ZOOM_FACTOR)

    //Shrink real and imaginary numbers relative to postition clicked
    REAL_SET = {
        start: getRelativePoint(e.pageX - canvas.offsetLeft - zfw, WIDTH, REAL_SET),
        end: getRelativePoint(e.pageX - canvas.offsetLeft + zfw, WIDTH, REAL_SET)
    }
    IMAGINARY_SET = {
        start: getRelativePoint(e.pageY - canvas.offsetTop - zfh, HEIGHT, IMAGINARY_SET),
        end: getRelativePoint(e.pageY - canvas.offsetTop + zfh, HEIGHT, IMAGINARY_SET)
    }

    draw()
})

const getRelativePoint = (pixel, length, set) => set.start + (pixel / length) * (set.end - set.start)

function drawSierpinskiCarpet() {
    // draw carpet
    var draw_carpet = function (x, y, width, height, iteration) {
        if (iteration == 0) return;
        var w = width / 3;
        var h = height / 3;

        // draw subsquare
        context.fillStyle = 'rgb(255,255,255)';
        context.fillRect(x + w, y + h, w, h);

        // draw subcarpets
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                // remove central subsquare
                if (j == 1 && i == 1) continue;
                draw_carpet(x + j * w, y + i * h, w, h, iteration - 1);
            }
        }
    }

    // init carpet size		
    var carpet_width = canvas.height;
    var carpet_height = canvas.height;
    // align to the center
    var carpet_left = (canvas.width - carpet_width) / 2;
    // limit the depth of recursion
    var max_iterations = 4;

    // draw Sierpinski carpet
    draw_carpet(carpet_left, 0, carpet_width, carpet_height, max_iterations);
}