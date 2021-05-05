const Ship = require('./ship');

class CargoShip extends Ship {
    constructor(args) {
        super(args);        
        this.cargo = args.startingCargo;
        this.money = args.startingMoney;

    }
}

module.exports = CargoShip;
