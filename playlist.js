class Playlist {
    
  constructor(id, name, genresToInclude, maxDuration) {
    this.id = id;
    this.name = name;
    this.genresToInclude = genresToInclude;
    this.tracks = [];
    this.maxDuration = maxDuration;
  }

  getName() {
    return this.name;
  }

  getGenresToInclude() {
    return this.getGenresToInclude;
  }

  duration() {
    return this.maxDuration;
  }

  addTrack(track) {
    this.tracks.push(track);
  }

  addTracks(tracks) {
    this.tracks.concat(tracks);
  }

  // retorna true si aTrack se encuentra en la playlist
  hasTrack(aTrack) {
    return this.tracks.includes(aTrack);
  }

}

module.exports = Playlist;