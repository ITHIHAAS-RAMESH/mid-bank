const mongoose = require('mongoose')

const appSchema = mongoose.Schema({
    email : {
        type : String,
        require : [true,'email cant be empty'],
        trim : true
    },
    username : {
        type : String,
        required : [true,'name cannot be empty'],
        trim : true,
        maxlength : [20,'name cannot exceed 20 chars']
    },
    password : {
        type : String,
        required : [true,'password cant be empty'],
        trim : true
    },
    balance : {
        type : Number,
        required : [true],
        trim : true
    },
    sentTo : {
        type : String,
        required : [true,'name cannot be empty'],
        trim : true,
        maxlength : [20,'name cannot exceed 20 chars']
    },
    Amount : {
        type : Number,
        required : [true],
        trim : true
    }
})

module.exports = mongoose.model('bank',appSchema)