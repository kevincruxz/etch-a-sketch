const container = document.querySelector('.container');
createDivs();

function createDivs() {
    for (let i = 0; i < 256; i++) {
        const div = document.createElement('div');
        div.classList.add('grid-square');
        div.classList.add('unselectable')

        container.appendChild(div);
    }
}

document.body.onmousedown = () => isDown = true;
document.body.onmouseup = () => isDown = false;

let isDown = false;

container.addEventListener('mousedown', changeColor);
container.addEventListener('mouseover', changeColor);

function changeColor(e) {
    if (!isDown && e.type === 'mouseover') return;

    e.target.style.background = "black";
    container.style.background = "white";
}