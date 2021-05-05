const PirateShip = require('./pirateShip');
const CargoShip = require('./cargoShip');
const Island = require('./island');
const { BOARD_SIZE, ISLAND_COUNT, CARGO_COUNT }  = require('./const');
const { getRandomInt } = require('./utils');
const _ = require('lodash');

class Board {
    constructor() {
        this.board = {
            pirates: [],
            islands: [],
            cargoShips: [],
            size: BOARD_SIZE,
        }
    }
    //using a flat array for position tracking makes things a bit easier and exensible or at least that is the claim
    //x and y is confusing so Lat is up down, Long is left right.  This is starting at 1,1 on top left corner.
    getLatLong(pos)
    {
        return {Lat: Math.floor((pos-1) / BOARD_SIZE)+1, Long: ((pos-1) % BOARD_SIZE) +1 }
    }
    getPOS(lat, long)
    {
        return (lat*BOARD_SIZE) + long + 1;
    }
    handleBorderHit()
    {
        console.log("Yarr! Thar be dragons!");//hit edge of board.
    }
    movePiece(move, piece)
    {
        var toMove = 0;
        switch(move.toLowerCase()) {
            case 'n':
                toMove = piece.position-BOARD_SIZE;
                if (toMove <= 0)
                {
                    this.handleBorderHit();
                }else{
                    piece.position = toMove;
                }                
              break;
            case 's':
                toMove = piece.position+BOARD_SIZE;
                if (toMove > BOARD_SIZE*BOARD_SIZE)
                {
                    this.handleBorderHit();
                }else{
                    piece.position = toMove;
                }
                break;
            case 'w':
                toMove = piece.position-1;
                if (piece.position % BOARD_SIZE == 1)
                {
                    this.handleBorderHit();
                }else{
                    piece.position = toMove;
                }
                break;
            case 'e':
                toMove = piece.position+1;
                if (piece.position % BOARD_SIZE == 0)
                {
                    this.handleBorderHit();
                }else{
                    piece.position = toMove;
                }
                break;
            default:
              // code block
          }
          console.log("board:  %e", this.board, this.getLatLong(piece.position));

    }
    getOccupiedPositions()
    {
        //not great but on the brightside there is room for improvement
        return _.union(_.map(this.board.pirates, 'position'), _.map(this.board.islands, 'position'), _.map(this.board.cargoShips, 'position')); 
    }
    getIslandAtPosition(pos)
    {
        //you could make these faster with lookups indexed by position
        return _.find(this.board.islands, function(island){ return island.position==pos;});
    }
    getCargoShipsAtPosition(pos)
    {
        //you could make these faster with lookups indexed by position
        return _.find(this.board.cargoShips, function(ship){ return ship.position==pos;});
    }
    initPlaceItemOnBoardRandomly(p)
    {   
        //this code can be improved as lodash/underscore is slow     
        var occupiedPositions = this.getOccupiedPositions();
        var unoccupiedPositions = _.difference(_.range(1, BOARD_SIZE*BOARD_SIZE), occupiedPositions);
        var unoccupiedRandoPositionIndex = getRandomInt(0, unoccupiedPositions.length-1);
        var unoccupiedPosition = unoccupiedPositions[unoccupiedRandoPositionIndex];
        p.position = unoccupiedPosition;
        //I dislike this and criticized it in the old code.  Stones/glass houses etc.
        switch (true) {
            case p instanceof PirateShip: 
                this.board.pirates.push(p);
                break;        
            case p instanceof Island: 
                this.board.islands.push(p);
                break;
            case p instanceof CargoShip: 
                this.board.cargoShips.push(p);
                break;        
            default:
        } 
    }

    display() {
           //TBD 
    }
}

module.exports = Board;
