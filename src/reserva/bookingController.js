const express = require('express');
const bookingController = express();
const auth = require('../middleware/auth');
const {insertBookingService,selecAllBookingService,
    deleteBookingService, updateBookingService} = require("./bookingService");

bookingController.post("/api/v1/insertreserva",auth(['admin','user']), async (req, res) => {
    try {
   return await insertBookingService(req.body) ? res.send({message: "La reserva se ha creado exitosamente"}):
        res.status(500).send();
    }catch (e){
       return res.status(400).json({message:e.message});
    }
});
bookingController.patch("/api/v1/updatereserva",auth(['admin','user']), async (req, res) => {
    try {
        return await updateBookingService(req.body) ? res.send({message: "La reserva se ha actualizado exitosamente"}):
            res.status(500).send();
    }catch (e){
        return res.status(400).json({message:e.message});
    }
});
bookingController.get("/api/v1/bookings",auth(['admin','user']),async (req,res) => {
    return res.send(await selecAllBookingService());
});
bookingController.delete("/api/v1/deletereserva/:id",auth(['admin','user']), async (req,res) =>{
    try{
        await deleteBookingService(req.params.id);
        return res.send();
    }catch (e){
        console.error(e);
        return res.status(400);
    }
});

module.exports = bookingController;