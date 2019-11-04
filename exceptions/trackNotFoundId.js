class TrackNotFoundId extends Error {

    constructor(id) {
        super("No se encontro el track con el id: " + id);
        this.name = "trackNotFoundId";
    }
}

module.exports = TrackNotFoundId;