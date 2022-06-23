const mongoose = require('mongoose');

const empleadoSchema = mongoose.Schema({
    nombre:{
        type:String,
        index:true,
        length:50,
        require:true
    },
    apellidoPat:{
        type:String,
        length:50,
        require:true
    },
    apellidoMat:{
        type:String,
        length:50
    },
    cel:{
        type:String,
        length:13,
        require:true
    }
});

module.exports = mongoose.model('Empleado',empleadoSchema);