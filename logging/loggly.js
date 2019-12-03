const winston  = require('winston');
const {Loggly} = require('winston-loggly-bulk');

function addLoggly() {
    winston.add(new Loggly({
        token: "2cfa1da5-eaf3-4a82-a504-fae09443b297",
        subdomain: "danivillegas",
        tags: ["Winston-NodeJS"],
        json: true
    }));
}

function addEvent(event) {
    winston.log(event.levelMessage, event.message);
}

module.exports = {
    addLoggly,
    addEvent
};