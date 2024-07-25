const CHAT = require('../models/chatModel')
const USER = require('../models/userModel')


const accessChat = async(req,res)=>{
    const {userId} = req.body
    console.log(userId)
    console.log(req.user)
    if(!userId){
        return res.status(400).json({error:'pass user id'})
    }

    let chat = CHAT.find({isGroup:false,
        $and:[{users:{$elemMatch:{$eq:req.user._id}}},
        {users:{$elemMatch:{$eq:userId}}}]
    }).populate('users','-password').populate('lastMsg')
    chat = await USER.populate(chat,{
        path:'lastMsg.sender',
        select:'userName email pic'
    })
    // console.log(chat);
    if(chat.length > 0){
        return res.send(chat[0])
    }
    console.log(chat);
    const data = {
            isGroup:false,
            users:[req.user._id,userId],
            chatName:'sender'

    }

    try {
        const newchat = await CHAT.create(data)
        const findchat = await CHAT.findOne({_id:newchat._id}).populate('users','-password')
        return res.send(findchat)
    } catch (error) {
        return res.send(error)
    }
}

const fetchChats = async(req,res)=>{
    const chats = await CHAT.find({users:{$elemMatch:{$eq:req.user._id}}}).populate("users", "-password")
    return res.send(chats)
}


const createGroupChat = async(req,res)=>{
    const {userList , chatName } = req.body
    const userlist = JSON.parse(userList)
    if(userlist.length < 2){
        return res.json({error:'minimum two members are required'})
    }
    console.log(userlist);
    userlist.push(req.user._id)
    const newGroupChat = {
        chatName : chatName,
        users:userlist,
        isGroup : true,
        // lastMsg : {type:mongoose.Schema.Types.ObjectId,ref:'Message'},
        grpAdmin:req.user._id
    }
    
    const finalChat = await CHAT.create(newGroupChat)
    const findchat = await CHAT.findOne({_id:finalChat._id}).populate('users','-password').populate("grpAdmin", "-password");
    console.log(findchat);
    return res.send(findchat)
}
const renameGroup = async(req,res)=>{
    const {groupId , newName} = req.body
    if(!groupId){
        return res.json({error:'GroupId not provided'})
    }  
    if(!newName){
        return res.json({error:'Provide new name'})
    }
    try {
        const grpDetails = await CHAT.findOne({_id:groupId})
        if(req.user._id != grpDetails.grpAdmin){
            return res.json({error:'You are not the admin of the group'})
        }
        const updated = await CHAT.findOneAndUpdate({_id:groupId},{chatName:newName},{new:true}).populate('users','-password').populate('lastMsg')
        if(!updated){
            return res.json({error:'No such group chat found'})
        }
        return res.send(updated)
    } catch (error) {
        console.log(error)
    }
}
const addGroup = async(req,res)=>{
    const{groupId , userId} = req.body
    if(!userId){
        return res.json({error:'Provide member to be added'})
    }
    const group = await CHAT.findById(groupId)
    if(req.user._id != group.grpAdmin){
        return res.json({error:'Not admin'})
    }
    const {users} = group
    users.push(userId)
    const updated = await CHAT.findOneAndUpdate({_id:groupId},{users:users},{new:true}).populate('users','-password').populate('lastMsg')
    return res.send(updated)
}
const removeGroup = async(req,res)=>{
    const{groupId , userId} = req.body
    if(!userId){
        return res.json({error:'Provide member to be added'})
    }
    const group = await CHAT.findById(groupId)
    if(req.user._id != group.grpAdmin){
        return res.json({error:'Not admin'})
    }
    // let {users} = group

    // users = users.filter((user)=>{
    //     return user!==userId
    // })
    const updated = await CHAT.findOneAndUpdate({_id:groupId},{$pull:{users:userId}},{new:true}).populate('users','-password').populate('lastMsg')
    if(updated.users.length === 0){
        await CHAT.findByIdAndDelete(groupId)
        return res.json({'deleted':true})
    }

    
    return res.send(updated)

}
module.exports = {
    accessChat,
    fetchChats, 
    createGroupChat,
    renameGroup,
    addGroup,
    removeGroup
}
