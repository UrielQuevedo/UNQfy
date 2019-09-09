class Album {

  constructor(id,name,year,artist) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.artist = artist;
    this.tracks = [];
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getYear() {
    return this.year;
  }

  getArtist() {
    return this.artist;
  }

  addTrack(track) {
    this.tracks.push(track);
  }

}

module.exports = Album;