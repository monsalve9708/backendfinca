const loginquery = 'SELECT usuario, contrasena, tipousuario FROM usuario WHERE usuario = $1';

module.exports = loginquery;