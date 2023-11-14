(() => {
    let script;
    let index;
    let bgm = null;
    let vocal = null;

    const gameDiv = document.getElementById("game");
    const characterDiv = document.getElementById("name");
    const textDiv = document.getElementById("text");

    const nextFrame = () => {
        if (index < script.length) {
            // If a feild is not set in new description, it will inherit the one in old description,
            // but `text` and `vocal` fields will be cleared.
            const description = script[index];

            const bgImg = description.bgImg;
            const text = description.text;
            const character = description.name;
            const vocalFile = description.vocal;
            const bgmFile = description.bgm;

            if (bgImg !== undefined) gameDiv.style.backgroundImage = `url("assets/images/${bgImg}")`;
            if (character !== undefined) characterDiv.innerText = character;
            textDiv.innerText = text || null;
            if (vocal !== null) {
                vocal.pause();
            }
            if (vocalFile !== undefined) {
                vocal = new Audio(`assets/sounds/${vocalFile}`);
                vocal.play();
            }
            if (bgmFile !== undefined) {
                if (bgm !== null) {
                    bgm.pause();
                }
                bgm = new Audio(`assets/sounds/${bgmFile}`);
                bgm.play();
            }

            index++;
        } else {
            globalConductor.returnStartup();
        }
    };

    gameDiv.addEventListener("touchend", _ => nextFrame());

    globalConductor.addBeforeGameStartHandler(i => {
        index = i;
        fetch("./script.json").then(res => res.json()).then(json => {
            script = json;
            nextFrame();
        });
    });

    globalConductor.addBeforeExitGameHandler(() => {
        if (vocal !== null) vocal.pause();
        if (bgm !== null) bgm.pause();
    });
})();