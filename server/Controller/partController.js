const Part = require('../Model/partSchema');
const Story = require('../Model/storySchema');
const Writer = require('../Model/WriterSchema');
const Like = require('../Model/likesSchema');
const storySchema = require('../Model/storySchema');
const multer=require('multer')

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

const upload = multer({ storage: storage }).single('partAudio');

// Add a part
const addPart = async (req, res) => {
  try {
    const { storyId,partText, writerId } = req.body;

    let storyData=await storySchema.findById(storyId)
    const partAudio = (storyData.type)=== 'audio' && req.file? req.file : null;

    if (storyData.type === 'audio' && !partAudio) {
      return res.status(400).json({ status: 400, message: "Audio file is required for audio type stories" });
    }


    // Check if the storyId exists
    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({
        status: 404,
        message: 'Story not found'
      });
    }

 


    const newPart = new Part({
      storyId,
      partText,
      partAudio,
      ownerId:story.writerId,
      writerId,
      date:new Date()
    });

    const savedPart = await newPart.save();

    res.status(201).json({
      status: 201,
      message: 'Part added successfully',
      data: savedPart
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: 'Error adding part',
      error: error.message
    });
  }
};

// Get all parts
const getAllParts = async (req, res) => {
  try {
    const parts = await Part.find().sort({createdAt:-1})
      .populate('storyId')
      .populate('ownerId')
      .populate('writerId');

    res.status(200).json({
      status: 200,
      message: 'Parts retrieved successfully',
      data: parts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: 'Error retrieving parts',
      error: error.message
    });
  }
};

// Get part by ID
const getPartById = async (req, res) => {
  try {
    const part = await Part.findById(req.params.id)
      .populate('storyId')
      .populate('ownerId')
      .populate('writerId');

    if (!part) {
      return res.status(404).json({
        status: 404,
        message: 'Part not found'
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Part retrieved successfully',
      data: part
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: 'Error retrieving part',
      error: error.message
    });
  }
};


// Get part by Story ID
const getPartByStoryId = async (req, res) => {
    try {
      const part = await Part.find({storyId:req.params.id}).sort({createdAt:-1})
        .populate('ownerId')
        .populate('writerId');
  
      if (!part) {
        return res.status(404).json({
          status: 404,
          message: 'Part not found'
        });
      }
  
      res.status(200).json({
        status: 200,
        message: 'Part retrieved successfully',
        data: part
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: 'Error retrieving part',
        error: error.message
      });
    }
  };


// Delete part by ID
const deletePartById = async (req, res) => {
  try {
    const deletedPart = await Part.findByIdAndDelete(req.params.id);

    if (!deletedPart) {
      return res.status(404).json({
        status: 404,
        message: 'Part not found'
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Part deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: 'Error deleting part',
      error: error.message
    });
  }
};


const getMostLikedPartForStory = async (req,res) => {
 try {


  } catch (err) {
      return res.json({ status: 500, msg: 'Error occurred', error: err });
  }
};


const findBestPart = async (req, res) => {
  try {
      
      const parts = await Part.find({ storyId: req.params.id });

      if (parts.length === 0) {
          return res.status(404).json({ message: 'No parts found for the given story.' });
      }

      const partsWithLikes = await Promise.all(parts.map(async (part) => {
          const likesCount = await Like.countDocuments({ partId: part._id, liked: true });
          return { part, likesCount };
      }));


      partsWithLikes.sort((a, b) => b.likesCount - a.likesCount);


      const bestPart = partsWithLikes.length > 0 ? partsWithLikes[0].part : null;

      if (bestPart) {
          return res.status(200).json(bestPart);
      } else {
          return res.status(404).json({ message: 'No likes found for any part of the story.' });
      }
  } catch (error) {
      console.error('Error:', error.message);
      return res.status(500).json({ message: 'Error finding the best part of the story' });
  }
};

module.exports = {
  addPart,
  getAllParts,
  getPartById,
  deletePartById,
  getPartByStoryId,
  findBestPart,
  upload
};
