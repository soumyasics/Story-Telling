const mongoose= require("mongoose");

const sSchema=mongoose.Schema({
    storyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'stories',
        required:true,
       
    },
    comment:{
        type:String,
        required:true
    },
   
    readerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'readers',
       
    },
    writerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'writers',
       
    }
});
module.exports=mongoose.model('comments',sSchema)
