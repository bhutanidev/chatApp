const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    content:{type:String},
    sender : {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    chat : {type:mongoose.Schema.Types.ObjectId, ref:'Chat'}
},{timestamps:true})

const MESSAGE = mongoose.model('Message',messageSchema)

module.exports = MESSAGE