(() => {
    const returnStartupBtn = document.getElementById("return-start-up");

    returnStartupBtn.addEventListener("touchend", e => {
        e.preventDefault();
        e.stopPropagation();
        globalConductor.returnStartup();
    });
})();