const mongoose= require("mongoose");

const sSchema=mongoose.Schema({
    storyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'stories',
       
       
    },
    partId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'parts',
       
       
    },
    liked:{
        type:Boolean,
        default:false
    },
    disliked:{
        type:Boolean,
        default:false
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
module.exports=mongoose.model('likes',sSchema)

