const express = require('express');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const config = require('config');

const User = require('../models/user_model');

const ruta = express.Router();

ruta.post('/',(req,res)=>{
    User.findOne({clave : req.body.clave})
        .then(data=>{
            if(data){
                let passwordValidate = bcrypt.compareSync(req.body.password,data.password);
                if(!passwordValidate){
                    return res.json(400).json({
                        error : 'ok',
                        message : 'Usuario o Contraseña Incorrecta.'
                    })
                }

                //token
                let jwtoken = jsonwebtoken.sign({
                        user : {
                            _id     : data._id,
                            clave   : data.clave 
                        }
                    },config.get('configToken.SEED'),{
                        expiresIn : config.get('configToken.expiration')
                    });

                //Res
                res.json({
                    user : data,
                    jwtoken
                })
            }else{
                res.status(400).json({
                    error : 'ok',
                    message : "Usuario o Contraseña Incorrectos. Data"
                })
            }
        })
        .catch(err=>{
            res.status(400).json({
                error : 'ok',
                message : 'Server Error. ' + err
            })
        });
});

module.exports = ruta;