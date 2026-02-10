const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let stars = [];
let settings = {
    trailLength: 20,
    starCount: 500,
    starSpeed: 0.5,
    spawnRadius: 2
};

class Star {
    constructor() {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * settings.spawnRadius;
        this.x = Math.cos(angle) * radius;
        this.y = Math.sin(angle) * radius;
        this.z = Math.random() * canvas.width;

        // Assign star color based on temperature
        const colorType = Math.random();
        if (colorType < 0.3) {
            // Blue stars (hot)
            this.color = { r: 155, g: 176, b: 255 };
        } else if (colorType < 0.5) {
            // Blue-white stars
            this.color = { r: 202, g: 215, b: 255 };
        } else if (colorType < 0.7) {
            // White stars
            this.color = { r: 255, g: 244, b: 234 };
        } else if (colorType < 0.85) {
            // Yellow-white stars
            this.color = { r: 255, g: 237, b: 195 };
        } else if (colorType < 0.95) {
            // Orange stars
            this.color = { r: 255, g: 204, b: 111 };
        } else {
            // Red stars (cool)
            this.color = { r: 255, g: 159, b: 128 };
        }
    }

    update() {
        this.z -= settings.starSpeed;
        if (this.z <= 0) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * settings.spawnRadius;
            this.x = Math.cos(angle) * radius;
            this.y = Math.sin(angle) * radius;
            this.z = canvas.width;
        }
    }

    draw() {
        const x = this.x * (canvas.width / this.z);
        const y = this.y * (canvas.width / this.z);

        const screenX = x + canvas.width / 2;
        const screenY = y + canvas.height / 2;

        const size = (1 - this.z / canvas.width) * 3;
        const brightness = (1 - this.z / canvas.width);

        // Draw aura/glow
        const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, size * 3);
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${brightness * 0.8})`);
        gradient.addColorStop(0.3, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${brightness * 0.3})`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(screenX, screenY, size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw bright core
        ctx.fillStyle = `rgb(255, 255, 255)`;
        ctx.beginPath();
        ctx.arc(screenX, screenY, size * 0.5, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initStars() {
    stars = [];
    for (let i = 0; i < settings.starCount; i++) {
        stars.push(new Star());
    }
}

initStars();

const trailSlider = document.getElementById('trailLength');
const trailValue = document.getElementById('trailValue');
const starCountSlider = document.getElementById('starCount');
const starCountValue = document.getElementById('starCountValue');
const starSpeedSlider = document.getElementById('starSpeed');
const starSpeedValue = document.getElementById('starSpeedValue');
const spawnRadiusSlider = document.getElementById('spawnRadius');
const spawnRadiusValue = document.getElementById('spawnRadiusValue');

trailSlider.addEventListener('input', (e) => {
    settings.trailLength = parseInt(e.target.value);
    trailValue.textContent = settings.trailLength;
});

starCountSlider.addEventListener('input', (e) => {
    settings.starCount = parseInt(e.target.value);
    starCountValue.textContent = settings.starCount;
    initStars();
});

starSpeedSlider.addEventListener('input', (e) => {
    settings.starSpeed = parseFloat(e.target.value);
    starSpeedValue.textContent = settings.starSpeed;
});

spawnRadiusSlider.addEventListener('input', (e) => {
    settings.spawnRadius = parseInt(e.target.value);
    spawnRadiusValue.textContent = settings.spawnRadius;
});


function animate() {
    const alpha = 1 - (settings.trailLength / 100);
    ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animate);
}

animate();
