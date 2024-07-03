const express = require("express");
const router = express.Router();

const Writer = require("./Controller/WriterController");
const Reader = require("./Controller/readerController");

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
router.post("/editReaderById/:id", Reader.editReaderById);
router.post("/upgradeToWriter/:id", Reader.upgradeToWriter);

module.exports = router;
