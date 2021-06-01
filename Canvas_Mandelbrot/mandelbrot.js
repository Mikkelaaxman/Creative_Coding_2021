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

function mandelbrot(c) {
    let z = { x: 0, y: 0 }, n = 0, p, d;
    do {
        p = {
            x: Math.pow(z.x, 2) - Math.pow(z.y, 2),
            y: 2 * z.x * z.y
        }
        z = {
            x: p.x + c.x,
            y: p.y + c.y
        }
        d = Math.sqrt(Math.pow(z.x, 2) + Math.pow(z.y, 2))
        n += 1
    } while (d <= 2 && n < MAX_ITERATION)
    return [n, d <= 2]
}

function draw() {
    //entire width and height of canvas is iterated
    for (let i = 0; i < WIDTH; i++) {
        for (let j = 0; j < HEIGHT; j++) {
            //Storing complex number, x and y are calculated getting a relative value, of the width and height of the canvas, plus the values ​​that belong to the mandelbrot set.
            let complex = {
                x: REAL_SET.start + (i / WIDTH) * (REAL_SET.end - REAL_SET.start),
                y: IMAGINARY_SET.start + (j / HEIGHT) * (IMAGINARY_SET.end - IMAGINARY_SET.start)
            }
            //calling mandelbrot
            const [m, isMandelbrotSet] = mandelbrot(complex)
            //If Complex belongs to set the black color is chosen, otherwise the color depends of the number of iterations
            ctx.fillStyle = colors[isMandelbrotSet ? 0 : (m % colors.length - 1) + 1]
            //ctx.fillStyle = 'hsl(0, 100%, ' + m + '%)';
            //A pixel is filled black
            ctx.fillRect(i, j, 1, 1)
        }
    }
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

draw();