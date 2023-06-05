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
colorFinder.addEventListener('click', () => {
    if (find) {
        toggleAll();
    }
    else {
        toggleAll();
        colorFinder.style.backgroundColor = '#5BC3EB';
        colorFinder.style.color = '#EDE6E3';
        find = true;
    }
});
rainbowButton.addEventListener('click', () => {
    if (rainbow) {
        toggleAll();
    }
    else {
        toggleAll();
        rainbowButton.style.backgroundColor = '#5BC3EB';
        rainbowButton.style.color = '#EDE6E3';
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
            square.style.backgroundColor = 'rgb(255, 255, 255)';
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
        if (!find) {
            click = true;
        }
        else {
            rainbow = false;
            findColor(element);
        }
        colorOptions(element);
    })
    element.addEventListener('mouseover', () => {
        colorOptions(element);
    })
    element.addEventListener('mouseup', () => {
        click = false;
    })
}

function colorOptions(element) {
    if (click && rainbow) {
        element.style.backgroundColor = rainbowColor();
    }
    else if (click) {
        element.style.backgroundColor = colorSelector.value;
    }
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

function valueToHex(colorVal) {
    colorVal = colorVal.toString(16);
    if (colorVal.length == 1) {
        colorVal = '0' + colorVal;
    }
    return colorVal;
}

function RGBToHex(r, g ,b) {
    return '#' + `${valueToHex(r)}` + `${valueToHex(g)}` + `${valueToHex(b)}`;
}

//Sidebar Functions
function findColor(element) {
    let rgb = element.style.backgroundColor;
    rgb = rgb.substring(4, rgb.length - 1).replace(/, /g, ',').split(',');
    let r = valueToHex(Number(rgb[0]));
    let g = valueToHex(Number(rgb[1]));
    let b = valueToHex(Number(rgb[2]));
    let hexColor = RGBToHex(r, g, b);
    colorSelector.value = hexColor;
}

function resetGrid() {
    const squares = container.querySelectorAll('.square');
    squares.forEach(square => square.style.backgroundColor = 'rgb(255, 255, 255)')
    toggleAll();
}

function toggleAll() {
    rainbow = false;
    rainbowButton.style.backgroundColor = '#EDE6E3';
    rainbowButton.style.color = '#36382E';
    find = false;
    colorFinder.style.backgroundColor = '#EDE6E3';
    colorFinder.style.color = '#36382E';
}