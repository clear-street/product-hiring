const Board = require('./board')
const Island = require('./island')
const CargoShip = require('./cargoShip');
const PirateShip = require('./pirateShip');
const { ISLAND_COUNT, CARGO_COUNT, DO_CARGO_SHIPS_MOVE, DEBUG }  = require('./const');
const { getRandomInt, randomMoney, randomCargo } = require('./utils');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class GameMaster {
    constructor() {
        this.board = new Board();
        this.initializeNPCPieces();
        this.currentPlayerTurn = 1;        
    };
    startGame = async () =>
    {
        //take number of players from user(s)
        await this.initializeGameParamatersFromUser();
        //start game
        await this.mainGameLoop();
    }
    //main game loop uses readline and eventing
    mainGameLoop(){

        return new Promise((resolve, reject) =>{                    
            rl.setPrompt(`${this.board.board.pirates[this.currentPlayerTurn-1].name}'s turn.  Move (N)orth, (S)outh, (E)ast, (W)est? `);
            rl.prompt();
            rl.on('line', (input) => {
                //process move
                this.doMove(this.validatePlayerMove(input))
                //function increments next player. also provides a place to handle interturn events
                this.nextPlayerPreAction();
                //on to the next player
                rl.setPrompt(`${this.board.board.pirates[this.currentPlayerTurn-1].name}'s turn.  Move (N)orth, (S)outh, (E)ast, (W)est? `);
                this.board.display();
                rl.prompt();
            });
        });
    }
    //handles player action event and end of round events 
    doMove(move)
    {
        var pirateBoat = this.board.board.pirates[this.currentPlayerTurn-1]
        //console.log(`Current player ${this.currentPlayerTurn} moving.`);
        this.moveShip(move, pirateBoat);
        this.processCollision(pirateBoat);
        if(this.evaluateWinConditions())
        {
            this.winGame();
        }
        //end of round
        if(this.board.board.pirates.length == this.currentPlayerTurn-1)
        {            
            if(DO_CARGO_SHIPS_MOVE)
            {
                this.moveCargoShips();
            }
        }
        
    }
    nextPlayerPreAction()
    {
        this.currentPlayerTurn = (this.currentPlayerTurn ) % this.board.board.pirates.length + 1;
        //console.log(`Next player ${this.currentPlayerTurn} up.`);
    }
    moveShip(move, ship){
        this.board.movePiece(move, ship);
    }
    processCollision(pirateBoat){
        var didWePunderACargoShip = this.board.getCargoShipsAtPosition(pirateBoat.position);
        if(didWePunderACargoShip)
        {
            console.log(`Argh! Comence the plunder of ${didWePunderACargoShip.name}'s ${didWePunderACargoShip.cargo} cargo and ${didWePunderACargoShip.money} money.`);
            pirateBoat.plunder(didWePunderACargoShip);
        }
        var didWeCrashOnAnIsland = this.board.getIslandAtPosition(pirateBoat.position);
        if(didWeCrashOnAnIsland)
        {
            console.log(`Land ho! ${pirateBoat.name} has landed on ${didWeCrashOnAnIsland.name}!`);
        }
    }
    evaluateWinConditions(){
        return false;
    }
    winGame(){

    }
    moveCargoShips()
    {

    }
    validatePlayerMove(input)    {
        //validation goes here
        return input;  
    }
    validateNumeric(input){
        //validation goes here
        return input;
    }
    initializeGameParamatersFromUser() {
        return new Promise((resolve, reject) =>{
            rl.question("How many players? ", (answer) =>{
                var players = this.validateNumeric(answer); 
                this.players = players;
                this.initializePCPieces();             
                this.debugOut();                
                resolve();   
            })
        });
    }
    initializeNPCPieces(){
        //players
        for(var playerNum = 1; playerNum <= this.players; playerNum++)
        {
            this.board.initPlaceItemOnBoardRandomly(new PirateShip({name: `Player ${playerNum}`}));
        }
        for(var islandNum = 1; islandNum <= ISLAND_COUNT; islandNum++)
        {
            this.board.initPlaceItemOnBoardRandomly(new Island(`Island ${islandNum}`));
        }
        for(var cargoNum = 1; cargoNum <= CARGO_COUNT; cargoNum++)
        {
            this.board.initPlaceItemOnBoardRandomly(new CargoShip({startingCargo: randomCargo(), name: `CargoShip ${cargoNum}`, startingMoney: randomMoney()}));
        }
        this.currentPlayerTurn = 1;
    }
    initializePCPieces(){
        //players
        for(var playerNum = 1; playerNum <= this.players; playerNum++)
        {
            this.board.initPlaceItemOnBoardRandomly(new PirateShip({name: `Player ${playerNum}`}));
        }
        this.currentPlayerTurn = 1;        
    }
    debugOut()
    {
        if(DEBUG)
        {
            console.log("my board: %o", this.board);
            console.log("pieces are on positions: %o", this.board.getOccupiedPositions());
        }
    }
}

module.exports = GameMaster;
