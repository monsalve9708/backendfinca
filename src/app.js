console.clear();
require("dotenv").config();
const jwt=require('jsonwebtoken');
const express = require('express');
const login = require("./login/LoginRepository");
const bcrypt = require('bcrypt');
const app = express();
const userSchema = require("./model/user");
const auth= require("./middleware/auth");

app.post("/hello",auth("admin"),(req,res) => {
    res.send("Hello");
});
app.post("/login", async (req,res) => {
    try{
        const {user, password} = req.body;

       if (!(user && password)){
           return res.status(400).send("Hace falta algun campo");
        }
       let userDb;
        await login(user).then(data => {
            userDb = data.rows[0];
        }, err => {console.error(err)});
        if (userDb && await bcrypt.compare(password, userDb.contrasena) ){

            const token = jwt.sign(
                { user_id: userDb.idusuario, user, type_user: userDb.tipousuario },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            // save user token
            userSchema.token = token;
            userSchema.iduser = userDb.idusuario;
            userSchema.user = userDb.usuario;
            userSchema.typeuser = userDb.tipousuario;

           return res.status(200).json(userSchema);
        }
           return res.status(401).send("Credenciales incorrectas");
    }catch (err){
        console.log(err)
    }

});
app.use(express.json());


module.exports = app;