let saveStorage = [];

function getRandomColor() {
  let hexadecimal = '0123456789ABCDEF';
  let color = '#';

  for (let cont = 0; cont < 6; cont += 1) {
    color += hexadecimal.charAt(Math.floor(Math.random() * hexadecimal.length));
  }
  return color;
}

document.getElementById("c1").style.backgroundColor = "black";

function saveChangeColor(savedColor) {
  saveStorage = [];
  for (let cont = 1; cont < 4; cont += 1) {
    let idDiv = "c" + (cont + 1);
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
  if (localStorage.colorPalette) {
    saveStorage = JSON.parse(localStorage.getItem('colorPalette'));
  }
  saveChangeColor(saveStorage);
}
saveColors();

function createPainting() {
  let pixelBoard = document.getElementById("pixel-board");
  for(let i = 1; i <= 25; i += 1) {
    let pixelsLine = document.createElement("div");
    pixelsLine.classList.add("pixel");
    pixelBoard.appendChild(pixelsLine);
  }
};
createPainting();
