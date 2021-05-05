const PirateShip = require('./pirateShip')
const CargoShip = require('./cargoShip')
const Island = require('./island')

class Board {
    constructor() {
        //NOTE: this is a lonely game.  Why not multiple players?
        this.pirate = new PirateShip()
        this.islands = []
        this.cargoShips = []
        this.initBoard()
    }

    //NOTE: initBoard doesn't really init the board but encapsulates the initialization of the pieces 
    initBoard() {
        //BUG: edge case here but what if there is a cargo ship parked on an island? This can happen, not clear if desired.
        for (let i = 0; i < 20; i++) {
            this.islands.push(new Island())
        }
        for (let i = 0; i < 3; i++) {
            this.cargoShips.push(new CargoShip())
        }
    }

    display() {
        //BUG: BOARD SIZE is 1000 but random coordinates is bound by 100
        //NOTE: board is a jagged array and a big of an awkward datastructure to use
        const board = []
        // fill board with sea char
        // NOTE: not sure if we need to do this as this is a display feature and related to state, we can fill in the ^ in the display
        for (let x = 0; x < 1000; x++) {
            board[x] = []
            for (let y = 0; y < 1000; y++) {
                board[x].push('^')
            }
        }

        //BUG: BAD LOOPS - no reason to iterate over the board if we can iterate over the ships and islands
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
            //NOTE: tight coupling to console
            //console.log(board[i].join(''))
            
        }
        console.log(`pirate location ${this.pirate.x},${this.pirate.y} `);
    }

    // NOTE: the return of this method is suspect and takes advantage of js loose typing
    getCollision() {
        //if there is a case where a ship is generated on an island, this will return the ship
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

    //BUG: only pirate ships move.  cargo ships are stationary/parked.
    //BUG: movement is not bound by board.
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
