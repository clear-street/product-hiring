const Board = require('./board')
const Island = require('./island')
const CargoShip = require('./cargoShip')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

class GameMaster {
    constructor() {
        this.board = new Board();
    }

    turn() {
        this.board.display();
        readline.question("Which direction would you like to move? (1: North, 2: East, 3: South, 4: West): ", direction => {
            if (direction === '1') {
                this.board.moveSouth();
            }
            else if (direction === '2') {
                this.board.moveEast();
            }
            else if (direction === '3') {
                this.board.moveSouth();
            }
            else  {
                this.board.moveWest();
            }

            const collision = this.board.getCollision()
            if (collision) {
                if (collision instanceof Island) {
                    console.log('You hit an island!')
                    return;
                }
                else if (collision instanceof CargoShip) {
                    console.log('You hit a cargo ship!')
                    this.board.pirate.plunder(collision)
                }
            }
            this.turn()
        })
    }
}

module.exports = GameMaster;
