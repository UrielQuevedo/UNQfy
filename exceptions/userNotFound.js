class UserNotFound extends Error {

    constructor(name) {
        super("No se encontro el usuario con nombre ",name);
        this.name = "userNotFound";
    }
}

module.exports = UserNotFound;