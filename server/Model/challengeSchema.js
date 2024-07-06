const mongoose= require("mongoose");

const sSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
       
    },
    description:{
        type:String,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
  
    writerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'writers',
        required:true
       
    },
    picture:{
        type:Object,
        required:true

    },
});
module.exports=mongoose.model('challenges',sSchema)

