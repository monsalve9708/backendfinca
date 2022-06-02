const loginquery = 'SELECT usuario, contrasena, tipousuario FROM usuario WHERE usuario = ?';

module.exports = loginquery;