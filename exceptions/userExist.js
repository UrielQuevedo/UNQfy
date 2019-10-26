class UserExist extends Error {

    constructor(name) {
        super("El usuario con el nombre " + name + " ya existe");
        this.name = "TrackNotFound";
    }
}

module.exports = UserExist;