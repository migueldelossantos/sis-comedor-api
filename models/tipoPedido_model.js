const mongoose = require('mongoose');

const tipoPedidoSchema = mongoose.Schema({
    clave:{
        type:String,
        require:true,
        length:10,
        index:true
    },
    nombre:{
        type:String,
        length:30,
        require:true,
        index:true
    },
    descripcion:{
        type:String
    },
    tiempoEspera:{
        type:Number
    }
});

module.exports = mongoose.model('TipoPedido',tipoPedidoSchema);