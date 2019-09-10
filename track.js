class Track {

  constructor(id,name,duration,genres) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.heardTimes = 0;
    this.genres = genres;
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

  isGenres(genres) {
    return this.genres.some( genere => genres.includes(genere));
  }

  listened() {
    this.heardTimes++;
  }
   
}

module.exports = Track;