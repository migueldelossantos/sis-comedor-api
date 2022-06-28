const express = require('express');

const Producto = require('../models/producto_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//Get All
ruta.get('/',verificarToken,(req,res)=>{
    let resultado = getProductos();
    resultado.then(prods=>{
        res.json({
            producto : prods
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Get By Id
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getProductoById(req,params.id);
    resultado.then(prod=>{
        res.json({
            producto : prod
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Get By Codigo Barra
ruta.get('/codigoBarras/:codigoBarra',verificarToken,(req,res)=>{
    let resultado = getProductoByCB(req.params.codigoBarra);
    resultado.then(prod=>{
        res.json({
            producto : prod
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Alta Producto
ruta.post('/',verificarToken,(req,res)=>{
    let resultado = crearProducto(req.body);
    resultado.then(prod=>{
        res.json({
            producto : prod
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Actualizar Producto
ruta.put('/:id',verificarToken,(req,res)=>{
    let resultado = actualizarProducto(req.params.id,req.body);
    resultado.then(prod=>{
        res.json({
            producto : prod
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

async function getProductoById(id){
    let producto = await Producto.findById(id);
    return producto;
}

async function getProductos(){
    let productos = await Producto.find();
    return productos;
}

async function getProductoByCB(cb){
    let producto = await Producto.findOne({
        codigoBarra : cb
    });
    return producto;
}

async function crearProducto(body){
    let producto = new Producto({
        nombre : body.nombre,
        precio : body.precio,
        codigoBarras : body.codigoBarras,
        descripcion : body.descripcion,
        existencia : body.existencia,
        personalizar : body.personalizar
    })
    return await producto.save();
}

async function actualizarProducto(id,body){
    let producto = await Producto.findByIdAndUpdate(id,{
        $set:{
            nombre : body.nombre,
            precio : body.precio,
            codigoBarras : body.codigoBarras,
            descripcion : body.descripcion,
            existencia : body.existencia,
            personalizar : body.personalizar
        }
    },{new:true});
    return producto;
}

module.exports = ruta;