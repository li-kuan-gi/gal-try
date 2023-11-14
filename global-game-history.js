const globalGameHistory = (() => {
    let index;

    const indexListeners = [];

    return {
        updateIndex: i => {
            indexListeners.forEach(listener => listener(i));
            index = i;
        },
        addIndexListener: listener => indexListeners.push(listener),
        getIndex: () => index
    };
})();