const mongoose= require("mongoose");

const sSchema=mongoose.Schema({
    
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
},{timestamps:true});
module.exports=mongoose.model('challengeupdates',sSchema)

