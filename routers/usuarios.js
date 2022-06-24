const express = require('express');
const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario_model');
const verificarToken = require('../middlewares/auth');

const ruta = express.Router();

//Get Usuarios
ruta.get('/',verificarToken,(req,res)=>{
    let resultado = getUsuariosActivos();
    resultado.then(users=>{
        res.json({
            usuarios : users
        })
    }).catch(err=>{
        error : err
    })
})

//Get Usuario By Id
ruta.get('/:id',verificarToken,(req,res)=>{
    let resultado = getUsuarioById(id);
    resultado.then(us=>{
        res.json({
            usuario : us
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
})

//Alta de Usuario
ruta.post('/',(req,res)=>{

    Usuario.findOne({clave:req.body.correo},(error,user)=>{
        if(error){
            return res.status(400).json({error:"Server Error!"});
        }
        if(user){
            return res.status(400).json({
                error : "Ya existe un usuario registrado con esa Clave"
            })
        }else{
            //Da de Alta Usuario
            let resultado = createUser(req.body);
            resultado.then(us=>{
                res.json({
                    user : us
                })
            }).catch(err=>{
                res.status(400).json({
                    error : err
                })
            });
        }
    });
    
});

//Actualizacion de Usuario
ruta.put('/:id',verificarToken,(req,res)=>{
    let resultado = actualizarUsuario(req.body.id,req.body);

    resultado.then(us=>{
        res.json({
            usuario : us
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
});

//Eliminar Usuario
ruta.delete('/:id',verificarToken,(req,res)=>{
    let resultado = eliminarUsuario(req.body.id);
    resultado.then(us=>{
        res.json({
            usuario : us
        })
    }).catch(err=>{
        res.status(400).json({
            error : err
        })
    })
});

async function getUsuarioById(id){
    let usuario = await Usuario.findById(id);
    return usuario;
}

async function getUsuariosActivos(){
    let usuarios = await Usuario.find({ status:'A' });
    return usuarios;
}

async function createUser(body){
    let user = new Usuario({
        correo      : body.correo,
        password    : bcrypt.hashSync( body.password, 10),
        rolId       : body.rolId,
        empleadoId  : body.empleadoId
    });
    return await user.save();
}

async function actualizarUsuario(id,body){
    let usuario = await Usuario.findByIdAndUpdate(id,{
        $set:{
            rolId : body.rolId,
            empleadoId : body.empleadoId,
            estatus : body.status
        }
    },{new:true});
    return usuario;
}

async function eliminarUsuario(id){
    let usuario = await Usuario.findByIdAndUpdate(id,{
        $set:{
            estatus : 'E'
        }
    },{new:true});
    return usuario;
}

module.exports = ruta;