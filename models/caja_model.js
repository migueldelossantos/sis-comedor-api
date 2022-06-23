const mongoose = require('mongoose');

const Schema = mongoose;

const cajaSchema = mongoose.Schema({
    cambio:{
        type:Number,
        default:0.0
    },
    saldo:{
        type:Number,
        default:0.0
    },
    usuarioId:{
        type: Schema.Types.ObjectId,
        require:true
    }
});

module.exports = mongoose.model('Caja',cajaSchema);