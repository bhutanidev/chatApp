const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')
const authRouter = require('./routes/authRoutes')
const chatRouter = require('./routes/chatRoute')
const msgRouter = require('./routes/messageRoutes')
const { LEGAL_TCP_SOCKET_OPTIONS } = require('mongodb')
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(session({
    secret:process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:true,
    store:MongoStore.create({mongoUrl:process.env.MONGO_URL,collectionName:'sessions'}),
    cookie:{
        maxAge:1000*60*60*24
    }
}))

app.use(passport.initialize())
app.use(passport.session())

passport.initialize()
passport.session()

//persists user data inside session
passport.serializeUser((user,done)=>{
    done(null,user)
})

//fetches session details 
passport.deserializeUser((user,done)=> {
    process.nextTick(function() {
      return done(null, user);
    });
  });
require('./helper/passport')

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
        console.log('db connected');
    })
.catch((error)=>{
        console.log(error);
    })

app.use('/',authRouter)
app.use('/',chatRouter)
app.use('/api/message',msgRouter)

// important points on socket.io
// it is used to create web sockets
// web sockets are full duplex communicatio channels in tcp i.e bidirectional communication
// io is a server socket and sockets are local io.e user specific
// main functions involved all of these functions can be used in both client and server side

// in on emit join

// on->listens an event and provides a call back

// emit->use to communicate between client and server

// in-> go to a socket

// join-> use to join a room. room establishes a connecton  between users present in the same room

const PORT = process.env.PORT||8000 
const server = app.listen(PORT,()=>console.log(`Server is running on port: ${PORT}`))
const io = require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:'http://localhost:5173',
    },
})

io.on('connection',(socket)=>{
    console.log('User connected to socket.io')
//event for setup of socket
    socket.on('setup',(userData)=>{
        //room name is user._id,user joins this room
        socket.join(userData._id)
        console.log(userData._id);
        //connected will be emitted we can listen to this event in front end using emit or on
        //we will use on so that we can provide a call back
        // emit is used when we need to provide some values to the event
        socket.emit('connected')
    })
    socket.on('joinChat',(room)=>{
        //users with same chat id will join the same room for real time communication
        socket.join(room)
        console.log('user connectd to room: ',room)
    })
    socket.on('newMessage',(newMessageRecieved)=>{
        //this event is triggered when a new message is sent
        let chat = newMessageRecieved.chat
        console.log('inside new message')

        if(!chat.users) {return console.log("No users found")}

        chat.users.forEach(user => {
            if(user._id == newMessageRecieved.sender._id)return;
            //socket will go inside of the room  with the user id as the name of the room and will emit an event message recieved
            //we can add a call back on this event whenever a user ecieves a msg hence we will use on to listen to this event in the front end
            console.log('entering the room ',user._id);
            socket.in(user._id).emit('message recieved',newMessageRecieved)
        })


    })
})