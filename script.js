const container = document.querySelector('.container');
createDivs();

function createDivs() {
    for (let i = 0; i < 256; i++) {
        const div = document.createElement('div');
        div.classList.add('grid-square');

        container.appendChild(div);
    }
}

let isDown = 0;

document.body.onmousedown = function(){ 
    ++isDown;
}
document.body.onmouseup = function(){ 
    isDown = 0;
}


container.addEventListener('mousedown', changeColor);
container.addEventListener('mouseover', changeColor);

function changeColor(e) {
    if (!isDown && e.type === 'mouseover') return;

    e.target.style.background = "black";
    container.style.background = "white";
}