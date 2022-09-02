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

function changeColor() {
  for (let cont = 1; cont < 4; cont += 1) {
    let idDiv = "c" + (cont + 1);
    document.getElementById(idDiv).style.backgroundColor = getRandomColor();
  }
}

let button = document.getElementById('button-random-color');
button.addEventListener('click', changeColor);
//button.addEventListener('click', saveColors);

function saveColors() {
  if (localStorage.colorPalette) {
    saveStorage = JSON.parse(localStorage.getItem('colorPalette'));
  }

  let newColor = changeColor();
  saveStorage.push(newColor);
  localStorage.colorPalette = JSON.stringify(saveStorage);
}
