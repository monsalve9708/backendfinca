const {Client} = require('pg');
const {insertBooking,selectBookingByDates,selectAllBookings} = require('../util/querys');


const insertBookingRepository  = async (values) => {
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
const selectBookingByDateRepository  = async (values) => {
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
const selectAllBookingRepository = async () => {
    const client = new Client();
    client.connect();
    try {
        return await client.query(selectAllBookings)
            .then(data => data.rows);
    }catch (e){
        console.error(e);
    }finally {
        client.end();
    }
}

module.exports = {insertBookingRepository,selectBookingByDateRepository,selectAllBookingRepository};