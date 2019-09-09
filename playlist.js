class Playlist {
    
  constructor(name, id) {
    this.id = id;
    this.name = name;
    this.tracks = [];
  }

  getName() {
    return this.name;
  }

  addTrack(track) {
    this.tracks.push(track);
  }

}

module.exports = Playlist;