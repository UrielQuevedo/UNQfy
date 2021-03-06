class NonExistentAlbumException extends Error {

    constructor(id) {
        super("No existe el album con id: " + id);
        this.name = "nonExistentAlbumException";
    }
}

module.exports = NonExistentAlbumException;