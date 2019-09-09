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

  getDuration() {
    return this.maxDuration;
  }

  addTrack(track) {
    this.tracks.push(track);
  }

  // retorna true si aTrack se encuentra en la playlist
  hasTrack(aTrack) {
    return this.tracks.find(track => track.name == aTrack.name);
  }

}

module.exports = Playlist;