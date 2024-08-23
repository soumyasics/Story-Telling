// const mongoose= require("mongoose");

// const sSchema=mongoose.Schema({
  
   
   
//     first:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'readers',
       
//     },
//     second:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'readers',
       
//     },third:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'readers',
       
//     },fourth:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'readers',
       
//     },fifth:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'readers',
       
//     },
//     challengeId:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'challenges',
//         required:true,
       
//     },
//   firstPoints:{
//     type:Number,
//     default:0,
//   },
//  secondPoints:{
//     type:Number,
//     default:0,
//   },
//   thirdPoints:{
//     type:Number,
//     default:0,
//   },
//   fourthPoints:{
//     type:Number,
//     default:0,
//   },
//  fifthPoints:{
//     type:Number,
//     default:0,
//   }
// });
// module.exports=mongoose.model('challengeWinners',sSchema)



const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
    participantId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'participants.participantType' // Dynamic reference based on participantType
    },
    participantType: {
        type: String,
        enum: ['readers', 'writers'] // Allowed values: 'readers' or 'writers'
    },
    points: {
        type: Number,
        default: 0
    }
});

const sSchema = new mongoose.Schema({
    challengeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'challenges',
        required: true
    },
    participants: {
        first: participantSchema,
        second: participantSchema,
        third: participantSchema,
        fourth: participantSchema,
        fifth: participantSchema
    }
},{timestamps:true});

module.exports = mongoose.model('challengeWinners', sSchema);
