var winston  = require('winston');
var {Loggly} = require('winston-loggly-bulk');

function addAndWriteEvent(event) {

    winston.add(new Loggly({
        token: "2cfa1da5-eaf3-4a82-a504-fae09443b297",
        subdomain: "danivillegas",
        tags: ["Winston-NodeJS"],
        json: true
    }));

    console.log(event);
    winston.log(event.levelMessage, event.message);

}

module.exports = {
    addAndWriteEvent
};
