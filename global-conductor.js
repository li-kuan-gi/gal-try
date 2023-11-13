const globalConductor = (() => {
    const startupScreen = document.getElementById("startup");
    const gameScreen = document.getElementById("game");

    const GAME_STAGE = {
        STARTUP: "startup",
        PLAYING: "playing"
    };

    const beforeGameStartHandlers = [];
    const beforeExitGameHandlers = [];

    let stage;
    const toStage = newStage => {
        if (stage === GAME_STAGE.PLAYING && newStage !== GAME_STAGE.PLAYING) {
            beforeExitGameHandlers.forEach(handler => handler());
        }
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

    const playingStageKeyEventHandlers = [];
    document.addEventListener("keypress", e => {
        if (stage === GAME_STAGE.PLAYING) {
            playingStageKeyEventHandlers.forEach(handler => handler(e));
        }
    });

    return {
        addBeforeGameStartHandler: handler => beforeGameStartHandlers.push(handler),
        startGame: index => {
            beforeGameStartHandlers.forEach(handler => handler(index));
            toStage(GAME_STAGE.PLAYING);
        },
        addBeforeExitGameHandler: handler => beforeExitGameHandlers.push(handler),
        returnStartup: () => toStage(GAME_STAGE.STARTUP),
        addPlayingStageKeyEventHandler: handler => playingStageKeyEventHandlers.push(handler),
    };
})();