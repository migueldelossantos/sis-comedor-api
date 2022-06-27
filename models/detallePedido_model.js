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
        ref:'producto',
        require:true,
        index:true
    },
    pedidoId:{
        type: Schema.Types.ObjectId,
        ref:'pedido',
        require: true,
        index: true
    }
});

module.exports = mongoose.model('DetallePedido',detallePedidoSchema);