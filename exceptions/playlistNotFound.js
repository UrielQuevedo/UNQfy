class PlaylistNotFound extends Error {

    constructor(id) {
        super("No se encontro la playlist con el id: " + id);
        this.name = "playlistNotFound";
    }
}

module.exports = PlaylistNotFound;