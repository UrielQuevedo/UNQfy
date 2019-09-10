class Playlist {
    
  constructor(id, name, genresToInclude, maxDuration) {
    this.id = id;
    this.name = name;
    this.tracks = [];
    this.genresToInclude = genresToInclude;
    this.maxDuration = maxDuration;
  }

  getName() {
    return this.name;
  }

  getGenresToInclude() {
    return this.getGenresToInclude;
  }

  duration() {
    let duration = 0;
    this.tracks.forEach( track => duration += track.duration);
    return duration;
  }

  addTrack(track) {
    if(this.duration() + track.duration <= this.maxDuration) {
      this.tracks.push(track);
    }
  }

  // retorna true si aTrack se encuentra en la playlist
  hasTrack(aTrack) {
    return this.tracks.includes(aTrack);
  }

}

module.exports = Playlist;