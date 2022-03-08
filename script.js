const container = document.querySelector('.container');
const clear = document.querySelector('.clear-button'); 
const sizeRange = document.querySelector('.range-sel')
let squareColor = "#000000", gridColor = "FFFFFF", size = 16;
createDivs();
initialColor();
const squares = document.querySelectorAll('.grid-square')

function createDivs() {
    let width = 38 / size;
    for (let i = 0; i < (size * size) ; i++) {
        const div = document.createElement('div');
        div.classList.add('grid-square');
        div.classList.add('unselectable')
        div.style.width = `${width}rem`;

        container.appendChild(div);
    }
}

function initialColor() {
    const squaresColorPicker = document.querySelector('.paint-color');
    const gridColorPicker = document.querySelector('.grid-color');

    squaresColorPicker.value = "#000000";
    gridColorPicker.value = "#FFFFFF";

    squaresColorPicker.addEventListener('input', changeSquareColor);
    gridColorPicker.addEventListener('input', changeGridColor);
    squaresColorPicker.select();
    gridColorPicker.select();
}

function changeSquareColor(e) {
    squareColor = e.target.value;
    squares.forEach((square) => {
        if (square.style.background) {
            square.style.background = squareColor;
        }
    })
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

    e.target.style.background = squareColor;
    container.style.background = gridColor;
}

clear.addEventListener('click', () => {
    squares.forEach((square) => {
        if (square.style.background){
            square.style.background = "";
        }
    })
})

sizeRange.addEventListener('change', buildNew) 

function buildNew(e) {
    let newSize = Math.round(e.target.value);
    let difSizes = newSize - size;
    if (difSizes < 0) {
        while (difSizes < 0) {
            let child = container.lastElementChild;
            container.removeChild(child);
            difSizes++;
        }
    } else {
        while (difSizes > 0) {
            let div = document.createElement('div');
            div.classList.add('grid-square');
            div.classList.add('unselectable')

            container.appendChild(div);
        }
    }
    setNewSize(newSize);
}

function setNewSize(newSize) {
    newSize = 38 / newSize;
    squares.forEach((square) => {
        square.style.width = `${newSize}rem`;
    });
}