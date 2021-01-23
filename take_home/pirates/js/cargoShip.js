const { randomCargo, randomMoney, randomCoordinates } = require('./utils')

class CargoShip {
    constructor() {
        const coordinates = randomCoordinates();
        this.x = coordinates.x;
        this.y = coordinates.y;
        this.cargo = randomCargo();
        this.money = randomMoney();
    }

    moveNorth() {
        this.y -= 1;
    }
    moveSouth() {
        this.y += 1;
    }
    moveWest() {
        this.x -= 1;
    }
    moveEast() {
        this.x += 1;
    }
}

module.exports = CargoShip;
