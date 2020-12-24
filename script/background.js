let backgroundCanvas = document.querySelector('#background');
let bgctx = backgroundCanvas.getContext('2d');
backgroundCanvas.width = window.innerWidth;
backgroundCanvas.height = window.innerHeight;

//UI Control
let particleMode = 'NONE'
let grabity = 'DOWN'
let selectedColor = '#101010'

let particleArray = [];
const numberOfParticles = 400;

window.onresize = function () {
    backgroundCanvas.width = window.innerWidth;
    backgroundCanvas.height = window.innerHeight;
}

const cursor = { x: null, y: null };
window.addEventListener('mousemove', e => {
    cursor.x = e.x;
    cursor.y = e.y;
});
setInterval(() => {
    cursor.x = undefined;
    cursor.y = undefined;
}, 100)
class Particle {
    constructor(x, y, size, color, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
    }
    draw() {
        bgctx.beginPath();
        bgctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        bgctx.fillStyle = this.color;
        bgctx.fill();
    }
    update() {
        this.size -= 0.05;
        if (this.size < 0) {
            this.x = (cursor.x + ((Math.random() * 60) - 30));
            this.y = (cursor.y + ((Math.random() * 60) - 30));
            this.color = selectedColor
            this.size = (Math.random() * 15) + 10;
            this.weight = (Math.random() * 2) - 0.5;
        }
        this.y += this.weight;
        if (grabity == 'DOWN') { this.weight += 0.3; }
        else if (grabity == 'UP') { this.weight -= 0.3; }
    }
}

function init() {
    particleArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * backgroundCanvas.width
        let y = Math.random() * backgroundCanvas.height
        let size = (Math.random() * 15) + 10;
        let color = 'black'
        let weight = 1;
        particleArray.push(new Particle(x, y, size, color, weight))
    }
}

function animate() {
    bgctx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        if (particleMode == 'DOT') particleArray[i].draw();
    }
    if (particleMode == 'LINE') connect()
    requestAnimationFrame(animate)
}

init();
animate();

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
            let distance = ((particleArray[a].x - particleArray[b].x) * (particleArray[a].x - particleArray[b].x)) + ((particleArray[a].y - particleArray[b].y) * (particleArray[a].y - particleArray[b].y))
            if (distance < 5000) {
                opacityValue = 1 - distance / 10000
                bgctx.strokeStyle = selectedColor
                bgctx.beginPath();
                bgctx.lineWidth = 2;
                bgctx.moveTo(particleArray[a].x, particleArray[a].y)
                bgctx.lineTo(particleArray[b].x, particleArray[b].y)
                bgctx.stroke();
            }

        }
    }
}
