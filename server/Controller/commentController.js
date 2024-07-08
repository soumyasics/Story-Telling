const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = require('../Model/commentsSchema');




// Create a new comment
const createComment = async (req, res) => {
    const { storyId, comment, readerId, writerId } = req.body;

    if (!storyId || !comment) {
        return res.status(400).json({
            status: 400,
            msg: 'Story ID and comment are required.',
            data: null
        });
    }

    const newComment = new Comment({
        storyId,
        comment,
        readerId,
        writerId
    });

    try {
        const savedComment = await newComment.save();
        res.status(200).json({
            status: 200,
            msg: "Inserted successfully",
            data: savedComment
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Data not Inserted",
            Error: err.message
        });
    }
};

// View all comments
const viewCommentsByStory = (req, res) => {
    Comment.find({storyId:req.params.id})
        .populate('readerId writerId')
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

// View comment by ID
const viewCommentById = (req, res) => {
    Comment.findById({ _id: req.params.id })
        .populate('storyId readerId writerId')
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
    createComment,
    viewCommentsByStory,
    viewCommentById,
   
};
