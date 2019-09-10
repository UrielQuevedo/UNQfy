class TheArtistWithThatNameAlreadyExistsExceptions extends Error {

    constructor(artistName) {
        super("El artista con el nombre " + artistName + " ya existe");
        this.name = "TheArtistWithThatNameAlreadyExistsExceptions";
    }
    
}

module.exports = TheArtistWithThatNameAlreadyExistsExceptions;