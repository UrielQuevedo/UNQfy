const rp = require('request-promise');

const BASE_URL = 'http://api.musixmatch.com/ws/1.1';

class Track {

  constructor(id,name,duration,genres) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.suscribePlayList = [];
    this.heardTimes = 0;
    this.lyrics = null;
    if (genres === undefined) {
      this.genres = [];
    } else {
      this.genres = genres;
    }
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getDuration() {
    return this.duration;
  }

  getGenres() {
    return this.genres;
  }

  getHeardTime() {
    return this.heardTimes;
  }

  getAlbum() {
    return this.album;
  }

  getLyrics() {
    if(this.lyrics === null) {
      console.log("entro");
      return this.searchTrackByNameSinceMusixMatch();
    
    }
    console.log("no entro");
    return this.lyrics;
  }

  searchTrackByNameSinceMusixMatch() { 
    return rp.get(this.searchTrackByName(this.name))
      .then((response) => {
        const header = response.message.header;
        const body = response.message.body;
        if (header.status_code !== 200){
          throw new Error('status code != 200');
        }
        const track = body.track_list[0].track;
        const idTrack = track.track_id;
        this.lyrics = rp.get(this.lyricsTrackById(idTrack));
        return this.lyrics;
      })
      .catch((error) => console.log('There was an error', error));
  }

  searchTrackByName(trackName) {
    return {
      uri: BASE_URL + '/track.search',
      qs: {
        apikey: '89e71fc51d656bfe9ba3e79f4c0da45d',
        q_track: trackName,
      },
      json: true
    };
  }

  lyricsTrackById(idTrack) {
    return {
      uri: BASE_URL + '/track.lyrics.get',
      qs: {
        apikey: '89e71fc51d656bfe9ba3e79f4c0da45d',
        track_id: idTrack,
      },
      json: true
    };
  }

  deleteInfo() {
    this.suscribePlayList.forEach( playList => playList.removeTrack(this.id));
  }

  suscribeToPlayList(playList) {
    this.suscribePlayList.push(playList);
  }

  isGenres(genres) {
    return this.genres.some( genere => genres.includes(genere));
  }

  listened() {
    this.heardTimes++;
  }
   
}

module.exports = Track;