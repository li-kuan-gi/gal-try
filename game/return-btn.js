(() => {
    const returnStartupBtn = document.getElementById("return-start-up");

    returnStartupBtn.addEventListener("click", _ => {
        globalConductor.returnStartup();
    });

    returnStartupBtn.addEventListener("touchend", e => {
        e.preventDefault();
        e.stopPropagation();
        globalConductor.returnStartup();
    });
})();