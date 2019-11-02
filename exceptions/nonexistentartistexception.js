class NonExistentsArtistsException extends Error {

    constructor(id) {
        super("No existe el artista con id: " + id);
        this.name = "nonExistentArtistException";
    }
}

module.exports = NonExistentsArtistsException;