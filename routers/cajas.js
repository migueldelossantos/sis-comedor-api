const express = require('express');

const Caja = require('../models/caja_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//Get By Id
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getCajaById(req.body.id);
    resultado.then(cj=>{
        res.json({
            caja : cj
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Crear Caja
ruta.post('/',verificarToken,(req,res)=>{
    let resultado = crearCaja();
    resultado.then(cj=>{
        res.json({
            caja : cj
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Actualizar Caja
ruta.put('/:id',verificarToken,(req,res)=>{
    let resultado = actualizarCaja(req.body,req.body);
})

async function getCajaById(id){
    let caja = await Caja.findById(id);
    return caja;
}

async function crearCaja(body){
    let caja = new Caja({
        usuarioId : body.usuarioId
    });
    return await caja.save();
}

async function actualizarCaja(id,body){
    let caja = await Caja.findByIdAndUpdate(id,{
        $set:{
            cambio : body.cambio,
            saldo : body.saldo
        }
    },{new:true});
    return caja;
}

module.exports = ruta;