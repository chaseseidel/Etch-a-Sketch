const defaultSize = document.getElementById('range').value;
const slider = document.getElementById('range');
slider.setAttribute('oninput', 'changeSize(this.value)');
colorSelector.setAttribute('oninput', 'colorPicker()')

createGrid(defaultSize);

