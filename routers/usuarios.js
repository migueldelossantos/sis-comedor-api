const express = require('express');
const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario_model');

const ruta = express.Router();

ruta.post('/',(req,res)=>{

    Usuario.findOne({clave:req.body.correo},(error,user)=>{
        if(error){
            return res.status(400).json({error:"Server Error!"});
        }
        if(user){
            return res.status(400).json({
                error : "Ya existe un usuario registrado con esa Clave"
            })
        }else{
            //Da de Alta Usuario
            let resultado = createUser(req.body);
            resultado.then(us=>{
                res.json({
                    user : us
                })
            }).catch(err=>{
                res.status(400).json({
                    error : err
                })
            });
        }
    });
    
})

async function createUser(body){
    let user = new Usuario({
        correo      : body.correo,
        password    : bcrypt.hashSync( body.password, 10),
        rolId       : body.rolId,
        empleadoId  : body.empleadoId
    });
    return await user.save();
}

module.exports = ruta;