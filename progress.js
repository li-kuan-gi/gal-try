const gameDiv = document.getElementById("game");
const characterDiv = document.getElementById("name");
const textDiv = document.getElementById("text");

let script;
let length;
let index = 0;
let bgm = null;
let vocal = null;

fetch("./script.json").then(response => response.json()).then(json => {
    script = json;
    length = json.length;
    document.addEventListener("keypress", e => {
        if (e.key === " ") {
            nextFrame();
        }
    });
    nextFrame();
});

function nextFrame() {
    if (index < length) {
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
            vocal.addEventListener("canplaythrough", () => {
                vocal.play().catch(e => {
                    window.addEventListener('keypress', () => {
                        vocal.play();
                    }, { once: true });
                });
            });
        }
        if (bgmFile !== undefined) {
            if (bgm !== null) {
                bgm.pause();
            }
            bgm = new Audio(`assets/sounds/${bgmFile}`);
            bgm.addEventListener("canplaythrough", () => {
                bgm.play().catch(e => {
                    window.addEventListener('keypress', () => {
                        bgm.play();
                    }, { once: true });
                });
            });
        }

        index++;
    }
}