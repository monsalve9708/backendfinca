const loginQuery = 'SELECT usuario, contrasena, tipousuario FROM usuario WHERE usuario = $1';
const insertBooking = 'INSERT INTO reservas(fechainicial,fechafin,usuario,numpersona,isactiv) values($1,$2,$3,$4,1)';
const selectBookingByDates = 'SELECT id, fechainicial,fechafin,usuario,numpersona FROM reservas WHERE (fechainicial BETWEEN $1 and $2) or (fechafin BETWEEN $1 and $2) and isactiv = 1';
const selectAllBookings = 'SELECT id, fechainicial,fechafin,usuario,numpersona FROM reservas WHERE fechainicial > NOW() and isactiv = 1';

module.exports = {loginQuery,insertBooking,selectBookingByDates,selectAllBookings};