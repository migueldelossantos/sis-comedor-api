const express = require('express');

const Cliente = require('../models/cliente_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//Get Clientes
ruta.get('/',verificarToken,(req,res)=>{
    let resultado = getClientes();
    resultado.then(clis=>{
        res.json({
            cientes : clis
        })
    }).catch(err=>{
        res.status(400).json({
            error : err 
        })
    })
});

//Get Cliente Id
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getClienteById(req.params.id);
    resultado.then(cli=>{
        res.json({
            cliente : cli
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Get Cliente por Nombre
ruta.get('/nombre/:nombre',(req,res)=>{
    let resultado = getClienteByNombre(req.params.nombre);
    resultado.then(clis=>{
        res.json({
            clientes : clis
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Crear Cliente
ruta.post('/',verificarToken,(req,res)=>{
    let resultado = crearCliente(req.body);
    resultado.then(cli=>{
        res.json({
            cliente : cli
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Actualizar Cliente
ruta.put('/:id',verificarToken,(req,res)=>{
    let resultado = actualizarCliente(req.params.id,req.body);
    resultado.then(cli=>{
        res.json({
            cliente : cli
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

async function getClienteById(id){
    let cliente = await Cliente.findById(id);
    return cliente;
}

async function getClientes(){
    let cliente = await Cliente.find();
    return cliente;
}

async function getClienteByNombre(nombreCon){
    console.log('nombreCon :>> ', nombreCon);
    let cliente = await Cliente.find({
        nombre : {
            $regex : '.*'+nombreCon+'.*',
            $options : "$i"
        }
    });
    return cliente;
}

async function crearCliente(body){
    let cliente = new Cliente({
        nombre : body.nombre,
        apellidos: body.apellidos,
        cel : body.cel,
        tel : body.tel,
        rfc : body.rfc
    });
    return await cliente.save();
}

async function actualizarCliente(id,body){
    let cliente = await Cliente.findByIdAndUpdate(id,{
        $set:{
            nombre : body.nombre,
            apellidos: body.apellidos,
            cel : body.cel,
            tel : body.tel,
            rfc : body.rfc,
            direccionId : body.direccionId
        }
    },{new:true});
    return cliente;
}

module.exports = ruta;