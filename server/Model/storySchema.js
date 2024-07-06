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
    text:{
        type:String,

    },
    audio:{
        type:Object,

    },
    coverPicture:{
        type:Object,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    published:{
        type:Boolean,
        required:true
    },
    rating:{
        type:Number,
        default:0
    }
   
    
});
module.exports=mongoose.model('stories',sSchema)

