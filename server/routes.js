const express=require("express")
const router=express.Router()

const Writer=require('./Controller/WriterController')
const Reader=require('./Controller/readerController')

// common routes
router.post('/login',Reader.login)
router.post('/forgotPassword',Writer.forgotPWDsentMail)
router.post('/reset-password/:id',Writer.resetPassword)


//Writer routes
router.post('/registerWriter',Writer.upload,Writer.registerWriter)

router.post('/addPayment/:id',Writer.addPayment)

//reader routes
router.post('/registerReader',Reader.upload,Reader.registerReader)
router.post('/loginReader',Reader.login)
router.post('/upgradeToWriter/:id',Reader.upgradeToWriter)


module.exports=router