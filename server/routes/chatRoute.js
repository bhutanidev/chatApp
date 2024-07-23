const express = require('express');
const authenticate = require('../middlewares/authMiddleware')
const chatRouter = express.Router();
const{accessChat, fetchChats, createGroupChat, renameGroup, addGroup, removeGroup,} = require('../controller/chatController')


chatRouter.route('/api/chat').post(authenticate,accessChat)
chatRouter.route('/api/chat').get(authenticate,fetchChats)
chatRouter.route('/api/chat/group').post(authenticate,createGroupChat)
chatRouter.route('/api/chat/renamegroup').put(authenticate,renameGroup)
chatRouter.route('/api/chat/addgroup').put(authenticate,addGroup)
chatRouter.route('/api/chat/removegroup').put(authenticate,removeGroup)








module.exports = chatRouter
