const mongoose = require('mongoose');

const Schema = mongoose;

const pedidoShema = mongoose({
    fecha:{
        type:Date,
        default:Date.now,
        index:true
    },
    estatus:{
        type:String,
        default:'A',
        length:1,
        index:true
    },
    tipoCobro:{
        type:String,
        default:'E',
        length:1
    },
    subTotal:{
        type:Number
    },
    descuento:{
        type:Number,
        default:0.0
    },
    iva:{
        type:Number,
        default:0.0
    },
    total:{
        type:Number,
        default:0.0
    },
    clienteId:{
        type: Schema.Types.ObjectId
    },
    usuarioId:{
        type: Schema.Types.ObjectId,
        require:true
    },
    mesaId:{
        type: Schema.Types.ObjectId
    },
    tipoPedido:{
        type: Schema.Types.ObjectId,
        require:true
    }
});

module.exports = mongoose.model('Pedido',pedidoShema);