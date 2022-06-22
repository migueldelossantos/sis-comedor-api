const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user_model');

const ruta = express.Router();

ruta.post('/',(req,res)=>{

    User.findOne({clave:req.body.clave},(error,user)=>{
        userConsult = user;
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

    /*if(!userConsult){
        
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
    }*/
})

async function createUser(body){
    let user = new User({
        clave       : body.clave,
        password    : bcrypt.hashSync( body.password, 10)
    });
    return await user.save();
}

module.exports = ruta;