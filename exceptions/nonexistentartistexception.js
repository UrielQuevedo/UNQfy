class NonExistentsArtistsException extends Error {

    constructor(id) {
        super("No existe el artista con id: " + id);
        this.name = "NonExistentArtistException";
    }
}

module.exports = NonExistentsArtistsException;