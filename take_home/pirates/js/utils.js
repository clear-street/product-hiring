function getRandomInt(min, max) {
    //BUG: not inclusive of min/max
    //should be Math.floor(Math.random() * (max - min) + min) + min
    return Math.floor(Math.random() * (max - min) + min);
}

exports.randomMoney = () => getRandomInt(100, 5000)

exports.randomCargo = () => getRandomInt(1, 5)

//BUG: Board is 1000^2 not 100. so either that is a typo or slightly less random coordinates!
//board size should be defined as a parameter on startup
exports.randomCoordinates = () => {
    return { x: getRandomInt(0, 100), y: getRandomInt(0, 100) }
}
