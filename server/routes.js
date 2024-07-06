const express = require("express");
const router = express.Router();

const Writer = require("./Controller/WriterController");
const Reader = require("./Controller/readerController");
const Story = require("./Controller/storyController");



// common routes
router.post("/login", Reader.login);
router.post("/forgotPassword", Writer.forgotPWDsentMail);
router.post("/reset-password/:id", Writer.resetPassword);

//Writer routes
router.post("/registerWriter", Writer.upload, Writer.registerWriter);
router.post("/rejectWriterById/:id", Writer.rejectWriterById);
router.post("/acceptWriterById/:id", Writer.acceptWriterById);
router.post("/activateWriterById/:id", Writer.activateWriterById);
router.post("/deActivateWriterById/:id", Writer.deActivateWriterById);
router.post("/viewWriterReqsforAdmin", Writer.viewWriterReqsforAdmin);
router.post("/viewWriters", Writer.viewWriters);
router.post("/viewWriterById/:id", Writer.viewWriterById);
router.post("/editWriterById/:id",Writer.upload, Writer.editWriterById);

router.post("/addPayment/:id", Writer.addPayment);

//reader routes
router.post("/registerReader", Reader.upload, Reader.registerReader);
router.post("/loginReader", Reader.login);
router.post("/viewReaderById/:id", Reader.viewReaderById);
router.post("/upgradeToWriter/:id", Reader.upgradeToWriter);
router.post("/viewreaderprofile/:id", Reader.viewReaderById);
router.post("/editReaderById/:id", Reader.upload,Reader.editReaderById);
router.post("/deleteReaderById/:id", Reader.deleteReaderById);
router.post("/viewReaderById/:id", Reader.viewReaderById);
router.post("/viewallreaders", Reader.viewReaders);



//Story
router.post("/addStory/:id", Story.upload,Story.addStory);
router.post("/publishStory/:id", Story.upload,Story.publishStory);
router.post("/editStory/:id", Story.editStory);
router.post("/publishStoryById/:id", Story.publishStory);
router.post("/viewStoryById/:id", Story.viewStoryById);
router.post("/viewStoriesByWriterId/:id", Story.viewStoriesByWriterId);
router.post("/deleteStoryById/:id", Story.deleteStoryById);
router.post("/viewAllStories", Story.viewAllStories);
router.post("/publishStory/:id", Story.publishStory);



module.exports = router;
