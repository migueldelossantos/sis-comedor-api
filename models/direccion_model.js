const mongoose = require('mongoose');

const Schema = mongoose;

const direcionSchema = mongoose.Schema({
    calle:{
        type:String,
        require:true,
        length:20
    },
    numero:{
        type:String,
        require:true,
        length:5
    },
    colonia:{
        type:String,
        require:true,
        length:25
    },
    municipio:{
        type:String,
        require:true,
        length:25
    },
    entreCalle1:{
        type:String,
        require:true,
        length:25
    },
    entreCalle2:{
        type:String,
        require:true,
        length:25
    },
    estado:{
        type:String,
        require:true,
        length:20
    },
    longitud:{
        type:String,
        require:true,
        length:30
    },
    latitud:{
        type:String,
        require:true,
        length:30
    },
    clienteId:{
        type: Schema.Types.ObjectId,
        require:true
    }
});

module.exports = mongoose.model('Direccion',direcionSchema);