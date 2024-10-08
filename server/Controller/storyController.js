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
 if(req.body.storyId==null){

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
    writerId:req.body.writerId,
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
  }
  else{


    
  const storyData=Story.findById(req.body.storyId)
  
  const { title, summary, text, storyCategory} = req.body;
  // const audio = storyData.type === 'audio' && req.file ? req.file.path : null;

  // if (type === 'audio' && !audio) {
  //   return res.status(400).json({ status: 400, message: "Audio file is required for audio type stories" });
  // }
// const {title, summary, storyCategory, type,text } = req.body;
const audio = storyData.type === 'audio' && req.files.audio ? req.files.audio[0] : null;
const coverPicture = req.files.coverPicture ? req.files.coverPicture[0] : null;

// if (type === 'audio' && !audio) {
//   return res.status(400).json({ status: 400, message: "Audio file is required for audio type stories" });
// }

  const updateData = {
    title,
    summary,
    storyCategory,
    text,
    published:true


  };

  if (coverPicture) {
    updateData.coverPicture = coverPicture;
  }
  if (audio) {
    updateData.audio = audio;
  }

  Story.findByIdAndUpdate(req.body.storyId, updateData, { new: true })
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
  }
};


const viewAllStories = (req, res) => {
  Story.find().sort({createdAt:-1})
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

const viewAllStorYByCategory = (req, res) => {
  Story.find({ category: req.params.category }).sort({createdAt:-1})
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
  Story.find({ writerId: req.params.id , published:false }).sort({createdAt:-1})
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
 

  const storyData=Story.findById(req.params.id)
  
      const { title, summary, text, storyCategory} = req.body;
      // const audio = storyData.type === 'audio' && req.file ? req.file.path : null;
  
      // if (type === 'audio' && !audio) {
      //   return res.status(400).json({ status: 400, message: "Audio file is required for audio type stories" });
      // }
  // const {title, summary, storyCategory, type,text } = req.body;
  const audio = storyData.type === 'audio' && req.files.audio ? req.files.audio[0] : null;
  const coverPicture = req.files.coverPicture ? req.files.coverPicture[0] : null;

  // if (type === 'audio' && !audio) {
  //   return res.status(400).json({ status: 400, message: "Audio file is required for audio type stories" });
  // }
  
      const updateData = {
        title,
        summary,
        storyCategory,
        text
      };
  
      if (coverPicture) {
        updateData.coverPicture = coverPicture;
      }
      if (req.files && req.files.audio) {
        updateData.audio = req.files.audio[0];
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

  

const addRating = (req, res) => {
  let newRate = parseInt(req.body.rating);
  let rating = 0;
  Story.findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      rating = data.rating;
      if (data.rating != 0) rating = (rating + newRate) / 2;
      else rating = newRate;
      Story.findByIdAndUpdate(
        { _id: req.params.id },
        {
          rating: rating,
        },
        { new: true }
      )
        .exec()
        .then((data) => {
          res.json({
            status: 200,
            msg: "Data obtained successfully",
            data: data,
          });
        })
        .catch((err) => {
          res.json({
            status: 500,
            msg: "Data not Inserted",
            Error: err,
          });
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
  viewAllStorYByCategory,
  addRating
};
