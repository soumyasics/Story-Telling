const mongoose= require("mongoose");

const sSchema=mongoose.Schema({
    storyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'stories',
        required:true,
       
    },
    part:{
        type:Boolean,
        default:false
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
});
module.exports=mongoose.model('parts',sSchema)

