class UserNotFound extends Error {

    constructor(name) {
        super("No se encontro el usuario con nombre ",name);
        this.name = "UserNotFound";
    }
}

module.exports = UserNotFound;