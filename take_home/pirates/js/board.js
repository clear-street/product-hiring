const PirateShip = require('./pirateShip')
const CargoShip = require('./cargoShip')
const Island = require('./island')

class Board {
    constructor() {
        this.pirate = new PirateShip()
        this.islands = []
        this.cargoShips = []
        this.initBoard()
    }

    initBoard() {
        for (let i = 0; i < 20; i++) {
            this.islands.push(new Island())
        }
        for (let i = 0; i < 3; i++) {
            this.cargoShips.push(new CargoShip())
        }
    }

    display() {
        const board = []
        // fill board with sea char
        for (let x = 0; x < 1000; x++) {
            board[x] = []
            for (let y = 0; y < 1000; y++) {
                board[x].push('^')
            }
        }

        for(let x = 0; x < 1000; x++) {
            for (let y = 0; y < 1000; y++) {
                for (let cargo of this.cargoShips) {
                    if (cargo.x === x && cargo.y === y) {
                        board[x][y] = 'C'
                    }
                }
                for (let island of this.islands) {
                    if (island.x === x && island.y === y) {
                        board[x][y] = 'I'
                    }
                }
                if (this.pirate.x === x && this.pirate.y === y) {
                    board[x][y] = 'P'
                }
            }
        }

        // print board
        for (let i = 0; i < 1000; i++) {
            console.log(board[i].join(''))
        }
    }

    getCollision() {
        for (let cargo of this.cargoShips) {
            if (cargo.x === this.pirate.x && cargo.y === this.pirate.y) {
                return cargo;
            }
        }
        for (let island of this.islands) {
            if (island.x === this.pirate.x && island.y === this.pirate.y) {
                return island;
            }
        }
        return null;
    }

    moveNorth() {
        this.pirate.moveNorth();
    }
    moveSouth() {
        this.pirate.moveSouth()
    }
    moveWest() {
        this.pirate.moveWest();
    }
    moveEast() {
        this.pirate.moveEast();
    }
}

module.exports = Board;
