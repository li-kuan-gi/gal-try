const WIDTH_RATIO = 16;
const HEIGHT_RATIO = 9;

sizeBg();
window.addEventListener("resize", _ => sizeBg());

function sizeBg() {
    const horizontalScale = Math.floor(window.innerWidth / WIDTH_RATIO);
    const verticalScale = Math.floor(window.innerHeight / HEIGHT_RATIO);
    const scale = Math.min(horizontalScale, verticalScale);

    const gameScreen = document.getElementById("game");
    gameScreen.style.width = `${scale * WIDTH_RATIO}px`;
    gameScreen.style.height = `${scale * HEIGHT_RATIO}px`;
}