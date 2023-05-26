//Grid variables
const container = document.querySelector('.container');
const defaultSize = document.getElementById('range').value;

//Sidebar variables
const colorSelector = document.getElementById('color-selector');
const colorFinder = document.getElementById('color-finder');
const rainbowButton = document.getElementById('rainbow-button');
const resetButton = document.getElementById('reset-button');
const sliderSize = document.getElementById('slider-size');
const slider = document.getElementById('range');

//Color and draw variables
let click = false;
let color = colorSelector.value;
let find = false;
let rainbow = false;

//Grid Actions
createGrid(defaultSize);

//Sidebar actions
colorSelector.setAttribute('oninput', 'colorPicker()');
colorFinder.setAttribute('value', '#ffffff');
colorFinder.addEventListener('click', () => {
    if (find) {
        find = false;
    }
    else {
        find = true;
    }
});
rainbowButton.addEventListener('click', () => {
    if (rainbow) {
        rainbow = false;
    }
    else {
        rainbow = true;
    }
});
resetButton.addEventListener('click', resetGrid);
sliderSize.textContent = `${slider.value} x ${slider.value}`;
slider.setAttribute('oninput', 'changeSize(this.value)');

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

function changeSize(size) {
    deleteGrid();
    createGrid(size);
    sliderSize.textContent = `${size} x ${size}`;
}

function deleteGrid() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
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

//Sidebar Functions

function resetGrid() {
    const squares = container.querySelectorAll('.square');
    squares.forEach(square => square.style.backgroundColor = 'white')
}