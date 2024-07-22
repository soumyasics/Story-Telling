const express = require('express');
const router = express.Router();
const Like = require('../Model/likesSchema');

// Add like to a comment
const addLike = async (req, res) => {
    const { storyId, readerId, writerId} = req.body;
    let like =null
    try {
        if(readerId!=null)
       like = await Like.findOne({ storyId, readerId });
        if(writerId!=null)
            like = await Like.findOne({ storyId, writerId });

        if (like) {
            // Toggle the like status
            like.liked = !like.liked;
        } else {
            // Create a new like if not found
            like = new Like({
                storyId,
                liked: true,
                readerId,
                writerId
            });
        }

        // Ensure dislike is false if liked is true
        if (like.liked) {
            like.disliked = false;
        }

        const savedLike = await like.save();
        res.status(200).json({
            status: 200,
            msg: "Like status updated successfully",
            data: savedLike
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Failed to update like status",
            Error: err.message
        });
    }
};
// Add like to a comment
const addLiketoPart = async (req, res) => {
    const { partId, readerId, writerId} = req.body;
    let like =null
    try {
        if(readerId!=null)
       like = await Like.findOne({ partId, readerId });
        if(writerId!=null)
            like = await Like.findOne({ partId, writerId });

        if (like) {
            // Toggle the like status
            like.liked = !like.liked;
        } else {
            // Create a new like if not found
            like = new Like({
                partId,
                liked: true,
                readerId,
                writerId
            });
        }

        // Ensure dislike is false if liked is true
        if (like.liked) {
            like.disliked = false;
        }

        const savedLike = await like.save();
        res.status(200).json({
            status: 200,
            msg: "Like status updated successfully",
            data: savedLike
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Failed to update like status",
            Error: err.message
        });
    }
};
// Add dislike to a comment
const addDislike = async (req, res) => {
    const { storyId, readerId, writerId } = req.body;

    try {
        let like = await Like.findOne({ storyId, readerId, writerId });

        if (like) {
         
            like.disliked = !like.disliked;
        } else {
           
            like = new Like({
                storyId,
                disliked: true,
                readerId,
                writerId
            });
        }
        if (like.disliked) {
            like.liked = false;
        }

        const savedLike = await like.save();
        res.status(200).json({
            status: 200,
            msg: "Dislike status updated successfully",
            data: savedLike
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Failed to update dislike status",
            Error: err.message
        });
    }
};

// Add dislike to a comment
const addDisliketoPart = async (req, res) => {
    const { partId, readerId, writerId } = req.body;

    try {
        let like = await Like.findOne({ partId, readerId, writerId });

        if (like) {
         
            like.disliked = !like.disliked;
        } else {
           
            like = new Like({
                partId,
                disliked: true,
                readerId,
                writerId
            });
        }
        if (like.disliked) {
            like.liked = false;
        }

        const savedLike = await like.save();
        res.status(200).json({
            status: 200,
            msg: "Dislike status updated successfully",
            data: savedLike
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Failed to update dislike status",
            Error: err.message
        });
    }
};

// Count likes for a story
const countLikes = async (req, res) => {
    const { storyId } = req.params;

    try {
        const likeCount = await Like.countDocuments({ storyId, liked: true });
        res.status(200).json({
            status: 200,
            msg: "Like count retrieved successfully",
            count: likeCount
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Failed to retrieve like count",
            Error: err.message
        });
    }
};

// Count dislikes for a story
const countDislikes = async (req, res) => {
    const { storyId } = req.params;

    try {
        const dislikeCount = await Like.countDocuments({ storyId, disliked: true });
        res.status(200).json({
            status: 200,
            msg: "Dislike count retrieved successfully",
            count: dislikeCount
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Failed to retrieve dislike count",
            Error: err.message
        });
    }
};

// Count likes for a story
const countLikesforPartId = async (req, res) => {
    const partId  = req.params.id;

    try {
        const likeCount = await Like.countDocuments({ partId, liked: true });
        res.status(200).json({
            status: 200,
            msg: "Like count retrieved successfully",
            count: likeCount
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Failed to retrieve like count",
            Error: err.message
        });
    }
};

// Count dislikes for a story
const countDislikesforPart = async (req, res) => {
    const { partId } = req.params;

    try {
        const dislikeCount = await Like.countDocuments({ partId, disliked: true });
        res.status(200).json({
            status: 200,
            msg: "Dislike count retrieved successfully",
            count: dislikeCount
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            msg: "Failed to retrieve dislike count",
            Error: err.message
        });
    }
};
module.exports = {
    addLike,
    addDislike,
    countDislikes,
    countLikes,
    addDisliketoPart,
    addLiketoPart,
    countDislikesforPart,
    countLikesforPartId,

};
