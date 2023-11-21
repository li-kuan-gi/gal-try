{
    let script;
    let index;
    let previousBgImg;
    let previousbgmFile;
    let bgm = null;
    let vocal = null;

    const gameDiv = document.getElementById("game");
    const characterDiv = document.getElementById("name");
    const textDiv = document.getElementById("text");

    const showFrame = i => {
        if (i < script.length) {
            const description = script[i];

            const bgImg = description.bgImg;
            const text = description.text;
            const character = description.character;
            const vocalFile = description.vocal;
            const bgmFile = description.bgm;

            if (bgImg !== previousBgImg) {
                gameDiv.style.backgroundImage = `url("assets/images/${bgImg}")`;
            }
            characterDiv.innerText = character || null;
            textDiv.innerText = text || null;
            if (vocal !== null) {
                vocal.pause();
            }
            if (vocalFile !== undefined) {
                vocal = new Audio(`assets/sounds/${vocalFile}`);
                vocal.play();
            }
            if (bgmFile !== previousbgmFile) {
                previousbgmFile = bgmFile;
                if (bgm !== null) {
                    bgm.pause();
                }
                if (bgmFile !== undefined) {
                    bgm = new Audio(`assets/sounds/${bgmFile}`);
                    bgm.play();
                }
            }

            globalGameHistory.updateIndex(i);
        } else {
            globalConductor.returnStartup();
        }
    };

    gameDiv.addEventListener("touchend", _ => {
        index++;
        showFrame(index);
    });

    globalConductor.addBeforeGameStartHandler(i => {
        index = i;
        fetch("./script.json").then(res => res.json()).then(json => {
            script = json;
            showFrame(index)
        });
    });

    globalConductor.addBeforeExitGameHandler(() => {
        if (vocal !== null) vocal.pause();
        if (bgm !== null) bgm.pause();
        previousbgmFile = undefined;
    });

    const saveBtn = document.getElementById("save-btn");
    saveBtn.addEventListener("touchend", e => {
        e.preventDefault();
        e.stopPropagation();
        globalGameHistory.saveIndex(index);
        alert("successfully saved");
    });
}