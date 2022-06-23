const mongoose = require('mongoose');

const Schema = mongoose;

const clienteSchema = mongoose.Schema({
    nombre:{
        type:String,
        index:true,
        length:50,
        require:true
    },
    apellidos:{
        type:String,
        length:50,
        require:true
    },
    cel:{
        type:String,
        length:10,
        require:true
    },
    tel:{
        type:String,
        length: 10
    },
    rfc:{
        type:String,
        length :20
    },
    direccionId:{
        type: Schema.Types.ObjectId,
        index:true
    }
});

module.exports = mongoose.model('Cliente',clienteSchema);