const express = require('express');

const DetallePedido = require('../models/detallePedido_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//Crear Detalle Pedido
ruta.post('/',verificarToken,(req,res)=>{
    let resultado = crearDetallePedido(req.body);
    resultado.then(detPed=>{
        res.json({
            detallePedido : detPed
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Actualiza Detalle Pedido
ruta.put('/:id',verificarToken,(req,res)=>{
    let resultado = actualizarDetallePed(id,body)
})

async function crearDetallePedido(body){
    let detallePedido = new DetallePedido({
        cantidad : body.cantidad,
        precio : body.precio,
        estado : body.estado,
        productoId : body.productoId
    });
    return detallePedido;
}

module.exports = ruta;