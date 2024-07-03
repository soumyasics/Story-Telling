const mongoose= require("mongoose");

const sSchema=mongoose.Schema({
    writerId:{
        type:mongoose.Schema.Types.ObjectId,
       ref:'writers',
        required:true,
       
    },
   
    title:{
        type:String,
        
        required:true,
       
    },
    summary:{
        type:String,
        
        required:true,
    },
   
    date:{
        type:Date,
        required:true
    },
   storyCategory:{
        type:String,
        required:true
    },
   

    type:{
        type:String,
        required:true

    },
    audio:{
        type:Object,

    },
    isActive:{
        type:Boolean,
        default:true
    },
   
    
});
module.exports=mongoose.model('stories',sSchema)

