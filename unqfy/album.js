const TheTrackWithThatNameAlreadyExistsException = require('./exceptions/thetrackwiththatnamealreadyexistsexception');

class Album {

  constructor(id,name,year) {
    this.id = id;
    this.name = name;
    this.tracks = [];
    this.year = year;
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

  addTrack(aTrack) {
    const track = this.tracks.find(track => track.name === aTrack.name);
    if(track !== undefined) {
      throw new TheTrackWithThatNameAlreadyExistsException(aTrack.name);
    }
    this.tracks.push(aTrack);
  }

  getTrack(trackId) {
    return this.tracks.find( track => 
      track.id === trackId
    );
  }

  ifContainsTrack(trackId) {
    return this.tracks.some( track => track.id === trackId);
  } 

  removeTrack(trackId) {
    this.tracks = this.tracks.filter( track => 
      track.id !== trackId
    );
  }

  deleteInfo() {
    this.tracks.forEach(track => track.deleteInfo());
  }

  getTracksByGenres(genres) {
    return this.tracks.filter( track => 
      track.isGenres(genres)  
    );
  }
}

module.exports = Album;