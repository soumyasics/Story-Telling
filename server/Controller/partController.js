const Part = require('../Model/partSchema');
const Story = require('../Model/storySchema');
const Writer = require('../Model/WriterSchema');

// Add a part
const addPart = async (req, res) => {
  try {
    const { storyId, part, writerId } = req.body;


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
      part,
      ownerId:story.writerId,
      writerId,
      date:new date()
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
    const parts = await Part.find()
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
      const part = await Part.find({storyId:req.params.id})
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

module.exports = {
  addPart,
  getAllParts,
  getPartById,
  deletePartById,
  getPartByStoryId
};
