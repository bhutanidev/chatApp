const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    chatName : {type:String,trim:true},
    users:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    isGroup : {type:Boolean},
    lastMsg : {type:mongoose.Schema.Types.ObjectId,ref:'Message'},
    grpAdmin:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
},{Timestamp:true})

const CHAT = mongoose.model('Chat',chatSchema)

module.exports = CHAT