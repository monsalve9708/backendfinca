const loginQuery = 'SELECT usuario, contrasena, tipousuario FROM usuario WHERE usuario = $1';
const insertBooking = 'INSERT INTO reservas(fechainicial,fechafin,usuario,numpersona,isactiv) values($1,$2,$3,$4,1)';
const selectBookingByDates = 'SELECT id, fechainicial,fechafin,usuario,numpersona, isactiv FROM reservas WHERE ((fechainicial BETWEEN $1 and $2) or (fechafin BETWEEN $1 and $2)) and (isactiv = 1)';
const selectBookingByDatesUpdate = 'SELECT id, fechainicial,fechafin,usuario,numpersona, isactiv FROM reservas WHERE (((fechainicial BETWEEN $1 and $2) or (fechafin BETWEEN $1 and $2)) and (isactiv = 1)) and id != $3';
const selectAllBookings = 'SELECT id, fechainicial,fechafin,usuario,numpersona FROM reservas WHERE fechainicial > NOW() and isactiv = 1 ORDER BY fechainicial';
const deleteBookings = 'UPDATE reservas SET isactiv = 0 WHERE id = $1';
const updateBookings = 'UPDATE reservas SET fechainicial = $1, fechafin = $2, numpersona = $3 WHERE id = $4';
const getHolidays = 'SELECT fecha FROM festivo where fecha between $1 AND  $2';

module.exports = {loginQuery,insertBooking,
    selectBookingByDates,selectAllBookings,
    deleteBookings, updateBookings,
    selectBookingByDatesUpdate, getHolidays};