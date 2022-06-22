const mongoose = require('mongoose');

const Schema = mongoose;

const clientSchema = mongoose.Schema({
    rfc : {
        type : String,
        index : true
    },
    email : {
        type : String,
        require : true,
        index : true
    },
    peopleId : {
        type : Schema.Types.ObjectId
    }    
});

module.exports = mongoose.model('Client',clientSchema);