const globalGameHistory = (() => {
    let index;

    const indexListeners = [];
    const savedIndexes = [];

    return {
        updateIndex: i => {
            indexListeners.forEach(listener => listener(i));
            index = i;
        },
        addIndexListener: listener => indexListeners.push(listener),
        getIndex: () => index,
        saveIndex: index => {
            savedIndexes.push(index);
            console.log(savedIndexes)
        }
    };
})();