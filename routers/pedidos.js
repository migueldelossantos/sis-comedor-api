const express = require('express');

const Pedido = require('../models/pedido_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//Get All Pedidos
ruta.get('/',verificarToken,(req,res)=>{
    let resultado = getPedidos();
    resultado.then(peds=>{
        res.json({
            pedido : peds
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Get Pedido By Id
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getPedidoById(req.params.id);
    resultado.then(ped=>{
        res.json({
            pedido : ped
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Alta Pedido
ruta.post('/',verificarToken,(req,res)=>{
    let resultado = crearPedido(req.body);
    resultado.then(ped=>{
        res.json({
            pedido : ped
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Actualizar Pedido
ruta.put('/:id',verificarToken,(req,res)=>{
    let resultado = actualizarPedido(req.params.id,req.body);
    resultado.then(ped=>{
        res.json({
            pedido : ped
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Elimnar Pedido
ruta.delete('/:id',verificarToken,(req,res)=>{
    let resultado = eliminarPedido(req.params.id);
    resultado.then(ped=>{
        res.json({
            pedido : ped
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

async function getPedidoById(id){
    let pedido = await Pedido.findById(id);
    return pedido;
}

async function getPedidos(){
    let pedidos = await Pedido.find({
        estatus : ['A','P']
    })
    return pedidos;
}

async function crearPedido(body){
    let pedido = new Pedido({
        subTotal : body.subTotal,
        total : body.total,
        clienteId : body.clienteId,
        usuarioId : body.usuarioId,
        mesaId : body.mesaId,
        tipoPedido : body.tipoPedido
    });
    return await pedido.save();
}

async function actualizarPedido(id,body){
    let pedido = await Pedido.findByIdAndUpdate(id,{
        $set:{
            estatus : body.status,
            tipoCobro : body.tipoCobro,
            subTotal : body.subTotal,
            descuento : body.descuento,
            iva : body.iva,
            total : body.total,
            clienteId : body.clienteId,
            usuarioId : body.usuarioId,
            mesaId : body.mesaId,
            tipoPedido : body.tipoPedido
        }
    },{new:true});
    return pedido;
}

async function eliminarPedido(id){
    let pedido = await Pedido.findByIdAndUpdate(id,{
        $set:{
            estatus : 'E'
        }
    },{new:true})
    return pedido;
}

module.exports = ruta;