const container = document.querySelector('.container');
const clear = document.querySelector('.clear-button'); 
const sizeRange = document.querySelector('.range-sel')
let squareColor = "#000000", gridColor = "#FFFFFF", size = 16, eraser = false, rainbow = false;
createDivs();
initialColor();
const eraserButton = document.querySelector('.eraser');
initialEraser();
const rainbowButton = document.querySelector('.rainbow');
initialRainbow();
let squares = document.querySelectorAll('.grid-square')

function createDivs() {
    let width = 36 / size;
    for (let i = 0; i < (size * size) ; i++) {
        const div = document.createElement('div');
        div.classList.add('grid-square');
        div.classList.add('unselectable')
        div.style.width = `${width}rem`;

        container.appendChild(div);
    }
}

function initialEraser() {
    eraserButton.addEventListener('click', eraserActive);
}

function eraserActive() {
    if (eraser === true) {
        eraser = false;
        eraserButton.textContent = "Eraser"
    } else {
        eraser = true;
        eraserButton.textContent = "Return to paint"
        if (rainbow === true) rainActive();
    }
}

function initialRainbow() {
    rainbowButton.addEventListener('click', rainActive);
}

function rainActive() {
    if (rainbow === true) {
        rainbow = false;
        rainbowButton.textContent = "Rainbow"
    } else {
        rainbow = true;
        rainbowButton.textContent = "Return to paint"
        if (eraser === true) eraserActive();
    }
}

function initialColor() {
    const squaresColorPicker = document.querySelector('.paint-color');
    const gridColorPicker = document.querySelector('.grid-color');

    squaresColorPicker.value = "#000000";
    gridColorPicker.value = "#FFFFFF";

    squaresColorPicker.addEventListener('input', changeSquareColor);
    gridColorPicker.addEventListener('input', changeGridColor);
    
}

function changeSquareColor(e) {
    squareColor = e.target.value;
    squares.forEach((square) => {
        if (square.style.background) {
            square.style.background = squareColor;
        }
    });
}

function changeGridColor(e) {
    gridColor = e.target.value;
    container.style.background = gridColor;
}

let isDown = false;

document.body.onmousedown = () => isDown = true;
document.body.onmouseup = () => isDown = false;

container.addEventListener('mousedown', changeColor);
container.addEventListener('mouseover', changeColor);

function changeColor(e) {
    if (!isDown && e.type === 'mouseover') return;

    if (eraser === true) {
        e.target.style.background = "";
        container.style.background = gridColor;
    } else if (rainbow === true) {
        let red = Math.floor(Math.random() * 255);
        let green = Math.floor(Math.random() * 255);
        let blue = Math.floor(Math.random() * 255);

        e.target.style.background = `rgb(${red},${green},${blue})`
    } else {
        e.target.style.background = squareColor;
        container.style.background = gridColor;
    }
}

clear.addEventListener('click', clearGrid);

function clearGrid() {
    squares.forEach((square) => {
        if (square.style.background){
            square.style.background = "";
        }
    })
}

sizeRange.addEventListener('input', buildNew) 

function buildNew(e) {
    clearGrid()
    let newSizeString = e.target.value;
    let newSize = parseInt(newSizeString, 10);
    let difSizes = newSize**2 - size**2;
    size = newSize;

    if (difSizes < 0) {
        let child = container.lastElementChild;
        while (difSizes < 0) {
            container.removeChild(child);
            child = container.lastElementChild;
            difSizes++;
        }
    } else {
        while (difSizes > 0) {
            let div = document.createElement('div');
            div.classList.add('grid-square');
            div.classList.add('unselectable')

            container.appendChild(div);
            difSizes--;
        }
    }
    squares = document.querySelectorAll('.grid-square')
    setNewSize(newSize);
}

function setNewSize(newSize) {
    newSize = 36 / newSize;
    squares.forEach((square) => {
        square.style.width = `${newSize}rem`;
        square.style.height = `${newSize}rem`;
    });
}