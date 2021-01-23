const { randomCoordinates } = require('./utils')

class Island {
    constructor() {
        const { x, y } = randomCoordinates();
        this.x = x;
        this.y = y;
    }
}

module.exports = Island;
