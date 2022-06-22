const mongoose = require('mongoose');

const peopleShema = new mongoose.Schema({
    name : {
        type:String,
        require:true
    },
    lastName : {
        type : String,
        require : true
    },
    lastName2 : {
        type : String
    },
    phone : {
        type : String,
        require : String
    },
    address:{
        type : String
    }
});

module.exports = mongoose.model('Poeple',peopleShema);