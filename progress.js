const gameDiv = document.getElementById("game");
const characterDiv = document.getElementById("name");
const textDiv = document.getElementById("text");

const bgImg = "aisa.png";
const text = "「現実でも、こんな美しいものがあるんだなって……ようやく思い出せた」";
const character = "逢桜";

gameDiv.style.backgroundImage = `url("assets/${bgImg}")`;
characterDiv.innerText = character;
textDiv.innerText = text;
