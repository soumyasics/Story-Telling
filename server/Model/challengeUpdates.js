const mongoose= require("mongoose");

const sSchema=mongoose.Schema({
    storyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'stories',
        required:true,
       
    },
    status:{
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
       
    },
    challengeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'challenges',
        required:true,
       
    },
    date:Date
});
module.exports=mongoose.model('comments',sSchema)

