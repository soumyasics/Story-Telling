const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const challengeUpdates = require('../Model/challengeUpdates');
const ChallengeWinner = require('../Model/challengeWinners');
const challengeWinners = require('../Model/challengeWinners');



// Create a new challengeUpdates
const addchallengeUpdates = async (req, res) => {
    const { status, readerId, challengeId } = req.body;
// Get the start of today
const today = new Date();
today.setHours(0, 0, 0, 0);

// Get the start of tomorrow
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

// Find if a challengeUpdate already exists for today
let existingChallenge = await challengeUpdates.findOne({
    readerId: readerId,
    challengeId: challengeId,
    date: {
        $gte: today,
        $lt: tomorrow
    }
});

 if(existingChallenge)
 {
  return  res.status(200).json({
        status: 400,
        msg: "You Have already added Updates for Today",
  })
 }
    const newchallengeUpdates = new challengeUpdates({
     
        status,
        readerId,
        challengeId,
        date:new Date()
    });

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
const viewchallengeUpdatessBychallengeId = (req, res) => {
    challengeUpdates.find({challengeId:req.params.id}).sort({date:1})
        .populate('readerId')
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


// Register a new challenge winner
const addChallengeWinner = async (req, res) => {
  try {
    const { first, second, third, fourth, fifth, challengeId, firstPoints, secondPoints, thirdPoints, fourthPoints, fifthPoints } = req.body;
let ExWinners=ChallengeWinner.findOne({challengeId})
if(ExWinners){
    return  res.status(400).json({
        status: 400,
        msg: "Winners already been Declared "
    })
}
    const newChallengeWinner = new ChallengeWinner({
      first,
      second,
      third,
      fourth,
      fifth,
      challengeId,
      firstPoints,
      secondPoints,
      thirdPoints,
      fourthPoints,
      fifthPoints
    });

    await newChallengeWinner
      .save()
      .then((data) => {
        return res.json({
          status: 200,
          msg: "Inserted successfully",
          data: data,
        });
      })
      .catch((err) => {
        return res.json({
          status: 500,
          msg: "Data not Inserted",
          data: err,
        });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all challenge winners
const getAllChallengeWinners = async (req, res) => {
  try {
    const challengeWinners = await ChallengeWinner.find().populate('first').populate('second').populate('third').populate('fourth').populate('fifth').populate('challengeId');
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
      const { challengeId } = req.params;
  
      const challengeWinners = await ChallengeWinner.find({ challengeId }).populate('first').populate('second').populate('third').populate('fourth').populate('fifth').populate('challengeId');
  
      if (!challengeWinners.length) {
        return res.status(404).json({
          status: 404,
          msg: "No winners found for this challenge",
          data: null,
        });
      }
  
      res.status(200).json({
        status: 200,
        msg: "Fetched successfully",
        data: challengeWinners
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

module.exports = {
    addchallengeUpdates,
    viewchallengeUpdatessBychallengeId,
    viewchallengeUpdatesById,
    viewchallengeParticipantsById,
    addChallengeWinner,
    getAllChallengeWinners,
    getChallengeWinnersByChallengeId,
    viewmyChallengesByReaderId
};
