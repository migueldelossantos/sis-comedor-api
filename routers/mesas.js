const express = require('express');

const Mesa = require('../models/mesas_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//Get By Id
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getMesaById(req.params.id);
    resultado.then(m=>{
        res.json({
            mesa : m
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Get All
ruta.get('/',verificarToken,(req,res)=>{
    let resultado = getMesas();
    resultado.then(ms=>{
        res.json({
            mesa : ms
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Alta de Mesa
ruta.post('/',verificarToken,(req,res)=>{
    let resultado = crearMesa(req.body);
    resultado.then(m=>{
        res.json({
            mesa : m
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Eliminar Mesa
ruta.delete('/:id',verificarToken,(req,res)=>{
    let resultado = eliminarMesa(req.params.id);
    resultado.then(m=>{
        res.json({
            mesa : m
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Actualiza Mesa
ruta.put('/:id',verificarToken,(req,res)=>{
    let resultado = actualizarMesa(req.params.id,req.body);
    resultado.then(m=>{
        res.json({
            mesa : m
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

async function getMesas(){
    let mesas = await Mesa.find({
        estado : {
            $in : ["A","C"]
        }
    });
    return mesas;
}

async function getMesaById(id){
    let mesa = await Mesa.findById(id);
    return mesa;
}

async function crearMesa(body){
    let mesa = new Mesa({
        numMesa : body.numMesa,
        capacidad : body.capacidad,
        estado : body.estado,
        seccionId : body.seccionId,
        meseroId : body.meseroId
    });
    return await mesa.save();
}

async function actualizarMesa(id,body){
    let mesa = await Mesa.findByIdAndUpdate(id,{
        $set:{
            numMesa : body.numMesa,
            capacidad : body.capacidad,
            estado : body.estado,
            seccionId : body.seccionId,
            meseroId : body.meseroId    
        }
    },{new:true});
    return mesa;
}

async function eliminarMesa(id){
    let mesa = await Mesa.findByIdAndUpdate(id,{
        $set:{
            estado : 'E'
        }
    },{new:true})
    return mesa;
}

module.exports = ruta;