const mongoose = require('mongoose')
const USER = require('../models/userModel')
const {hashpassword,comparePass} = require('../helper/auth')


const ifauthenticated = async(req,res)=>{
    // console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        // console.log(req.user)
        return res.json({email:req.user.email,userName:req.user.userName,pic:req.user.pic,_id:req.user._id})
    }else{
        return res.json(null)
    }
}

const registerUser =  async(req,res)=>{
    
    try {
        const {email,password,username,pic} = req.body
        if(!email){
            return res.json({error:'Enter valid email'})
        }
        if(!password){
            return res.json({error:'Enter valid password'})
        }
        if(!username){
            return res.json({error:'Enter valid username'})
        }
        const unique = await USER.findOne({email})
        if(unique){
            return res.json({error:'User already exist'})
        }
    
        const hashPassword = await hashpassword(password)
        const user = await USER.create({email,password:hashPassword,userName:username,})
    
        return res.json(user)
    } catch (error) {
        return res.json(error)
    }

}

const loginUser = async(req,res)=>{
    const {email , password} = req.body
    if(!email){
        return res.json({error:'Enter valid email'})
    }
    if(!password){
        return res.json({error:'Password can not be empty'})
    }
    const user = await USER.findOne({email})

    if(!user){
        return res.json({error:'User doesnt exist'})
    }

    const match = await comparePass(password,user.password)
    if(match){
        return res.json({success : 'User logged in successfully'})
    }else{
        return res.json({error:'Password doesnt match'})
    }

}

// const getUser = async(req,res)=>{
//     // console.log(req.query);
//     if(req.isAuthenticated()){
//         console.log(req.user);
//         console.log(req.session);
//         const {search} = req.query
//         // console.log(search)
//         const keyword = search?{$or:[{email: { $regex: search, $options: 'i' } },{userName: { $regex: search, $options: 'i' }}]}:{}
//         const users = await USER.find(keyword).find({_id:{$ne:req.user._id}})
//         return res.send(users)
//     }else{
//         return res.json({message:'not authenticated'})
//     }


// }

const getUser = async(req,res)=>{
    // console.log(req.query);
try {
            // console.log(req.user);
            // console.log(req.session);
            const {search} = req.query
            console.log(search)
            const keyword = search?{$or:[{email: { $regex: search, $options: 'i' } },{userName: { $regex: search, $options: 'i' }}]}:{}
            const users = await USER.find(keyword).find({_id:{$ne:req.user._id}})
            // const{email,username , pic , _id} = users
            return res.send(users)
} catch (error) {
    return res.status(401).errored(error)
    
}

}


module.exports = {
    registerUser,
    loginUser,
    getUser,
    ifauthenticated
}