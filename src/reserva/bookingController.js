const express = require('express');
const bookingController = express();
const {insertBookingService,selecAllBookingService} = require("./bookingService");

bookingController.post("/api/v1/insertreserva", async (req, res) => {
    try {
   return await insertBookingService(req.body) ? res.send({message: "La reserva se ha creado exitosamente"}):
        res.status(500).send();
    }catch (e){
       return res.status(400).json({message:e.message});
    }
});
bookingController.get("/api/v1/bookings",async (req,res) => {
    return res.send(await selecAllBookingService());
});

module.exports = bookingController;