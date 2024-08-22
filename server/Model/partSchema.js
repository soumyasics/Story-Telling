const mongoose= require("mongoose");

const sSchema=mongoose.Schema({
    storyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'stories',
        required:true,
       
    },
    partText:{
        type:String,
    },
    partAudio:{
        type:Object,
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'writers',
       
    },
    writerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'writers',
       
    },
    date:Date
},{timestamps:true});
module.exports=mongoose.model('parts',sSchema)

