/**
* @type HTMLCanvasElement
*/

class Cell {
    constructor(x, y, condition) {
        this.x = x;
        this.y = y;
        this.condition = condition;
    }
}

let pixelColor = 'tomato';
const colorForm = document.getElementById('form');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clear');
const startButton = document.getElementById('start');

canvas.width = 500;
canvas.height = 400;

ctx.fillStyle = "#333333";
ctx.fillRect(0, 0, canvas.width, canvas.height);


let pixelHistory = [];
const PixelCount = 20;
const pixelSize = canvas.width / PixelCount;

function main() {
    pixelHistory.forEach(cell => {
        if (!cell.condition) {
            ctx.fillStyle = '#fff';
            ctx.fillRect(cell.x * pixelSize, cell.y * pixelSize, pixelSize, pixelSize);
        }
    });
}

function startGame() {
    const evalCell = (oldCell, cond) => {
        oldCell.condition = cond;
        return oldCell;
    }

    const isNeighbour = (obj1, obj2) => {
        if (Math.abs(obj1.x - obj2.x) == 1
            && Math.abs(obj1.y - obj2.y) == 1) return true
        
        return false
    }

    
    for (let i = 0; i < pixelHistory.length; i++) {
        let currentCell = pixelHistory[i];
        let neighboursCount = 0;
        let newHistory = [];

        for (let j = 0; j < pixelHistory.length; j++) {
            if (j == i) continue

            const neighbourCell = pixelHistory[j];
            if (isNeighbour(currentCell, neighbourCell) == 1 && currentCell.condition) {
                neighboursCount += 1; 
            }
        }

        if (neighboursCount < 2 && currentCell.condition) {
            newHistory.push(
                evalCell(pixelHistory[i], false)
            );
        } else if (neighboursCount == 2 || neighboursCount == 3 && currentCell.condition) {
            newHistory.push(pixelHistory[i])
        } else if (neighboursCount > 3 && currentCell.condition) {
            newHistory.push(evalCell(pixelHistory[i], false));
        } else if (neighboursCount == 3 && !currentCell.condition) {
            newHistory.push(
                evalCell(pixelHistory[i], true)
            )
        }

        console.log(`New:`, newHistory);
        main();
    }
    
}

function addToHistory(obj) {
    pixelHistory.push(obj);    
}

function handleMouseDown(e) {
    if (e.button !== 0) return

    startX = Math.floor(e.clientX / pixelSize);
    startY = Math.floor(e.clientY / pixelSize);

    drawPixel(startX, startY);
}

function clear() {
    ctx.fillStyle = "#333333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    pixelHistory = [];
}


function drawPixel(x, y) {
    const 
        startX = x * pixelSize,
        startY = y * pixelSize,
        cell = new Cell(x, y, true);
        
    ctx.fillStyle = pixelColor;
    ctx.fillRect(startX, startY, pixelSize, pixelSize);
    
    addToHistory(cell);
    // console.log(pixelHistory)
}

canvas.addEventListener('mousedown', handleMouseDown);
clearButton.addEventListener('click', clear);
startButton.addEventListener('click', startGame);
colorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    pixelColor = `#${document.getElementById('formInput').value}`
})
