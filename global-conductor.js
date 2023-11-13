const globalConductor = (() => {
    const startupScreen = document.getElementById("startup");
    const gameScreen = document.getElementById("game");

    const GAME_STAGE = {
        STARTUP: "startup",
        PLAYING: "playing"
    };
    let stage;
    const toStage = newStage => {
        stage = newStage;
        switch (stage) {
            case GAME_STAGE.STARTUP:
                startupScreen.style.display = "";
                gameScreen.style.display = "none";
                break;
            case GAME_STAGE.PLAYING:
                startupScreen.style.display = "none";
                gameScreen.style.display = "";
                break;
        }
    };
    toStage(GAME_STAGE.STARTUP);

    const gameStartHandlers = [];
    const playingStageKeyEventHandlers = [];

    document.addEventListener("keypress", e => {
        if (stage === GAME_STAGE.PLAYING) {
            playingStageKeyEventHandlers.forEach(handler => handler(e));
        }
    });

    return {
        addGameStartHandler: handler => gameStartHandlers.push(handler),
        startGame: index => {
            if (stage === GAME_STAGE.STARTUP) {
                gameStartHandlers.forEach(handler => handler(index));
                toStage(GAME_STAGE.PLAYING);
            }
        },
        addPlayingStageKeyEventHandler: handler => playingStageKeyEventHandlers.push(handler),
    };
})();