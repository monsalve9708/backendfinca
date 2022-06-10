const express = require("express");
const app = require("./src/app");
const reservaController = require("./src/reserva/bookingController");
const cors = require("cors");

const server = express();
server.use(express.json());
server.use(cors());
server.use(app);
server.use(reservaController);
const { API_PORT } = process.env;
const port = API_PORT || 3000;

// server listening
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});