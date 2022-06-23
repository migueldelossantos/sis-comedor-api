const mongoose = require('mongoose');

const productoSchema = mongoose.Schema({
    nombre:{
        type:String,
        require:true,
        index:true,
        length:35
    },
    precio:{
        type:Number,
        require:true
    },
    codigoBarras:{
        type:String,
        length:30
    },
    descripcion:{
        type:String
    },
    existencia:{
        type:String,
        default:'Si'
    },
    personalizar:{
        type:String,
        default:'No'
    }
});

module.exports = mongoose.model('Producto',productoSchema);