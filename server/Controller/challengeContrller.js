const express = require('express');
const router = express.Router();
const Challenge = require('../Model/challengeSchema');
const multer = require("multer");
const challengeParticipants = require('../Model/challengeParticipants');

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = "prefix-"; // Add your desired prefix here
    const originalname = file.originalname;
    const extension = originalname.split(".").pop();
    const filename =
      uniquePrefix +
      originalname.substring(0, originalname.lastIndexOf(".")) +
      "-" +
      Date.now() +
      "." +
      extension;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage }).single("picture");
// Add a new challenge
const addChallenge = async (req, res) => {
    try {
        const { title, description, startDate, endDate, writerId } = req.body;

        const newChallenge = new Challenge({
            title,
            description,
            startDate,
            endDate,
            writerId,
            picture: req.file
        });

        const savedChallenge = await newChallenge.save();
        res.status(200).json({
            status: 200,
            msg: "Challenge added successfully",
            data: savedChallenge
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Failed to add challenge",
            Error: err.message
        });
    }
};

// Update a challenge by ID
const updateChallengeById = async (req, res) => {
    try {
        const { title, description, startDate, endDate } = req.body;
        const { id } = req.params;
        const updatedChallenge = await Challenge.findByIdAndUpdate(
            id,
            {   title, 
                description, 
                startDate, 
                endDate,
                picture:req.file },
            { new: true }
        );

        if (!updatedChallenge) {
            return res.status(404).json({
                status: 404,
                msg: "Challenge not found",
            });
        }

        res.status(200).json({
            status: 200,
            msg: "Challenge updated successfully",
            data: updatedChallenge
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Failed to update challenge",
            Error: err.message
        });
    }
};

// Delete a challenge by ID
const deleteChallengeById = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedChallenge = await Challenge.findByIdAndDelete(id);

        if (!deletedChallenge) {
            return res.status(404).json({
                status: 404,
                msg: "Challenge not found",
            });
        }

        res.status(200).json({
            status: 200,
            msg: "Challenge deleted successfully",
            data: deletedChallenge
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Failed to delete challenge",
            Error: err.message
        });
    }
};

// View all challenges
const viewChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.find().populate('writerId');
        res.status(200).json({
            status: 200,
            msg: "Challenges retrieved successfully",
            data: challenges
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Failed to retrieve challenges",
            Error: err.message
        });
    }
};

// View challenge by ID
const viewChallengeById = async (req, res) => {
    try {
        const { id } = req.params;

        const challenge = await Challenge.findById(id).populate('writerId');

        if (!challenge) {
            return res.status(404).json({
                status: 404,
                msg: "Challenge not found",
            });
        }

        res.status(200).json({
            status: 200,
            msg: "Challenge retrieved successfully",
            data: challenge
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Failed to retrieve challenge",
            Error: err.message
        });
    }
};

// View active challenges
const viewActiveChallenges = async (req, res) => {
    try {
        const currentDate = new Date();
        const activeChallenges = await Challenge.find({ endDate: { $gte: currentDate } }).populate('writerId');

        res.status(200).json({
            status: 200,
            msg: "Active challenges retrieved successfully",
            data: activeChallenges
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Failed to retrieve active challenges",
            Error: err.message
        });
    }
};
const viewActiveChallengesByWriterId = async (req, res) => {
    try {
        const currentDate = new Date();
        const activeChallenges = await Challenge.find({ writerId:req.params.id })

        res.status(200).json({
            status: 200,
            msg: "Active challenges retrieved successfully",
            data: activeChallenges
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Failed to retrieve active challenges",
            Error: err.message
        });
    }
};
const viewPreviousChallenges = async (req, res) => {
    try {
        const currentDate = new Date();
        const prevChallenges = await Challenge.find({ endDate: { $lte: currentDate } }).populate('writerId');

        res.status(200).json({
            status: 200,
            msg: "Prev challenges retrieved successfully",
            data: prevChallenges
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Failed to retrieve active challenges",
            Error: err.message
        });
    }
};

const addParticipants = async (req, res) => {
    try {
        const { readerId, writerId, challengeId} = req.body;

        const newChallenge = new challengeParticipants({
            readerId, writerId, challengeId
        });

        const savedChallenge = await newChallenge.save();
        res.status(200).json({
            status: 200,
            msg: "Participants added successfully",
            data: savedChallenge
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Failed to add challenge",
            Error: err.message
        });
    }
};


const viewChallengeParticipants = async (req, res) => {
    try {
        const participants = await challengeParticipants.find({challengeId:req.params.id}).populate('writerId readerId');

        res.status(200).json({
            status: 200,
            msg: "participants retrieved successfully",
            data: prevChallenges
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Failed to retrieve active participants",
            Error: err.message
        });
    }
};

module.exports = {
    addChallenge,
    updateChallengeById,
    deleteChallengeById,
    viewChallenges,
    viewChallengeById,
    viewActiveChallenges,
    viewActiveChallengesByWriterId,
    upload,
    viewPreviousChallenges,
    viewChallengeParticipants,
    addParticipants
};
