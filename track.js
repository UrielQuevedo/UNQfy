class Track {

  constructor(id,name,duration,genres) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.suscribePlayList = [];
    this.heardTimes = 0;
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

  deleteInfo() {
    this.suscribePlayList.forEach( playList => playList.removeTrack(this.id));
  }

  suscribeToPlayList(playList) {
    this.suscribeToPlayList.push(playList);
  }

  isGenres(genres) {
    return this.genres.some( genere => genres.includes(genere));
  }

  listened() {
    this.heardTimes++;
  }
   
}

module.exports = Track;