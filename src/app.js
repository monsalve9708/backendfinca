require("dotenv").config();
require("./util/databaseconection").connect()
const express = require("express");

const app = express();

app.use(express.json());


module.exports = app;