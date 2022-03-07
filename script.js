const container = document.querySelector('.container');
const clear = document.querySelector('.clear-button'); 
let squareColor = "#000000";
createDivs();
initialColor();
const squares = document.querySelectorAll('.grid-square')

function createDivs() {
    for (let i = 0; i < 256; i++) {
        const div = document.createElement('div');
        div.classList.add('grid-square');
        div.classList.add('unselectable')

        container.appendChild(div);
    }
}

function initialColor() {
    const squaresColorPicker = document.querySelector('.paint-color');
    squaresColorPicker.value = "#000000";
    squaresColorPicker.addEventListener('input', changeSquareColor);
    squaresColorPicker.select()
}

function changeSquareColor(e) {
    squareColor = e.target.value;
    squares.forEach((square) => {
        if (square.style.background) {
            square.style.background = squareColor;
        }
    })
}

let isDown = false;

document.body.onmousedown = () => isDown = true;
document.body.onmouseup = () => isDown = false;

container.addEventListener('mousedown', changeColor);
container.addEventListener('mouseover', changeColor);

function changeColor(e) {
    if (!isDown && e.type === 'mouseover') return;

    e.target.style.background = squareColor;
    container.style.background = "white";
}

clear.addEventListener('click', () => {
    squares.forEach((square) => {
        square.style.background = "white";
    })
})