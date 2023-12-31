{
    const WIDTH_RATIO = 16;
    const HEIGHT_RATIO = 9;

    const sizeElement = (screenID) => {
        const horizontalScale = Math.floor(window.innerWidth / WIDTH_RATIO);
        const verticalScale = Math.floor(window.innerHeight / HEIGHT_RATIO);
        const scale = Math.min(horizontalScale, verticalScale);

        const element = document.getElementById(screenID);
        if (!!element) {
            element.style.width = `${scale * WIDTH_RATIO}px`;
            element.style.height = `${scale * HEIGHT_RATIO}px`;
        }
    };

    dynamicSizeElement = (screenID) => {
        sizeElement(screenID);
        window.addEventListener("resize", _ => sizeElement(screenID));
    };

    dynamicSizeElement("game");
    dynamicSizeElement("startup");
}