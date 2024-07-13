const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const challengeUpdates = require('../Model/challengeUpdates');




// Create a new challengeUpdates
const addchallengeUpdates = async (req, res) => {
    const { status, readerId, challengeId } = req.body;

 let existingchallenge =await challengeUpdates.find({readerId:readerId,date:new Date(),challengeId:challengeId})

 if(existingchallenge)
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
    challengeUpdates.find({challengeId:req.params.id})
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


module.exports = {
    addchallengeUpdates,
    viewchallengeUpdatessBychallengeId,
    viewchallengeUpdatesById,
   
};
