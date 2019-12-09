const rp = require('request-promise');

class NotifyLog {

  notify(object) {
    const options = {
      method: 'POST',
      uri: 'http://172.20.0.24:5003/api',
      body: object,
      json: true 
    };

    rp(options)
      .then(() => console.log('Se envio con exito a la api log'))
      .catch(() => console.log('No se envio a la api log'));
  }

  notifyAddAlbum(artist, albumName) {
    this.notify({ message: 'Se agrego el album ' + albumName, levelMessage: 'info'});
  }

}

module.exports = NotifyLog;