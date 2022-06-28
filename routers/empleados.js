const express = require('express');

const Empleado = require('../models/empleado_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//Get By Id
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getEmpleadoById(req.params.id);
    resultado.then(emp=>{
        res.json({
            empleado : emp
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Get By Nombre
ruta.get('/nombre/:nombre',verificarToken,(req,res)=>{
    let resultado = getEmpleadoByNombre(req.params.nombre);
    resultado.then(emps=>{
        res.json({
            empleados : emps
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Alta Empleado
ruta.post('/',verificarToken,(req,res)=>{
    let resultado = crearEmpleado(req,body);
    resultado.then(emp=>{
        res.json({
            empleado : emp
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Actualizar Empleado
ruta.put('/:id',verificarToken,(req,res)=>{
    let resultado = actualizarEmpleado(req.params.id,req.body);
    resultado.then(emp=>{
        res.json({
            empleado : emp
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

async function getEmpleadoById(id){
    let empleado = await Empleado.findById(id);
    return empleado;
}

async function getEmpleadoByNombre(nom){
    let empleado = await Empleado.find({
        nombre : /nom/
    })
}

async function crearEmpleado(body){
    let empleado = new Empleado({
        nombre : body.nombre,
        apellidoPat : body.apellidoPat,
        apellidoMat : body.apellidoMat,
        cel : body.cel
    });
    return await empleado.save();
}

async function actualizarEmpleado(id,body){
    let empleado = await Empleado.findByIdAndUpdate(id,{
        $set:{
            nombre : body.nombre,
            apellidoPat : body.apellidoPat,
            apellidoMat : body.apellidoMat,
            cel : body.cel
        }
    },{new:true})
    return empleado;
}


module.exports = ruta;