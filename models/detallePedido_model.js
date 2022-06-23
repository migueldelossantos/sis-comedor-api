const mongoose = require('mongoose');

const Schema = mongoose;

const detallePedidoSchema = mongoose.Schema({
    cantidad:{
        type:Number,
        require:true
    },
    precio:{
        type:Number,
        require:true
    },
    estado:{
        type:String,
        default:'A',
        length:1
    },
    productoId:{
        type:Schema.Types.ObjectId,
        require:true
    }
});

module.exports = mongoose.model('DetallePedido',detallePedidoSchema);