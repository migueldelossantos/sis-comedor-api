const express = require('express');

const Direcion = require('../models/direccion_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//Get
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getDirreccionById(req.body.id);
    resultado.then(direc=>{
        res.json({
            direccion : direc
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Get By Cliente
ruta.get('/cliente/:id',verificarToken,(req,res)=>{
    let resultado = getDireccionByCliente(id);
    resultado.then(direc=>{
        res.json({
            direccion : direc
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Alta de Dirrecion
ruta.post('/',verificarToken,(req,res)=>{
    let resultado = crearDireccion(req.body);
    resultado.then(direc=>{
        res.json({
            direccion : direc
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Actualizar Direccion
ruta.put('/:id',verificarToken,(req,res)=>{
    let resultado = actualizarDireccion(req.body.id,req.body)
    resultado.then(direc=>{
        res.json({
            direccion : direc
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

async function getDirreccionById(id){
    let direccion = await Direcion.findById(id);
    return direccion;
}

async function getDireccionByCliente(id){
    let direccion = await Direcion.find({clienteId:id});
    return direccion;
}

async function crearDireccion(body){
    let direccion = new Direcion({
        calle : body.calle,
        numero : body.numero,
        colonia : body.colonia,
        municipio : body.municipio,
        entreCalle1 : body.entreCalle1,
        entreCalle2 : body.entreCalle2,
        estado : body.estado,
        longitud : body.longitud,
        latitud : body.latitud,
        clienteId : body.clienteId
    })
    return await direccion.save();
}

async function actualizarDireccion(id,body){
    let direccion = await Direcion.findById(id,{
        $set:{
            calle : body.calle,
            numero : body.numero,
            colonia : body.colonia,
            municipio : body.municipio,
            entreCalle1 : body.entreCalle1,
            entreCalle2 : body.entreCalle2,
            estado : body.estado,
            longitud : body.longitud,
            latitud : body.latitud,
            clienteId : body.clienteId
        }
    },{new:true});
    return direccion;
}

module.exports = ruta;