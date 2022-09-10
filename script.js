let arraySaveStorage = [];
let arraySaveSizeStorage = [];
let arrayPaintingBlocks = [];
document.getElementById('c1').style.backgroundColor = 'black';

function getRandomColor() {
  const hexadecimal = '0123456789ABCDEF';
  let color = '#';

  for (let cont = 0; cont < 6; cont += 1) {
    color += hexadecimal.charAt(Math.floor(Math.random() * hexadecimal.length));
  }
  return color;
}

function saveChangeColor(savedColor) {
  arraySaveStorage = [];
  for (let cont = 1; cont < 4; cont += 1) {
    const idDiv = 'c' + (cont + 1);
    document.getElementById(idDiv).style.backgroundColor = savedColor[cont - 1];
    arraySaveStorage.push(document.getElementById(idDiv).style.backgroundColor);
  }
  localStorage.colorPalette = JSON.stringify(arraySaveStorage);
}

function changeColor() {
  arraySaveStorage = [getRandomColor(), getRandomColor(), getRandomColor()];
  saveChangeColor(arraySaveStorage);
}

function saveColors() {
  if (localStorage.colorPalette !== undefined) {
    arraySaveStorage = JSON.parse(localStorage.getItem('colorPalette'));
    return saveChangeColor(arraySaveStorage);
  }
  changeColor();
}
saveColors();

function createPainting(value) {
  const pixelBoard = document.getElementById('pixel-board');
  let pixelsBlock;
  for (let i = 0; i < value; i += 1) {
    pixelsBlock = document.createElement('div');
    pixelsBlock.classList.add('pixel');
    pixelsBlock.addEventListener('click', selectColor);
    pixelsBlock.style.backgroundColor = 'white';
    pixelBoard.appendChild(pixelsBlock);
  }
}
createPainting(25);

function moveSelected(event) {
  const select = document.querySelector('.selected');
  const color = event.target;
  if (select) {
    select.classList.remove('selected');
  }
  color.classList.add('selected');
}
document.getElementById('c1').addEventListener('click', moveSelected);
document.getElementById('c2').addEventListener('click', moveSelected);
document.getElementById('c3').addEventListener('click', moveSelected);
document.getElementById('c4').addEventListener('click', moveSelected);

function selectColor(selectBlock) {
  const selectedColor = document.querySelector('.selected').style.backgroundColor;
  selectBlock.target.style.backgroundColor = selectedColor;
  savePaintingBlocks();
  saveSizeTable();
}

function clearBlocks() {
  const paintingBlocks = document.getElementsByClassName('pixel');
  for (let i = 0; i < paintingBlocks.length; i += 1) {
    paintingBlocks[i].style.backgroundColor = 'white';
  }
}

function savePaintingBlocks() {
  arrayPaintingBlocks = [];
  const paintingBlocks = document.getElementsByClassName('pixel');
  for (let i = 0; i < 25; i += 1) {
    arrayPaintingBlocks.push(paintingBlocks[i].style.backgroundColor);
  }
  localStorage.pixelBoard = JSON.stringify(arrayPaintingBlocks);
}

// eslint-disable-next-line max-lines-per-function
function resizeBoard() {
  const inputValue = document.getElementById('board-size').value;
  const inputxInput = inputValue ** 2;
  const input50x50 = 50 ** 2;
  if (inputValue === '' || inputValue <= 0) {
    alert('Board inválido!');
  } else if (inputValue < 5) {
    removeBlocks();
    createPainting(25);
    reassignCSS(5);
    loadPaintingBlocks();
  } else if (inputValue > 50) {
    removeBlocks();
    createPainting(input50x50);
    reassignCSS(50);
    loadPaintingBlocks();
  } else { removeBlocks();
    createPainting(inputxInput);
    reassignCSS(inputValue);
    loadPaintingBlocks();
  }
}

function reassignCSS(rowsColumns) {
  document.getElementById('pixel-board').style.gridTemplateColumns = `repeat(${rowsColumns}, 1fr)`;
  document.getElementById('pixel-board').style.gridTemplateRows = `repeat(${rowsColumns}, 1fr)`;
}

function removeBlocks() {
  const dadTable = document.getElementById('pixel-board');
  const pixel = document.getElementsByClassName('pixel');
  for (let index = pixel.length - 1; index >= 0; index -= 1) {
    dadTable.removeChild(pixel[index]);
  }
}

/* function loadPaintingBlocks() {
  let paintingBlocks = document.getElementsByClassName('pixel');
  if(localStorage.pixelBoard !== undefined) {
    arrayPaintingBlocks = JSON.parse(localStorage.getItem('pixelBoard'));
    for(let i = 0; i < 25; i += 1) {
      paintingBlocks[i].style.backgroundColor = arrayPaintingBlocks[i];
    }
  }
}
loadPaintingBlocks(); */

function saveSizeTable() {
  arraySaveSizeStorage = [];
  const paintingBlocks = document.getElementsByClassName('pixel');
  for (let i = 0; i < paintingBlocks.length; i += 1) {
    arraySaveSizeStorage.push(paintingBlocks[i].style.backgroundColor);
  }
  localStorage.boardSize = JSON.stringify(arraySaveSizeStorage);
}

function loadPaintingBlocks() {
  const pixelBlocks = document.getElementsByClassName('pixel');
  if (localStorage.boardSize !== undefined) {
    arraySaveSizeStorage = JSON.parse(localStorage.getItem('boardSize'));
    for (let i = 0; i < pixelBlocks.length; i += 1) {
      pixelBlocks[i].style.backgroundColor = arraySaveSizeStorage[i];
    }
  }
}

loadPaintingBlocks();

const button = document.getElementById('button-random-color');
button.addEventListener('click', changeColor);

const buttonClear = document.getElementById('clear-board');
buttonClear.addEventListener('click', clearBlocks);

const buttonVqv = document.getElementById('generate-board');
buttonVqv.addEventListener('click', resizeBoard);
