//Grid variables
const container = document.querySelector('.container');

//Color and draw variables
const colorSelector = document.getElementById('color-selector');

let rainbow = false;
let color = colorSelector.value;
let click = false;

//Grid Functions
function createGrid(input) {
    for (let i = 0; i < input; i++) {
        const column = document.createElement('div');
        column.classList.add('column');

        for (let j = 0; j < input; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            squareDragEvent(square);
            column.appendChild(square);
        }

        container.appendChild(column);
    }
}

function changeSize(value) {
    deleteGrid();
    createGrid(value);
}

function deleteGrid() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function resetGrid() {
    const squares = container.querySelectorAll('.square');
    squares.forEach(square => square.style.backgroundColor = 'white')
}

//Color and draw functions
function squareDragEvent(element) {
    element.addEventListener('mousedown', () => {
        click = true;
        if (rainbow) {
            element.style.backgroundColor = rainbowColor();
        }
        else {
            element.style.backgroundColor = color;
        }
    })
    element.addEventListener('mouseover', () => {
        if (click && rainbow) {
            element.style.backgroundColor = rainbowColor();
        }
        else if (click) {
            element.style.backgroundColor = color;
        }
    })
    element.addEventListener('mouseup', () => {
        click = false;
    })
}

function colorPicker() {
    color = colorSelector.value;
    rainbow = false;
}

function rainbowColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}