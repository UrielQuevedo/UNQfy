const rp = require('request-promise');

class NotifyLog {

    notify(object) {

        const options = {
            method: 'POST',
            uri: 'http://localhost:8081/api/log',
            body: object,
            json: true 
        };

        rp(options)
        .then(() => console.log('Se envio con exito a la api log'))
        .catch(() => console.log('No se envio a la api log'))
    }

}

module.exports = NotifyLog;