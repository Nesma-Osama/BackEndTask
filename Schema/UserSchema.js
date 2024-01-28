const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        minlength: 3,
        required: true,
        maxlength: 30
    },
    Email: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 5,
        maxlength: 100
    }
    ,
    Password:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('User',UserSchema)