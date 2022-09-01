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
  for(let cont = 1; cont < 4; cont += 1) {
    let divC = "c" + (cont + 1);
    let div = document.getElementById(divC).style.backgroundColor = getRandomColor();
  }
}
