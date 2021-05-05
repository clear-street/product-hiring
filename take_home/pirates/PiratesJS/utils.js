const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min) + min;
};

const randomMoney = () => getRandomInt(100, 5000)

const randomCargo = () => getRandomInt(1, 5)

module.exports = {getRandomInt, randomMoney, randomCargo}