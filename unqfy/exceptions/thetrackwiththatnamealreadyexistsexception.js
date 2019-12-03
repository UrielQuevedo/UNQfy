class TheTrackWithThatNameAlreadyExistsException extends Error {

    constructor(trackName) {
        super("El track con el nombre " + trackName + " ya existe");
        this.name = "TheTrackWithThatNameAlreadyExistsException";
    }

}

module.exports = TheTrackWithThatNameAlreadyExistsException;