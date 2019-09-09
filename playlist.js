class Playlist {
    
    constructor(name) {
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