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
 
  
<<<<<<< HEAD
      const { writerId, title, summary, date,text, storyCategory, type } = req.body;
      const audio = type === 'audio' && req.file ? req.file.path : null;
  
      if (type === 'audio' && !audio) {
        return res.status(400).json({ status: 400, message: "Audio file is required for audio type stories" });
      }
=======
  const {title, summary, storyCategory, type,text } = req.body;
  const audio = type === 'audio' && req.files.audio ? req.files.audio[0] : null;
  const coverPicture = req.files.coverPicture ? req.files.coverPicture[0] : null;

  if (type === 'audio' && !audio) {
    return res.status(400).json({ status: 400, message: "Audio file is required for audio type stories" });
  }
>>>>>>> 08e667febc02e2917ddb724bb35d6d11757f5f9a
  
      const updateData = {
        title,
        summary,
        date:new Date(),
        storyCategory,
        type,
<<<<<<< HEAD
        text,
        coverPicture:coverPicture,
        audio:audio,
=======
        text
 
>>>>>>> 08e667febc02e2917ddb724bb35d6d11757f5f9a
      };
  
      if (coverPicture) {
        updateData.coverPicture = coverPicture;
      }
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

  };

  
const publishStory = (req, res) => {
  

  const {title, summary, storyCategory, type,text } = req.body;
  const audio = type === 'audio' && req.files.audio ? req.files.audio[0] : null;
  const coverPicture = req.files.coverPicture ? req.files.coverPicture[0] : null;

  if (type === 'audio' && !audio) {
    return res.status(400).json({ status: 400, message: "Audio file is required for audio type stories" });
  }

    const updateData = {
      title,
      summary,
      date:new Date(),
      storyCategory,
      type,
      text,
   published:true
      
    };

    if (audio) {
      updateData.audio = audio;
    }
    if (coverPicture) {
      updateData.coverPicture = coverPicture;
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
  publishStory
};
