const {selectBookingByDateRepository,insertBookingRepository,selectAllBookingRepository} = require("./bookingRepository");


const insertBookingService = async (booking) => {
    const bookings = await selectBookingByDateRepository([booking.fechaini, booking.fechafin]);
    if(bookings) throw new Error(`El usuario ${bookings.usuario} ya tiene una reservar en el rango de fechas ${bookings.fechainicial.toLocaleDateString("es-CO")} - ${bookings.fechafin.toLocaleDateString("es-CO")}`);
     return await insertBookingRepository([booking.fechaini,booking.fechafin,booking.user,booking.numperson])

}
const selecAllBookingService = async () => {
    return await selectAllBookingRepository();
}
module.exports = {insertBookingService,selecAllBookingService};