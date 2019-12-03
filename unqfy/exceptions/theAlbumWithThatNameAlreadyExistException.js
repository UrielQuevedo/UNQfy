class TheAlbumWithThatNameAlreadyExistException extends Error {

    constructor(name) {
        super("Ya existe el album con el nombre: " + name);
        this.name = "theAlbumWithThatNameAlreadyExistException";
    }
}

module.exports = TheAlbumWithThatNameAlreadyExistException;