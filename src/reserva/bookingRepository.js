const {Client} = require('pg');
const {insertBooking,selectBookingByDates,
    selectAllBookings, deleteBookings, updateBookings, selectBookingByDatesUpdate, getHolidays
} = require('../util/querys');


const insertBookingRepository  = async values => {
    const client = new Client();
    client.connect();
    try {
        await client.query(insertBooking, values);
        return true;
    }catch (e){
        console.error(e);
        return false;
    }finally {
        client.end();
    }
}
const updateBookingRepository  = async values => {
    const client = new Client();
    client.connect();
    try {
        await client.query(updateBookings, values);
        return true;
    }catch (e){
        console.error(e);
        return false;
    }finally {
        client.end();
    }
}
const selectBookingByDateRepository  = async values=> {
    const client = new Client();
    client.connect();
    try {
        return await client.query(selectBookingByDates, values)
            .then(data => data.rows[0]);
    }catch (e){
        console.error(e);
    }finally {
        client.end();
    }
}
const selectBookingByDateUpdateRepository  = async values => {
    const client = new Client();
    client.connect();
    try {
        return await client.query(selectBookingByDatesUpdate, values)
            .then(data => data.rows[0]);
    }catch (e){
        console.error(e);
    }finally {
        client.end();
    }
}
const selectAllBookingRepository = async () => {
    const client = new Client();
    client.connect();
    try {
        return await client.query(selectAllBookings)
            .then(data => data.rows.map(data => {
                data.checkin = data.fechainicial;
                data.checkout = data.fechafin;
                data.fechainicial = data.fechainicial.toLocaleDateString("es-CO")
                data.fechafin = data.fechafin.toLocaleDateString("es-CO")
                return data;
                })
            );
    }catch (e){
        console.error(e);
    }finally {
        client.end();
    }
}
const deleteBookingRepository  = async values => {
    const client = new Client();
    client.connect();
    try {
        await client.query(deleteBookings, [values]);
        return true;
    }catch (e){
        console.error(e);
        return false;
    }finally {
        client.end();
    }
}
const getHolidaysRepository = async values => {
    const client = new Client();
    client.connect();
    try {
        return await client.query(getHolidays, values)
            .then(data => data.rows[0]);
    }catch (e){
        console.error(e);
    }finally {
        client.end();
    }
}
module.exports = {insertBookingRepository,selectBookingByDateRepository,
    selectAllBookingRepository,deleteBookingRepository,updateBookingRepository,
    selectBookingByDateUpdateRepository,getHolidaysRepository};