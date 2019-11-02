class NonExistentArtistAlbumException extends Error {

    constructor(artistId) {
        super("El artista con el id " + artistId + " no existe");
        this.name = "nonExistentArtistAlbumException";
    }
    
}

module.exports = NonExistentArtistAlbumException;