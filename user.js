class User {

  constructor(id,name) {
    this.id = id;
    this.name = name;
    this.tracksHeard = [];
  }
  
  getId() {
    return this.id;
  }
  
  getName() {
    return this.name;
  }
  
  listenTrack(track) {
    this.tracksHeard.push(track);
  }

  getTracksHeard() {
    const tracksNoRepeat = new Set(this.tracksHeard);
    return Array.from(tracksNoRepeat);
  }  

  manyTimesListenTrack(trackId) {
    return this.tracksHeard.reduce((total,track) => (track.id === parseInt(trackId) ? total+1 : total), 0);
  }
}
  
module.exports = User;