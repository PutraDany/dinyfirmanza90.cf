alert("No Macai Red!, Blue! & Yellow!");
alert("Jom Tengok Triks Ape Nk Guna");

const Pixel = function(x,y,color) {
    this.x0 = x;
    this.y0 = y;
    this.color = color;
    this.speed = 4;
    this.init();
}
Pixel.prototype = {
    init: function() {
        this.x = Math.random() * c.width;
        this.y = Math.random() * c.height;
    },
    update: function() {
        if(Math.hypot(this.x - this.x0, this.y - this.y0) > 0) {
            const angle = Math.atan2(this.y0 - this.y, this.x0 - this.x);
            this.x += Math.cos(angle) * this.speed;
            this.y += Math.sin(angle) * this.speed;
            if(Math.hypot(this.x - this.x0, this.y - this.y0) < this.speed / 2) {
                this.x = this.x0;
                this.y = this.y0;
            }
        }
    },
    draw: function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 1, 1);
    }
};

let c,ctx;
let imageData;
let pixels = [];

addEventListener("load", init);

function init() {
    c = document.querySelector("canvas");
    c.width = 300;
    c.height = 200;
    ctx = c.getContext("2d");
    
    drawBg();
    
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = "32px Times";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Anti Macai Xploit", c.width/2, c.height/2);
    
    imageData = ctx.getImageData(0,0,c.width,c.height);
    for(let i = 0; i < imageData.data.length; i+=4) {
        const color = `rgba(${ imageData.data[i] },${ imageData.data[i+1] },${ imageData.data[i+2] }, ${ imageData.data[i+3] })`;
        const x = (i/4) % c.width;
        const y = Math.floor((i/4) / c.width);
        pixels.push(new Pixel(x,y,color));
    }
    
    addEventListener("ontouchstart" in document ? "touchstart" : "mousedown", () => {
        pixels.forEach(p => { p.init(); });
    });
    
    draw();
    
}

function draw() {
    pixels.forEach(p => { p.update(); });
    drawBg();
    pixels.forEach(p => { p.draw(); });
    
    requestAnimationFrame(draw);
}

function drawBg() {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,c.width,c.height);
}
