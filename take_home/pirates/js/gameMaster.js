const Board = require('./board')
const Island = require('./island')
const CargoShip = require('./cargoShip')
//NOTE: Tight coupling of input and output. Could cause extensibility issues.
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

class GameMaster {
    constructor() {
        //NOTE: delegates state management to Board Object and is bad design. state should be floated up to Game Master or at the highest level 
        this.board = new Board();
    }

    turn() {
        this.board.display();
        readline.question("Which direction would you like to move? (1: North, 2: East, 3: South, 4: West): ", direction => {
            //NOTE: why are directions numbers? Seems abitrary and confusing.  Should use letters or capture the arrow key in stdin
            if (direction === '1') {
                //NOTE: confusing code organization.  the board is not doing the moving.
                //BUG: should be moveNorth()
                this.board.moveSouth();
            }
            else if (direction === '2') {
                this.board.moveEast();
            }
            else if (direction === '3') {
                this.board.moveSouth();
            }
            else  {
                //bad defaulting here
                this.board.moveWest();
            }

            const collision = this.board.getCollision()
            if (collision) {
                //instance checking here is a bit clunky
                if (collision instanceof Island) {
                    console.log('You hit an island!')
                    return;
                }
                else if (collision instanceof CargoShip) {
                    console.log('You hit a cargo ship!')
                    this.board.pirate.plunder(collision)
                }
            }
            //NOTE: this "event pump" mechanism is not great. 
            //this looks like a recursive call which can leak memory and blow up the stack
            //alternatives here could be a while loop and/or an event based programming flow
            //event based flow might be preferered as this allows better extensibility of the game
            this.turn()
        })
    }
}

module.exports = GameMaster;
