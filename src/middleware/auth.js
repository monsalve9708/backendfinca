const jwt = require("jsonwebtoken");

const config = process.env;
function roles(role){
    return (req, res, next) => {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"];

        if (!token) {
            return res.status(403).send("Token requerido para autenticacion");
        }
        try {
            const decoded = jwt.verify(token, config.TOKEN_KEY);
            req.user = decoded;
            if (!(req.user.type_user === role)) return res.status(401).send("El usuario no tiene permisos a este recurso");
        } catch (err) {
            return res.status(401).send("Token Invalido");
        }
        return next();
    };
}

module.exports = roles;