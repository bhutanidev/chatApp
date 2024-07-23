const express = require("express")
const authenticate = require('../middlewares/authMiddleware')
const msgRouter = express.Router()
const{sendChat , accessChat} = require('../controller/msgController')

msgRouter.route('/').post(authenticate,sendChat)
msgRouter.route('/:chatId').get(authenticate,accessChat)




module.exports = msgRouter