const express=require("express")
const router=express.Router()

const Writer=require('./Controller/WriterController')


router.post('/registerWriter',Writer.upload,Writer.registerWriter)
router.post('/loginWriter',Writer.login)

module.exports=router