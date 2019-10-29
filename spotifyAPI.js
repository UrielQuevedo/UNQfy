const rp = require('request-promise');
const BASE_URL = 'https://api.spotify.com/v1/';

function searchArtist(artistName) {
  return generalGet(`search?q=${artistName}&type=artist`)
}

function getAlbumsById(id) {
  return generalGet(`artists/${id}/albums`);
}

function generalGet(path) {
  const options = {
    url: BASE_URL + path,
    headers: { Authorization: 'Bearer ' + 'BQAIX450mxlvbspKJtFiJy7d8I3Tz2CTFbp8O1KpE62Nzy4-uN25MLcRTNOWGe7q1t09eYhDNxEitAXuoAG2thlwSPfytEZ2GUNP8AIBiiJMGAegrSfSADOWGDkSXlnzUqtI5M13p-dS4hrb30V3l8vPmkI06f7tbgMl2U_o' },
    json: true,
  };
  return rp.get(options);
}

module.exports = {
  getAlbumsById,
  searchArtist
};