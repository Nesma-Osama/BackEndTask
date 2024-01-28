const mongoose=require('mongoose')
const PostSchema=new mongoose.Schema({
    Title:{
        type:String,
        required:true,
        minlength:2,
        maxlength:20

    }
    ,
    Description:{
        type:String,
        required:true,
        minlength:1,
        maxlength:500
    },
    UserId:{
    type:mongoose.SchemaTypes.ObjectId,
    required:true
    }

})
module.exports=mongoose.model('Posts',PostSchema)