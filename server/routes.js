const express = require("express");
const router = express.Router();

const Writer = require("./Controller/WriterController");
const Reader = require("./Controller/readerController");
const Story = require("./Controller/storyController");
const Comment = require("./Controller/commentController");
const Challenge = require("./Controller/challengeContrller");
const like = require("./Controller/likeController");
const parts = require("./Controller/partController");
const challengUpdates = require("./Controller/challengeUpdateController");



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
router.post("/publishStory/:id",Story.upload,Story.publishStory);
router.post("/editStory/:id",Story.upload, Story.editStory);
router.post("/viewStoryById/:id", Story.viewStoryById);
router.post("/viewStoriesByWriterId/:id", Story.viewStoriesByWriterId);
router.post("/deleteStoryById/:id", Story.deleteStoryById);
router.post("/viewAllStories", Story.viewAllStories);
router.post("/publishStory",Story.upload,Story.publishStory);
router.post("/viewAllStorYByCategory/:category", Story.viewAllStorYByCategory);
router.post("/addRating/:id", Story.addRating);


//comments
router.post("/createComment", Comment.createComment);
router.post("/viewCommentsByStory/:id", Comment.viewCommentsByStory);
router.post("/viewCommentById/:id", Comment.viewCommentById);


//likes
router.post("/addDislike", like.addDislike);
router.post("/addLike", like.addLike);
router.post("/countDislikes/:storyId", like.countDislikes);
router.post("/countLikes/:storyId", like.countLikes);

router.post("/addLiketoPart", like.addLiketoPart);
router.post("/addDisliketoPart", like.addDisliketoPart);
router.post("/countDislikesforPart/:id", like.countDislikesforPart);
router.post("/countLikesforPartId/:id", like.countLikesforPartId);
//challenge
router.post("/addChallenge",Challenge.upload, Challenge.addChallenge);
router.post("/viewActiveChallenges", Challenge.viewActiveChallenges);
router.post("/viewChallenges", Challenge.viewChallenges);
router.post("/viewChallengeById/:id", Challenge.viewChallengeById);
router.post("/updateChallengeById/:id",Challenge.upload,Challenge.updateChallengeById);
router.post("/deleteChallengeById/:id", Challenge.deleteChallengeById);
router.post("/viewActiveChallengesByWriterId/:id", Challenge.viewActiveChallengesByWriterId);


//parts
router.post("/addPart", parts.addPart);
router.post("/getAllParts", parts.getAllParts);
router.post("/getPartById/:id", parts.getPartById);
router.post("/getPartByStoryId/:id", parts.getPartByStoryId);
router.post("/deletePartById/:id", parts.deletePartById);
router.post("/findBestPart/:id", parts.findBestPart);



//Challenge Updates

router.post("/viewmyChallengesByReaderId/:id", challengUpdates.viewmyChallengesByReaderId);
router.post("/viewmyChallengesByWriterId/:id", challengUpdates.viewmyChallengesByWriterId);

router.post("/addchallengeUpdates", challengUpdates.addchallengeUpdates);
router.post("/viewchallengeUpdatessBychallengeId/:id", challengUpdates.viewchallengeUpdatessBychallengeId);
router.post("/viewchallengeUpdatesById/:id", challengUpdates.viewchallengeUpdatesById);
router.post("/viewchallengeParticipantsById/:id", challengUpdates.viewchallengeParticipantsById);
router.post("/addChallengeWinner", challengUpdates.addChallengeWinner);
router.post("/getAllChallengeWinners/:id", challengUpdates.getAllChallengeWinners);
router.post("/getChallengeWinnersByChallengeId/:id", challengUpdates.getChallengeWinnersByChallengeId);




module.exports = router;
