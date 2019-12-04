const util = require('util'); 
const fs = require('fs');
const writeFilePromise = util.promisify(fs.writeFile);
const readFilePromise = util.promisify(fs.readFile);
const loggly  = require('./loggly');

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
       loggly.addEvent(event);
      }

}

module.exports = Activate; 