const { randomCoordinates } = require('./utils')

class PirateShip {
    constructor() {
        const coordinates = randomCoordinates();
        this.x = coordinates.x;
        this.y = coordinates.y;
        this.cargo = 0;
        this.money = 0;
    }

    moveNorth() {
        this.x -= 1;
    }
    moveSouth() {
        this.x += 1;
    }
    moveWest() {
        this.y -= 1;
    }
    moveEast() {
        this.y += 1;
    }
    plunder(cargoShip) {
        this.cargo += cargoShip.cargo;
        this.money += cargoShip.money;
    }
}

module.exports = PirateShip;
