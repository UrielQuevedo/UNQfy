const util = require('util'); 
const fs = require('fs');
const writeFilePromise = util.promisify(fs.writeFile);
const readFilePromise = util.promisify(fs.readFile);
const rp = require('request-promise');
var winston  = require('winston');
var {Loggly} = require('winston-loggly-bulk');

class Activate {

    constructor(log) {
        this.log = log;
    }

    saveEventLocal(event) {
        this.log.addEvent(event);
        const promise = readFilePromise('data.txt', 'utf-8')
        promise
        .then((data) => {
            const result = data + '\n' + 'MENSAJE: ' + event.message + ' NIVEL: ' + event.levelMessage;
            console.log(result);
            return writeFilePromise('data.txt', result);
        })
        .catch((error) => {
            console.log(error);
        }) 
    } 

    saveEventLoggly(event) {

        winston.add(new Loggly({
            token: "2cfa1da5-eaf3-4a82-a504-fae09443b297",
            subdomain: "danivillegas",
            tags: ["Winston-NodeJS"],
            json: true
        }));
        
        winston.log(event.levelMessage, event.message);
        
      }

}

module.exports = Activate; 