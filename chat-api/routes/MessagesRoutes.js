const {addMessage,getAllMesssages} = require('../controllers/MessagesController')
const router = require('express').Router()
router.post("/addmsg",addMessage)
router.post("/getmsgs",getAllMesssages)
module.exports = router