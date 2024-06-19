const mongoose= require("mongoose");

const writerSchema=mongoose.Schema({
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
    paymentStatus:{
        type:Boolean,
        default:false
    },
    amount:{
        type:Number,

        default:0

    },
    isActive:{
        type:Boolean,
        default:true
    }
    
    
});
module.exports=mongoose.model('writers',writerSchema)

