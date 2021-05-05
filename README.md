# product-hiring
## Notes from Clear Street
> There is a 1000x1000 grid that makes up the space.
>
>  A ship takes up 1 x,y position, it can move either vertically or horizontally (but not diagonally).
>
>  There are islands and ships. They must avoid islands.
>
>  If a pirate ship overlaps with another ship, it takes its cargo and money and adds it to its own.

## Bugs and Syntax Issues
### package.json
BUG:
runtime error:
Warning: require() of ES modules is not supported.
require() of C:\git\product-hiring\take_home\pirates\js\main.js is an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which defines all .js files in that package scope as ES modules.
Instead rename main.js to end in .cjs, change the requiring code to use import(), or remove "type": "module" from C:\git\product-hiring\take_home\pirates\js\package.json.

**removed "type": "module" as this is not being exported as module.

### utils.js
BUG:
getRandomInt () not inclusive of min/max
should be Math.floor(Math.random() * (max - min) + min) + min

BUG:
exports.randomCoordinates is limited to a 100^2 square but the board is 1000^2
size of board should be in a const somewhere
###  gameMaster.js
BUG: 
should be 
    if (direction === '1') {
        this.board.moveNorth();
### board.js


## Architecture Issues/Notes/Suggestions
### package-lock.json
NOTE:
initial repo used public registry.npmjs.org.  Depending on policy, you may want to switch that to the internal node repo.
### main.js
NOTE:
entry point for application is a mess.  There should be top level orchestration happening here but it is delegated to the GameMaster.  Function names 
are vague and confusing.
###  gameMaster.js
NOTE:
Tight coupling of input and output.  How the application chooses to input and output should be delegated to an object

NOTE:
constructor()  
-delegates state management to Board Object and is bad design. state should be floated up to Game Master  

NOTE:
turn() 
-why are directions numbers? Seems abitrary and confusing.  Should use letters or capture the arrow key in stdin
-ex: this.board.moveSouth(); //confusing code organization.  the board is not doing the moving.
-bad defaulting.  Why move west if input is not a number? Should be sharply defined.
-Instance checking is a bit clunky.
-Event pump mechanism is trash.  Recursive call will blow up the stack and leak memory. Use a loop or events.

how does the game end?

Issues
-game pump needs rework

-

-console painting is a but clunky/slow when run on the terminal
-not playable/  needs board size parameterization or something better

-board size is not centralized and there are various issues around that

-state is scattered

removed     "type": "module", from package.json