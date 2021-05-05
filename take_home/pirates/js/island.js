const { randomCoordinates } = require('./utils')

class Island {
    constructor() {
        //NOTE: inconsistent use of function
        // other calls reference const coordinates = randomCoordinates();
        const { x, y } = randomCoordinates();
        this.x = x;
        this.y = y;
    }
}

module.exports = Island;
