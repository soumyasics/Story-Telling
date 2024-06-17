const mongoose= require("mongoose");

const readerSchema=mongoose.Schema({
    name:{
        type:String,
       
        required:true,
       
    },
   
    contact:{
        type:String,
        
        required:true,
       
    },
    email:{
        type:String,
        unique:true,
        required:true,
       
        dropDups: true
    },
   
    password:{
        type:String,
        required:true
    },
    userCategory:{
        type:String,
        required:true
    },
   

    age:{
        type:Number,
        required:true

    },
    profilePicture:{
        type:Object,
        required:true

    },
  profileStatus:{
    type:Boolean,
    default:true
},
isActive:{
    type:Boolean,
    default:true
}
});
module.exports=mongoose.model('readers',readerSchema)

