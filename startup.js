(() => {
    const startBtn = document.getElementById("start-game");

    startBtn.addEventListener("touchend", e => {
        e.preventDefault();
        e.stopPropagation();
        globalConductor.startGame(0);
    });
})();