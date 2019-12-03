class TrackNotFound extends Error {

    constructor(name) {
        super("No se encontro el track con el nombre: " + name);
        this.name = "TrackNotFound";
    }
}

module.exports = TrackNotFound;