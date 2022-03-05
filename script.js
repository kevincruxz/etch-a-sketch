createDivs();

function createDivs() {
    const container = document.querySelector('.container');
    for (let i = 0; i < 256; i++) {
        const div = document.createElement('div');
        div.classList.add('grid-square')

        container.appendChild(div);
    }
    init();
}

function init() {
    const padPixels = document.querySelectorAll('.grid-square');
    padPixels.forEach((pixel) => {
        pixel.addEventListener('mousedown', function(e) {
            changeColor(this);
        })
    })
}

function changeColor(pix) {
    pix.style.cssText = "background-color: black;";
}