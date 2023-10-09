/**
* @type HTMLCanvasElement
*/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clear');

canvas.width = 500;
canvas.height = 400;

ctx.fillStyle = "#333333";
ctx.fillRect(0, 0, canvas.width, canvas.height);


const PixelCount = 5;
const pixelSize = canvas.width / PixelCount;

function handleMouseDown(e) {
    if (e.button !== 0) return

    startX = Math.floor(e.clientX / pixelSize);
    startY = Math.floor(e.clientY / pixelSize);

    drawPixel(startX, startY);
}

function drawPixel(x, y) {
    const 
        startX = x * pixelSize,
        startY = y * pixelSize
    ctx.rect(startX, startY, pixelSize, pixelSize);
    ctx.fillStyle = "tomato";
    ctx.fill();
}

canvas.addEventListener('mousedown', handleMouseDown);
clearButton.addEventListener('click', () => {
    ctx.fillStyle = "#333333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
})