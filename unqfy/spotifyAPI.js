const rp = require('request-promise');
const BASE_URL = 'https://api.spotify.com/v1/';
const fs = require('fs');
const filename = 'spotifyCreds.json';
const util = require('util');
const readFile = util.promisify(fs.readFile);

function searchArtist(artistName) {
  return generalGet(`search?q=${artistName}&type=artist`)
}

function getAlbumsById(id) {
  return generalGet(`artists/${id}/albums`);
}

function generalGet(path) {
  return readFile(filename)
    .then((data) => {
      const options = {
        url: BASE_URL + path,
        headers: { Authorization: 'Bearer ' + JSON.parse(data).access_token },
        json: true,
      };
      return rp.get(options);
    })
    .catch((error) => console.log('There was an error', error));
}

module.exports = {
  getAlbumsById,
  searchArtist
};