const passport =require('passport')
const LocalStrategy = require('passport-local').Strategy
const USER = require('../models/userModel')
const {hashpassword,comparePass} = require('../helper/auth')


passport.use(new LocalStrategy(
    {
        usernameField: 'email', // Specify that 'email' should be used instead of 'username'
        passwordField: 'password' // This is optional since 'password' is the default
    },
    async function(email, password, done) {
        try {  
          const user = await USER.findOne({ email: email })
            if (!user) { return done(null, false , {message:'incorrect email'}) }
            const match = await comparePass(password,user.password)
            if (!match) { return done(null, false,{message:'incorrect password'}); }
            return done(null, user);
        } catch (error) {
            return done(error)
        }
      
    }
  ));

// passport.use(new LocalStrategy(
//      function(username, password, done) {
//        USER.findOne({ email: username },  function (err, user) {
//         if (err) { return done(err) }
//         if (!user) { return done(null, false , {message:'incorrect email'}) }
//         const match =  comparePass(password,user.password)
//         .then(()=>{
//             if (!match) { return done(null, false,{message:'incorrect password'}); }
//         })
        
//         return done(null, user);
//       });
//     }
//   ));