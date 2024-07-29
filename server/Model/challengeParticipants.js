const mongoose= require("mongoose");

const sSchema=mongoose.Schema({
    
   
   
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
module.exports=mongoose.model('challengeParticipants',sSchema)

