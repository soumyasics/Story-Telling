const express=require("express")
const router=express.Router()

const Writer=require('./Controller/WriterController')
const Reader=require('./Controller/readerController')

//Writer routes
router.post('/registerWriter',Writer.upload,Writer.registerWriter)
router.post('/loginWriter',Writer.login)
router.post('/forgotPasswordWriter',Writer.forgotPassword)
router.post('/reset-password/:id',Writer.resetPassword)

//reader routes
router.post('/registerReader',Reader.upload,Reader.registerReader)
router.post('/loginReader',Reader.login)

module.exports=router