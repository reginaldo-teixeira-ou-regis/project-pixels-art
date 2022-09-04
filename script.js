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
  let pixelsBlock;
  for(let i = 1; i <= 25; i += 1) {
    pixelsBlock = document.createElement("div");
    pixelsBlock.classList.add("pixel");
    pixelsBlock.addEventListener("click", selectColor);
    pixelBoard.appendChild(pixelsBlock);
  }
};
createPainting();

function moveSelected(event) {
  let select = document.querySelector(".selected");
  let color = event.target;
  if(select === color) {
    console.log("Passei no if?");

  }
}
document.getElementById("c1").addEventListener("click", moveSelected);
document.getElementById("c2").addEventListener("click", moveSelected);
document.getElementById("c3").addEventListener("click", moveSelected);
document.getElementById("c4").addEventListener("click", moveSelected);

function selectColor(selectBlock) {
  //console.log(selectBlock.target);
  //selectBlock.target;
  //console.log("Passei aqui");
}
/* function comparePalette() {
  let class = document.getElementsByClassName("color");
  let selectedClick = document.querySelector(".selected");
  if(!class) {
    return null;
  }
  if(selectedClick) {
    selectedClick.remove();
  }
  class = document.createElement("className");
  class.className = "selected";
  class.appendChild(className)
} */
