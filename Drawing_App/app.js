const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");


window.addEventListener("load", () => {


    //resize
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    //vars
    let painting = false;


    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function endPosition() {
        painting = false;

        //To draw multiple lines 
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting) return;

        ctx.lineWidth = 10;
        ctx.lineCap = "round";

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

        //stop lines from all being connected
        ctx.beginPath();

        //e.clientX is mouse positition on X axis in client
        ctx.moveTo(e.clientX, e.clientY);


    }

    //eventlisteners
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);

});