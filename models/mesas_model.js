const mongoose = require('mongoose');

const Schema = mongoose;

const mesaSchema = mongoose.Schema({
    numMesa:{
        type:Number,
        index:true,
        require:true
    },
    capacidad:{
        type:Number,
        require:true
    },
    estado:{
        type:String,
        default:'C',
        length:1
    },
    seccionId:{
        type: Schema.Types.ObjectId,
        require:true
    },
    meseroId:{
        type: Schema.Types.ObjectId,
        require:true
    }
});

module.exports = mongoose.model('Mesa',mesaSchema);