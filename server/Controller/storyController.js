const mongoose = require("mongoose");
const Story = require('../Model/storySchema'); 
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/'); 
  },
  filename: function (req, file, cb) {
    const uniquePrefix = 'prefix-'; 
    const originalname = file.originalname;
    const extension = originalname.split('.').pop();
    const filename = uniquePrefix + originalname.substring(0, originalname.lastIndexOf('.')) + '-' + Date.now() + '.' + extension;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage }).fields([
  { name: 'audio', maxCount: 1 },
  { name: 'coverPicture', maxCount: 1 }
]);


const addStory = (req, res) => {
 

    const {title, summary, storyCategory, type,text } = req.body;
    const audio = type === 'audio' && req.files.audio ? req.files.audio[0] : null;
    const coverPicture = req.files.coverPicture ? req.files.coverPicture[0] : null;
 
    if (type === 'audio' && !audio) {
      return res.status(400).json({ status: 400, message: "Audio file is required for audio type stories" });
    }

    const newStory = new Story({
      
      title,
      summary,
      date:new Date(),
      storyCategory,
      type,
      text,
      writerId:req.params.id,
      coverPicture:coverPicture,
      audio:audio,
      published:false
    });

    newStory.save()
      .then(data => {
        res.json({
          status: 200,
          message: "Story added successfully",
          data: data,
        });
      })
      .catch(err => {
        console.error(err);
        res.json({
          err: err,
          status: 500,
        });
      });
};

// publish story

const publishStory = (req, res) => {
 

  const {title, summary, storyCategory, type,text } = req.body;
  const audio = type === 'audio' && req.files.audio ? req.files.audio[0] : null;
  const coverPicture = req.files.coverPicture ? req.files.coverPicture[0] : null;

  if (type === 'audio' && !audio) {
    return res.status(400).json({ status: 400, message: "Audio file is required for audio type stories" });
  }

  const newStory = new Story({
    
    title,
    summary,
    date:new Date(),
    storyCategory,
    type,
    text,
    writerId:req.params.id,
    coverPicture:coverPicture,
    audio:audio,
    published:true
  });

  newStory.save()
    .then(data => {
      res.json({
        status: 200,
        message: "Story added successfully",
        data: data,
      });
    })
    .catch(err => {
      console.error(err);
      res.json({
        err: err,
        status: 500,
      });
    });
};


const viewAllStories = (req, res) => {
  Story.find()
    .populate('writerId')
    .exec()
    .then(stories => {
      res.status(200).json({
        status: 200,
        message: "Stories retrieved successfully",
        data: stories,
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        status: 500,
        message: "Error retrieving stories",
        error: err,
      });
    });
};

const deleteStoryById = (req, res) => {
  Story.findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then(story => {
      res.json({
        status: 200,
        message: "Story deleted successfully",
        data: story,
      });
    })
    .catch(err => {
      console.error(err);
      res.json({
        status: 500,
        message: "Error deleting story",
        error: err,
      });
    });
};

const viewStoryById = (req, res) => {
  Story.findById({ _id: req.params.id })
    .exec()
    .then(story => {
      res.json({
        status: 200,
        message: "Story retrieved successfully",
        data: story,
      });
    })
    .catch(err => {
      console.error(err);
      res.json({
        status: 500,
        message: "Error retrieving story",
        error: err,
      });
    });
};

const viewStoriesByWriterId = (req, res) => {
  Story.find({ writerId: req.params.id })
    .exec()
    .then(stories => {
      res.json({
        status: 200,
        message: "Stories retrieved successfully",
        data: stories,
      });
    })
    .catch(err => {
      console.error(err);
      res.json({
        status: 500,
        message: "Error retrieving stories",
        error: err,
      });
    });
};

const editStory = (req, res) => {
    upload.single('audio')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ status: 400, message: err.message });
      }
  
      const { writerId, title, summary, date,text, storyCategory, type } = req.body;
      const audio = type === 'audio' && req.file ? req.file.path : null;
  
      if (type === 'audio' && !audio) {
        return res.status(400).json({ status: 400, message: "Audio file is required for audio type stories" });
      }
  
      const updateData = {
        writerId,
        title,
        summary,
        date,
        storyCategory,
        type,
        text,
        coverPicture:coverPicture,
        audio:audio,
      };
  
      if (audio) {
        updateData.audio = audio;
      }
  
      Story.findByIdAndUpdate(req.params.id, updateData, { new: true })
        .exec()
        .then(updatedStory => {
          if (!updatedStory) {
            return res.status(404).json({ status: 404, message: "Story not found" });
          }
          res.json({
            status: 200,
            message: "Story updated successfully",
            data: updatedStory,
          });
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({
            status: 500,
            message: "Error updating story",
            error: err,
          });
        });
    });
  };

  // publish story
const publishStoryById = (req, res) => {
  Story.findByIdAndUpdate({_id:req.params.id},{published:true})
    .exec()
    .then((data) => {
      res.status(200).json({
        msg: "Data updated successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "No Data updated",
        Error: err,
      });
    });
};
  
module.exports = {
  addStory,
  publishStory,
  viewAllStories,
  viewStoryById,
  deleteStoryById,
  viewStoriesByWriterId,
  editStory,
  upload,
  publishStoryById
};
