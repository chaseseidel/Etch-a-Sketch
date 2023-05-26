const container = document.querySelector('.container');

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

let color = 'black';
let click;
function squareDragEvent(element) {
    element.addEventListener('mousedown', () => {
        click = true;
        element.style.backgroundColor = color;
    })
    element.addEventListener('mouseover', () => {
        if (click) {
            element.style.backgroundColor = color;
        }
    })
    element.addEventListener('mouseup', () => {
        click = false;
    })
}

let colorSelector = document.getElementById('color-selector');
function colorPicker() {
    color = colorSelector.value;
}