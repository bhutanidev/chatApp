const MESSAGE = require('../models/messageModel')
const USER = require('../models/userModel')
const CHAT = require('../models/chatModel')
const mongoose = require('mongoose')
const  sendChat=async(req,res)=>{
    const {content , chatId} = req.body
    let newmessage = {
        content:content,
        sender:req.user._id,
        chat:chatId
    }

try {
        let message = await MESSAGE.create(newmessage)
        message = await message.populate('sender','userName pic')
        message = await message.populate('chat')
    
        message = await USER.populate(message,{
            path:'chat.users',
            select:'userName pic email'
        })
        await CHAT.findByIdAndUpdate(chatId,{lastMsg:message})
        return res.json(message)
} catch (error) {
    // throw new Error(error.message)
    return res.json({error:'some Error'})
}

}

const accessChat = async(req,res)=>{
    try {
        const messages= await MESSAGE.find({chat:req.params.chatId}).populate('sender', 'name email pic').populate('chat')
        return res.send(messages)
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports={
    sendChat,accessChat
}