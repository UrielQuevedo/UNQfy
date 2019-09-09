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

  getTrack(trackId) {
    return this.tracks.find( track => 
      track.id === parseInt(trackId)
    );
  }

  ifContainsTrack(trackId) {
    return this.tracks.some( track => track.id === parseInt(trackId));
  }

  removeTrack(trackId) {
    this.tracks = this.tracks.filter( track => 
      track.id !== parseInt(trackId)
    );
  }

  getTracksByGenres(genres) {
    return this.tracks.filter( track => 
      track.isGenres(genres)  
    );
  }
}

module.exports = Album;