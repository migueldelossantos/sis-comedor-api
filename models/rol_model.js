const mongoose = require('mongoose');

const rolSchema = mongoose.Schema({
    name : {
        type : String,
        require : true,
        index : true
    },
    decription : {
        type : String
    },
    key : {
        type : String,
        require : true
    }
});

module.exports = mongoose.model('Rol',rolSchema);