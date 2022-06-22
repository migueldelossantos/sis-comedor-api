const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userShema = new mongoose.Schema({
    peopleId : {
        type: Schema.Types.ObjectId,
        ref:'people',
        index:true
    },
    rolId : {
        type: Schema.Types.ObjectId,
        ref:'rol',
        index:true
    },
    clave : {
        type:String,
        require:true,
        index:true
    },
    password : {
        type:String,
        require:true
    },
    status : {
        type:String,
        default:'A'
    },
    dateUp : {
        type: Date,
        default : Date.now
    }
})

module.exports = mongoose.model('User',userShema);