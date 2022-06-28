const express = require('express');

const TipoPedido = require('../models/tipoPedido_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//Get All
ruta.get('/',verificarToken,(req,res)=>{
    let resultado = getTiposPedido();
    resultado.then(tiposPed=>{
        res.json({
            tiposPedido : tiposPed
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Get By Id
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getTipoPedById(req.params.id);
    resultado.then(tipoPed=>{
        res.json({
            tipoPedido : tipoPed
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Alta Tipo Pedido
ruta.post('/',verificarToken,(req,res)=>{
    let resultado = crearTipoPedido(req.body);
    resultado.then(tipoPed=>{
        res.json({
            tipoPedido : tipoPed
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

async function getTiposPedido(){
    let tiposPed = await TipoPedido.find();
    return tiposPed;
}

async function getTipoPedById(id){
    let tipoPedido = await TipoPedido.findById(id);
    return tipoPedido;
}

async function crearTipoPedido(body){
    let tipoPedido = new TipoPedido({
        clave : body.clave,
        nombre : body.nombre,
        descripcion : body.descripcion,
        tiempoEspera : body.tiempoEspera
    });
    return await tipoPedido.save();
}

module.exports = ruta;