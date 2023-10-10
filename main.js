/**
* @type HTMLCanvasElement
*/

let pixelColor = 'tomato';
const colorForm = document.getElementById('form');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clear');

canvas.width = 500;
canvas.height = 400;

ctx.fillStyle = "#333333";
ctx.fillRect(0, 0, canvas.width, canvas.height);


const PixelCount = 20;
const pixelSize = canvas.width / PixelCount;

function handleMouseDown(e) {
    if (e.button !== 0) return

    startX = Math.floor(e.clientX / pixelSize);
    startY = Math.floor(e.clientY / pixelSize);

    drawPixel(startX, startY);
}

function clear() {
    ctx.fillStyle = "#333333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPixel(x, y) {
    const 
        startX = x * pixelSize,
        startY = y * pixelSize
    
    ctx.fillStyle = pixelColor;
    ctx.fillRect(startX, startY, pixelSize, pixelSize);
}

canvas.addEventListener('mousedown', handleMouseDown);
clearButton.addEventListener('click', clear);
colorForm.addEventListener('submit', (e) => {
    e.preventDefault();

    pixelColor = `#${document.getElementById('formInput').value}`
})
