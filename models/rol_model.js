const mongoose = require('mongoose');

const rolSchema = mongoose.Schema({
    nombre : {
        type : String,
        require : true,
        index : true
    },
    descripcion : {
        type : String
    },
    clave : {
        type : String,
        require : true,
        length:10
    }
});

module.exports = mongoose.model('Rol',rolSchema);