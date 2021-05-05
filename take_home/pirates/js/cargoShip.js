const { randomCargo, randomMoney, randomCoordinates } = require('./utils')
//NOTE: lots of dupe code here with pirateship. keep code DRY.
class CargoShip {
    constructor() {
        const coordinates = randomCoordinates();
        this.x = coordinates.x;
        this.y = coordinates.y;
        this.cargo = randomCargo();
        this.money = randomMoney();
    }
    //BUG: Cargo ships dont move + code is not called? Should they?
    //BUG: not bound to board
    //BUG: Cardinal directions not consistent across Pirate Ship and Cargo ship implementations x should be N/S
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
