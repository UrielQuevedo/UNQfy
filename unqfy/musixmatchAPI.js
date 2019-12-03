const BASE_URL = 'http://api.musixmatch.com/ws/1.1';

function searchTrackByName(trackName) {
  return {
    uri: BASE_URL + '/track.search',
    qs: {
      apikey: '89e71fc51d656bfe9ba3e79f4c0da45d',
      q_track: trackName,
    },
    json: true
  };
}

function lyricsTrackById(idTrack) {
  return {
    uri: BASE_URL + '/track.lyrics.get',
    qs: {
      apikey: '89e71fc51d656bfe9ba3e79f4c0da45d',
      track_id: idTrack,
    },
    json: true
  };
}

module.exports = {
  searchTrackByName,
  lyricsTrackById
};