const rp = require('request-promise');

class NotifyNotification {

  notify(object) {}

  notifyAddAlbum(artist, albumName) {
    const options = {
      method: 'POST',
      uri: 'http://172.20.0.22:5001/api/notify',
      body: { 
        artistId: artist.id, 
        subject: `Se agrego un nuevo album para el artista ${artist.name}`,
        message: `Se ha agregado el album ${albumName} al artista ${artist.name}`
      },
      json: true 
    };
  
    rp(options)
      .then(() => console.log('Se envio con exito a la api notification'))
      .catch(() => console.log('No se envio a la api notification'));
  }

}

module.exports = NotifyNotification;