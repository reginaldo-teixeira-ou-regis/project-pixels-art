let saveStorage = [];

function getRandomColor() {
  let hexadecimal = '0123456789ABCDEF';
  let color = '#';

  for (let cont = 0; cont < 6; cont += 1) {
    color += hexadecimal.charAt(Math.floor(Math.random() * hexadecimal.length));
  }
  return color;
}

document.getElementById('c1').style.backgroundColor = 'black';

function saveChangeColor(savedColor) {
  saveStorage = [];
  for (let cont = 1; cont < 4; cont += 1) {
    let idDiv = 'c' + (cont + 1);
    document.getElementById(idDiv).style.backgroundColor = savedColor[cont - 1];
    saveStorage.push(document.getElementById(idDiv).style.backgroundColor);
  }
  localStorage.colorPalette = JSON.stringify(saveStorage);
}

function changeColor() {
  saveStorage = [getRandomColor(), getRandomColor(), getRandomColor()];
  saveChangeColor(saveStorage);
}

let button = document.getElementById('button-random-color');
button.addEventListener('click', changeColor);

function saveColors() {
  //console.log('antes do if');
  if (localStorage.colorPalette !== undefined) {
    //console.log('depois do if');
    //console.log(typeof localStorage.colorPalette);
    saveStorage = JSON.parse(localStorage.getItem('colorPalette'));
    return saveChangeColor(saveStorage);
  }
  changeColor();
}
saveColors();

function createPainting() {
  let pixelBoard = document.getElementById('pixel-board');
  let pixelsBlock;
  for(let i = 1; i <= 25; i += 1) {
    pixelsBlock = document.createElement('div');
    pixelsBlock.classList.add('pixel');
    pixelsBlock.addEventListener('click', selectColor);
    pixelBoard.style.backgroundColor = 'white';
    pixelBoard.appendChild(pixelsBlock);
  }
}
createPainting();

function moveSelected(event) {
  let select = document.querySelector('.selected');
  let color = event.target;
  if(select) {
    select.classList.remove('selected');
    //console.log('removeu o select');
  }
  color.classList.add('selected');
  //console.log('adicionou selected');
}
document.getElementById('c1').addEventListener('click', moveSelected);
document.getElementById('c2').addEventListener('click', moveSelected);
document.getElementById('c3').addEventListener('click', moveSelected);
document.getElementById('c4').addEventListener('click', moveSelected);

function selectColor(selectBlock) {
  let selectedColor = document.querySelector('.selected').style.backgroundColor;
  selectBlock.target.style.backgroundColor = selectedColor;
  savePaintingBlocks();
}

function clearBlocks() {
  let paintingBlocks = document.getElementsByClassName('pixel');
  for(let i = 0; i < 25; i += 1) {
    paintingBlocks[i].style.backgroundColor = 'white';
  }
}

let buttonClear = document.getElementById('clear-board');
buttonClear.addEventListener('click', clearBlocks);

let arrayPaintingBlocks = [];

function savePaintingBlocks() {
  arrayPaintingBlocks = [];
  let paintingBlocks = document.getElementsByClassName('pixel');
  for(let i = 0; i < 25; i += 1) {
    arrayPaintingBlocks.push(paintingBlocks[i].style.backgroundColor);
    console.log(paintingBlocks[i].style.backgroundColor);
  }
  console.log(arrayPaintingBlocks);
  localStorage.pixelBoard = JSON.stringify(arrayPaintingBlocks);
}

function loadPaintingBlocks() {
  let paintingBlocks = document.getElementsByClassName('pixel');
  if(localStorage.pixelBoard !== undefined) {
    arrayPaintingBlocks = JSON.parse(localStorage.getItem('pixelBoard'));
    for(let i = 0; i < 25; i += 1) {
      paintingBlocks[i].style.backgroundColor = arrayPaintingBlocks[i];
    }
  }
}
loadPaintingBlocks();
