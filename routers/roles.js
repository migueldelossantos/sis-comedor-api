const express = require('express');

const Rol = require('../models/rol_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//Get All
ruta.get('/',(req,res)=>{
    let resultado = getRoles();
    resultado.then(rols=>{
        res.json({
            rol : rols
        })
   }).catch(err=>{
        res.status(400).json({
            error : err
        })
   })
})

//Get By Id
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getRolById(req.params.id);
    resultado.then(r=>{
        res.json({
            rol : r
        })
   }).catch(err=>{
        res.status(400).json({
            error : err
        })
   })
})

//Alta Rol
ruta.post('/',(req,res)=>{
   let resultado = crearRol(req.body); 
   resultado.then(r=>{
        res.json({
            rol : r
        })
   }).catch(err=>{
        res.status(400).json({
            error : err
        })
   })
})

async function getRoles(){
    let roles = await Rol.find();
    return roles;
}

async function getRolById(id){
    let rol = await Rol.findById(id);
    return rol;
}

async function crearRol(body){
    let rol = new Rol({
        nombre : body.nombre,
        descripcion : body.descripcion,
        clave : body.clave
    });
    return await rol.save();
};

module.exports = ruta;