const express = require('express');
const { registerUser , getUser , ifauthenticated } = require('../controller/authController');
const passport = require('passport')
const authRouter = express.Router();
const authenticate = require('../middlewares/authMiddleware')

authRouter.get('/api/success',ifauthenticated)

authRouter.post('/api/login',passport.authenticate('local',{failureMessage:'error',}),(req,res)=>{
    
    return res.json({success:'authenticated',user:{email:req.user.email,userName:req.user.userName,pic:req.user.pic,_id:req.user._id}})
})
authRouter.post('/api/register',registerUser)
//wrong approach

// (req,res)=>{passport.authenticate('local',(err,user,info)=>{
//     if (err) {
//         return res.json({err});
//       }
//     if (!user) {
//         return res.status(401).json({ message: 'Authentication failed' });
//     }
//     return res.json({success:'logged In'})
// })})

authRouter.get('/api/logout',(req,res)=>{
    
    if(req.isAuthenticated()){
        req.logout((err)=>{
            if(err){
                // done(err)
                return res.json({error:err})
            }
            // res.redirect('http://localhost:5173/logout')

        })
        return res.json({success:'logout'})
    }else{
        return res.json({error:'not authenticated'})
    }
})


authRouter.route('/api/user').get(authenticate,getUser)


module.exports = authRouter