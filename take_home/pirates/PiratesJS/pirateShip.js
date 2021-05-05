const Ship = require('./ship');

class PirateShip extends Ship {
     constructor(name) {
        super(name);
        this.cargo = 0;
        this.money = 0;
        
     }
    plunder(otherShip) {
        this.cargo += otherShip.cargo;
        this.money += otherShip.money;
    }
}

module.exports = PirateShip;
