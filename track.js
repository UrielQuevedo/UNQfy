class Track {

  constructor(id,name,duration,genres,album) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.genres = genres;
    this.album = album;
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

  getAlbum() {
    return this.album;
  }

  isGenres(genres) {
    return this.genres.some( genere => genres.includes(genere));
  }
   
}

module.exports = Track;