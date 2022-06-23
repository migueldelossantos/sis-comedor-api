const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usuarioShema = new mongoose.Schema({
    correo : {
        type:String,
        require:true,
        index:true,
        length:35,
        require:true
    },
    password : {
        type:String,
        require:true
    },
    status : {
        type:String,
        default:'A',
        length:1
    },
    dateUp : {
        type: Date,
        default : Date.now
    },
    rolId : {
        type: Schema.Types.ObjectId,
        ref:'rol',
        index:true
    },
    empleadoId:{
        type : String,
        ref:'empleado',
        index : true
    }
})

module.exports = mongoose.model('Usuario',usuarioShema);