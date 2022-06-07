const userSchema = {
    iduser: {type: Number, default: null},
    user: {type: String, default: null},
    password: {type: String, default: null},
    typeuser: {type: String, default: null},
    token: {type: String, default: null}
}

module.exports = userSchema;