const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    userName : {type:String,required:true},
    pic:{
        type:String,
        default:'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',required:true
    },
    isAdmin:{
        type:Boolean,
        default:false,required:true
    }
},{Timestamp:true})

const USER = mongoose.model('User',userSchema)

module.exports = USER