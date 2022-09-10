let arraySaveStorage = [];
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
  for (let i = 0; i < paintingBlocks.length; i += 1) {
    arrayPaintingBlocks.push(paintingBlocks[i].style.backgroundColor);
  }
  localStorage.pixelBoard = JSON.stringify(arrayPaintingBlocks);
}

function resizeBoard() {
  let inputValue = document.getElementById('board-size').value;
  if (inputValue === '' || inputValue <= 0) {
    alert('Board inválido!');
  }

  if (inputValue < 5) {
    inputValue = 5;
    removeBlocks();
    createPainting(inputValue ** 2);
    reassignCSS(inputValue);
    loadPaintingBlocks();
  } else if (inputValue > 50) {
    inputValue = 50;
    removeBlocks();
    createPainting(inputValue ** 2);
    reassignCSS(inputValue);
    loadPaintingBlocks();
  } else { removeBlocks();
    createPainting(inputValue ** 2);
    reassignCSS(inputValue);
    loadPaintingBlocks();
  }
  localStorage.boardSize = JSON.stringify(inputValue);
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

function loadPaintingBlocks() {
  let paintingBlocks = document.getElementsByClassName('pixel');
  if (localStorage.pixelBoard !== undefined) {
    arrayPaintingBlocks = JSON.parse(localStorage.getItem('pixelBoard'));
    for (let i = 0; i < paintingBlocks.length; i += 1) {
      paintingBlocks[i].style.backgroundColor = arrayPaintingBlocks[i];
    }
  }
}

function loadSizeTable() {
  if (localStorage.boardSize) {
    let boardSize = JSON.parse(localStorage.getItem('boardSize'));
    createPainting(boardSize ** 2);
    reassignCSS(boardSize);
  } else {
    createPainting(25);
    reassignCSS(5);
  }
}

loadSizeTable();
loadPaintingBlocks();

const button = document.getElementById('button-random-color');
button.addEventListener('click', changeColor);

const buttonClear = document.getElementById('clear-board');
buttonClear.addEventListener('click', clearBlocks);

const buttonVqv = document.getElementById('generate-board');
buttonVqv.addEventListener('click', resizeBoard);
