const container = document.querySelector('.container');

let userInput = 100;

function createGrid() {
    for (let i = 0; i < userInput; i++) {
        const column = document.createElement('div');
        column.classList.add('column');

        for (let j = 0; j < userInput; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            squareDragEvent(square);
            column.appendChild(square);
        }
        
        container.appendChild(column);
    }
}

createGrid();

let click;
function squareDragEvent(element) {
    element.addEventListener('mousedown', () => {
        click = true;
        element.style.backgroundColor = 'black';
    })
    element.addEventListener('mouseover', () => {
        if (click) {
            element.style.backgroundColor = 'black';
        }
    })
    element.addEventListener('mouseup', () => {
        click = false;
    })
}