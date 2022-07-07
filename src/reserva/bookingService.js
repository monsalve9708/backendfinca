const {selectBookingByDateRepository,insertBookingRepository,selectAllBookingRepository, deleteBookingRepository,
    updateBookingRepository, selectBookingByDateUpdateRepository, getHolidaysRepository
} = require("./bookingRepository");


const insertBookingService = async (booking) => {
    const holiday = await getHolidaysRepository([booking.checkin,booking.checkout]);
    if (holiday) throw new Error(`Recuerda: días festivos no se es permitido la reservación de la finca`);
    const bookings = await selectBookingByDateRepository([booking.checkin, booking.checkout]);
    if(bookings) throw new Error(`El usuario ${bookings.usuario} ya tiene una reservar en el rango de fechas ${bookings.fechainicial.toLocaleDateString("es-CO")} - ${bookings.fechafin.toLocaleDateString("es-CO")}`);
    return await insertBookingRepository([booking.checkin,booking.checkout,booking.user,booking.amountPeople]);

}
const updateBookingService = async (booking) => {
    const bookings = await selectBookingByDateUpdateRepository([booking.checkin, booking.checkout,booking.id]);
    if(bookings) throw new Error(`El usuario ${bookings.usuario} ya tiene una reservar en el rango de fechas ${bookings.fechainicial.toLocaleDateString("es-CO")} - ${bookings.fechafin.toLocaleDateString("es-CO")}`);
    return await updateBookingRepository([booking.checkin,booking.checkout,booking.amountPeople,booking.id]);

}
const selecAllBookingService = async () => {
    return await selectAllBookingRepository();
}
const deleteBookingService = async (id) => {
    return await deleteBookingRepository(id);
}
module.exports = {insertBookingService,selecAllBookingService,
    deleteBookingService,updateBookingService};