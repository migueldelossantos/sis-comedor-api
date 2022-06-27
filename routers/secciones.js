const express = require('express');

const Seccion = require('../models/seccion_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//Get
ruta.get('/',verificarToken,(req,res)=>{
    let resultado = getSecciones();
    resultado.then(secs=>{
        res.json({
            seccion : secs
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getSeccionById(req.body.id);
    resultado.then(sec=>{
        res.json({
            seccion : sec
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Alta Seccion
ruta.post('/',verificarToken,(req,res)=>{
    let resultado = crearSeccion(req.body);
    resultado.then(sec=>{
        res.json({
            seccion : sec
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Actualizar Seccion
ruta.put('/:id',verificarToken,(req,res)=>{
    let resultado = actualizarSeccion(req.body.id,req.body);
    resultado.then(sec=>{
        res.json({
            seccion : sec
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

async function getSecciones(){
    let secciones = await Seccion.find();
    return secciones;
}

async function getSeccionById(id){
    let seccion = await Seccion.findById(id);
    return seccion;
}

async function crearSeccion(body){
    let seccion = new Seccion({
        clave : body.clave,
        nombre : body.nombre,
        numMesas : body.numMesas,
        descripcion : body.descripcion,
        imagen : body.imagen
    });
    return await seccion.save();
}

async function actualizarSeccion(id,body){
    let seccion = await Seccion.findByIdAndUpdate(id,{
        $set:{
            clave : body.clave,
            nombre : body.nombre,
            numMesas : body.numMesas,
            descripcion : body.descripcion,
            imagen : body.imagen
        }
    },{new:true});
    return seccion;
}

module.exports = ruta;