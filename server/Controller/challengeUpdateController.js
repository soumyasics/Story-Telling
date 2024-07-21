const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const challengeUpdates = require('../Model/challengeUpdates');
const ChallengeWinner = require('../Model/challengeWinners');
const Reader = require('../Model/ReaderSchema');
const Writer = require('../Model/WriterSchema');
const Challenge = require('../Model/challengeSchema');



// Create a new challengeUpdates
const addchallengeUpdates = async (req, res) => {
    const { status, readerId, challengeId, writerId } = req.body;
// Get the start of today
const today = new Date();
today.setHours(0, 0, 0, 0);
var data;

// Get the start of tomorrow
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
if (readerId) {
  data = {
    readerId: readerId,
    challengeId: challengeId,
    date: {
        $gte: today,
        $lt: tomorrow
    }
  }
} else {
  data = {
    writerId: writerId,
    challengeId: challengeId,
    date: {
        $gte: today,
        $lt: tomorrow
    }
  }
}

// Find if a challengeUpdate already exists for today
let existingChallenge = await challengeUpdates.findOne(data);

 if(existingChallenge)
 {
  return  res.status(200).json({
        status: 400,
        msg: "You Have already added Updates for Today",
  })
 }
    data.status = status;
    data.date = new Date();
    const newchallengeUpdates = new challengeUpdates(data);

    try {
        const savedchallengeUpdates = await newchallengeUpdates.save();
        res.status(200).json({
            status: 200,
            msg: "Inserted successfully",
            data: savedchallengeUpdates
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Data not Inserted",
            Error: err.message
        });
    }
};

// View all challengeUpdatess
// const viewchallengeUpdatessBychallengeId = (req, res) => {
//     challengeUpdates.find({challengeId:req.params.id}).sort({date:1})
//         .populate('readerId')
//         .exec()
//         .then(data => {
//             res.json({
//                 status: 200,
//                 msg: "Data obtained successfully",
//                 data: data
//             });
//         })
//         .catch(err => {
//             res.status(500).json({
//                 status: 500,
//                 msg: "Data not obtained",
//                 Error: err
//             });
//         });
// };
const viewchallengeUpdatessBychallengeId = (req, res) => {
  challengeUpdates.find({ challengeId: req.params.id }).sort({ date: 1 })
      .then(data => {
          // Create an array of promises for populating the data
          const populatePromises = data.map(item => {
              if (item.writerId) {
                  return challengeUpdates.populate(item, { path: 'writerId' });
              } else if (item.readerId) {
                  return challengeUpdates.populate(item, { path: 'readerId' });
              } else {
                  return Promise.resolve(item);
              }
          });

          // Wait for all promises to resolve
          return Promise.all(populatePromises);
      })
      .then(populatedData => {
          res.json({
              status: 200,
              msg: "Data obtained successfully",
              data: populatedData
          });
      })
      .catch(err => {
          res.status(500).json({
              status: 500,
              msg: "Data not obtained",
              Error: err
          });
      });
};



// View challengeUpdates by ID
const viewchallengeUpdatesById = (req, res) => {
    challengeUpdates.findById({ _id: req.params.id })
        .populate('challengeId readerId ')
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not obtained",
                Error: err
            });
        });
};

// View challengeUpdates by ID
const viewmyChallengesByReaderId = (req, res) => {
  challengeUpdates.find({readerId: req.params.id })
      .populate('challengeId readerId')
      .exec()
      .then(data => {
        const uniqueData = data.filter((value, index, self) =>
          index === self.findIndex((t) => (
              t.challengeId.toString() === value.challengeId.toString()
          ))
      );
          res.json({
              status: 200,
              msg: "Data obtained successfully",
              data: uniqueData
          });
      })
      .catch(err => {
        console.log(err);
          res.status(500).json({
              status: 500,
              msg: "Data not obtained",
              Error: err
          });
      });
};
// View challengeUpdates by ID
const viewmyChallengesByWriterId = (req, res) => {
  challengeUpdates.find({writerId: req.params.id })
      .populate('challengeId writerId')
      .exec()
      .then(data => {
        const uniqueData = data.filter((value, index, self) =>
          index === self.findIndex((t) => (
              t.challengeId.toString() === value.challengeId.toString()
          ))
      );
          res.json({
              status: 200,
              msg: "Data obtained successfully",
              data: uniqueData
          });
      })
      .catch(err => {
        console.log(err);
          res.status(500).json({
              status: 500,
              msg: "Data not obtained",
              Error: err
          });
      });
};

// View challengeUpdates by ID
const viewchallengeParticipantsById = (req, res) => {
    challengeUpdates.find({ _id: req.params.id },{readerId:1})
        .populate('readerId ')
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not obtained",
                Error: err
            });
        });
};


