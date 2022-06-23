const mongoose = require('mongoose');

const seccionShema = mongoose.Schema({
    clave:{
        type:String,
        length:20,
        index:true,
        require:true
    },
    nombre:{
        type:String,
        index:true
    },
    numMesas:{
        type:Number,
        require:true
    },
    descripcion:{
        type:String
    },
    imagen:{
        type:String
    }
});

module.exports = mongoose.model('Seccion',seccionShema);