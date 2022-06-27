const express = require('express');

const DetallePedido = require('../models/detallePedido_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//Get By Id
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getDetalleById(req.body.id);
    resultado.then(detPed=>{
        res.json({
            detallePedido : detPed
        })
    }).catch(err=>{
        res.status(400).json({
            error : res
        })
    })
})

//Get By Pedido
ruta.get('/pedido/:pedidoId',verificarToken,(req,res)=>{
    let resultado = getByPedidoId(req.body.pedidoId);
    resultado.then(detsPed=>{
        res.json({
            detallesPedido : detsPed
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
});

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
    resultado.then(detPed=>{
        res.json({
            detallePedido : detPed
        })
    }).catch(err=>{
        res.status.json({
            error : err
        })
    })
})

async function getDetalleById(id){
    let detallePed = await DetallePedido.findById(id);
    return detallePed;
}

async function getByPedidoId(id){
    let detallesPed = await DetallePedido.find({pedidoId : id});
    return detallesPed;
}

async function crearDetallePedido(body){
    let detallePedido = new DetallePedido({
        cantidad : body.cantidad,
        precio : body.precio,
        estado : body.estado,
        productoId : body.productoId,
        pedidoId : body.pedidoId
    });
    return detallePedido;
}

async function actualizarDetallePed(id,body){
    let detallePed = await DetallePedido.findByIdAndUpdate(id,{
        $set : {
            cantidad : body.cantidad,
            precio : body.precio,
            estado : body.estado,
            productoId : body.productoId,
            pedidoId : body.pedidoId
        }
    },{new:true});
    return detallePed;
}

module.exports = ruta;