function setColors() {

  const chars = "0123456789ABCDEF";
  let color = "#";

  for(let index = 1; index < 5; index += 1) {
    color += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return color;
}
