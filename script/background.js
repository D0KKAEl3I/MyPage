let canvas = document.querySelector('#background');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//UI Control
let particleMode = 'DOT'
let grabity = 'DOWN'

let particleArray = [];
const numberOfParticles = 400;

window.onresize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        this.size -= 0.05;
        if (this.size < 0) {
            this.x = (cursor.x + ((Math.random() * 60) - 10));
            this.y = (cursor.y + ((Math.random() * 60) - 10));
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
        let x = Math.random() * canvas.width
        let y = Math.random() * canvas.height
        let size = (Math.random() * 15) + 10;
        let color = 'black'
        let weight = 1;
        particleArray.push(new Particle(x, y, size, color, weight))
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
                ctx.strokeStyle = `rgba(60,60,60,${opacityValue})`
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.moveTo(particleArray[a].x, particleArray[a].y)
                ctx.lineTo(particleArray[b].x, particleArray[b].y)
                ctx.stroke();
            }

        }
    }
}
