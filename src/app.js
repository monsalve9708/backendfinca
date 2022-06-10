require("dotenv").config();
const jwt=require('jsonwebtoken');
const express = require('express');
const login = require("./login/LoginRepository");
const bcrypt = require('bcrypt');
const app = express();
const userSchema = require("./model/user");
const CryptoJS = require("crypto-js");
const key = require("./util/key");

app.post("/login", async (req,res) => {
    try{
        let {user, password} = req.body;
        password = CryptoJS.AES.decrypt(password,key)
            .toString(CryptoJS.enc.Utf8);

       if (!(user && password)){
           return res.status(400).send("Hace falta algun campo");
        }
       const userDb = await login(user);
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
           return res.status(401).send({error:"Credenciales incorrectas"});
    }catch (err){
        console.log(err)
    }

});


module.exports = app;