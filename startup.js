{
    const startBtn = document.getElementById("start-game");

    startBtn.addEventListener("touchend", e => {
        e.preventDefault();
        e.stopPropagation();
        globalConductor.startGame(0);
    });

    const continueBtn = document.getElementById("continue-game");

    // If no stored index exists, then we cannot start from previous position.
    // Turn on continue-btn from off only for fresh user.
    {
        let hasDisplayedContinueBtn = true;

        if (globalGameHistory.getIndex() === undefined) {
            continueBtn.style.display = 'none';
            hasDisplayedContinueBtn = false;
        }

        globalGameHistory.addIndexListener(index => {
            if (!hasDisplayedContinueBtn && index !== undefined) {
                continueBtn.style.display = '';
                hasDisplayedContinueBtn = true;
            }
        });
    }

    continueBtn.addEventListener("touchend", e => {
        e.preventDefault();
        e.stopPropagation();
        globalConductor.startGame(globalGameHistory.getIndex());
    });
}