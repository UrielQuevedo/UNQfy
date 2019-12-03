class IdGenerator {

    constructor() {
        this.lastId = 0;
    }

    generateId() {
        return this.lastId++;
    }
}

module.exports = IdGenerator;