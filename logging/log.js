const Activate = require('./activate');
const Desactivate = require('./desactivate');

class Log {

    constructor() {
        this.state = new Activate(this);
        this.events = [];
    }

    addEvent(event) {
        this.events.push(event);
    }
    
    saveEventLocal(event) {
        this.state.saveEventLocal(event);
    }

    saveEventLoggly(event) {
        this.state.saveEventLoggly(event);
    }

}

module.exports = Log;

  