// // Register a new challenge winner
// const addChallengeWinner = async (req, res) => {
//   try {
//     const { first, second, third, fourth, fifth, challengeId, firstPoints, secondPoints, thirdPoints, fourthPoints, fifthPoints } = req.body;
// let ExWinners=ChallengeWinner.findOne({challengeId})
// if(ExWinners){
//     return  res.status(400).json({
//         status: 400,
//         msg: "Winners already been Declared "
//     })
// }
//     const newChallengeWinner = new ChallengeWinner({
//       first,
//       second,
//       third,
//       fourth,
//       fifth,
//       challengeId,
//       firstPoints,
//       secondPoints,
//       thirdPoints,
//       fourthPoints,
//       fifthPoints
//     });

//     await newChallengeWinner
//       .save()
//       .then((data) => {
//         return res.json({
//           status: 200,
//           msg: "Inserted successfully",
//           data: data,
//         });
//       })
//       .catch((err) => {
//         return res.json({
//           status: 500,
//           msg: "Data not Inserted",
//           data: err,
//         });
//       });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };




//modified


// Register a new challenge winner
const addChallengeWinner = async (req, res) => {
  try {
    const { participants, challengeId } = req.body;

    // Check if winners are already declared for the challenge
    const existingWinners = await ChallengeWinner.findOne({ challengeId });
    if (existingWinners) {
      return res.status(400).json({
        status: 400,
        msg: "Winners have already been declared for this challenge."
      });
    }

    // Create a new challenge winner entry
    const newChallengeWinner = new ChallengeWinner({
      challengeId,
      participants
    });

    const savedChallengeWinner = await newChallengeWinner.save();

    res.status(201).json({
      status: 201,
      msg: "Inserted successfully",
      data: savedChallengeWinner
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: "An error occurred while inserting the data.",
      error: error.message
    });
  }
};



// Get all challenge winners
const getAllChallengeWinners = async (req, res) => {
  try {
    const challengeWinners = await ChallengeWinner.find()
      .populate('participants.first.participantId', 'participants.first.participantType')
      .populate('participants.second.participantId', 'participants.second.participantType')
      .populate('participants.third.participantId', 'participants.third.participantType')
      .populate('participants.fourth.participantId', 'participants.fourth.participantType')
      .populate('participants.fifth.participantId', 'participants.fifth.participantType')
      .populate('challengeId');

    res.status(200).json({
      status: 200,
      msg: "Fetched successfully",
      data: challengeWinners
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get challenge winners by challengeId
const getChallengeWinnersByChallengeId = async (req, res) => {
  try {
    const  challengeId  = req.params.id;

    const challengeWinners = await ChallengeWinner.findOne({ challengeId });

    if (!challengeWinners) {
      return res.status(404).json({
        status: 404,
        msg: "No winners found for this challenge",
        data: null,
      });
    }

    const populateParticipant = async (participant) => {
      if (!participant) return null;

      const { participantId, participantType } = participant;
      if (participantType === 'readers') {
        return await Reader.findById(participantId);
      } else if (participantType === 'writers') {
        return await Writer.findById(participantId);
      }
      return null;
    };

    const populatedWinners = {
      first: await populateParticipant(challengeWinners.participants.first),
      second: await populateParticipant(challengeWinners.participants.second),
      third: await populateParticipant(challengeWinners.participants.third),
      fourth: await populateParticipant(challengeWinners.participants.fourth),
      fifth: await populateParticipant(challengeWinners.participants.fifth),
      challengeId: await Challenge.findById(challengeWinners.challengeId)
    };

    res.status(200).json({
      status: 200,
      msg: "Fetched successfully",
      data: populatedWinners
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};



//modified


// // Get all challenge winners
// const getAllChallengeWinners = async (req, res) => {
//   try {
//     const challengeWinners = await ChallengeWinner.find().populate('first').populate('second').populate('third').populate('fourth').populate('fifth').populate('challengeId');
//     res.status(200).json({
//       status: 200,
//       msg: "Fetched successfully",
//       data: challengeWinners
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Get challenge winners by challengeId

// const getChallengeWinnersByChallengeId = async (req, res) => {
//     try {
//       const { challengeId } = req.params;
  
//       const challengeWinners = await ChallengeWinner.find({ challengeId }).populate('first').populate('second').populate('third').populate('fourth').populate('fifth').populate('challengeId');
  
//       if (!challengeWinners.length) {
//         return res.status(404).json({
//           status: 404,
//           msg: "No winners found for this challenge",
//           data: null,
//         });
//       }
  
//       res.status(200).json({
//         status: 200,
//         msg: "Fetched successfully",
//         data: challengeWinners
//       });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };
  

module.exports = {
    addchallengeUpdates,
    viewchallengeUpdatessBychallengeId,
    viewchallengeUpdatesById,
    viewchallengeParticipantsById,
    addChallengeWinner,
    getAllChallengeWinners,
    getChallengeWinnersByChallengeId,
    viewmyChallengesByReaderId,
    viewmyChallengesByWriterId
};
