import { Box , FormControl, Input, Spinner, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/chatContext'
import {getSenderFull} from '../helpers/senderName'
import ProfileModal from './ProfileModal'
import GroupInfoModal from './GroupInfoModal'
import axios from 'axios'
import ScrollableChats from './ScrollableChats'
import io from 'socket.io-client'

const ENDPOINT = 'http://localhost:8000'
var socket , selectedChatCompare



const SingleChat = () => {
    const{user , selectedChat , fetchChatsAgain , setFetchChatsAgain} = useContext(ChatContext)
    const [loading , setLoading] = useState(false)
    const [socketConnected , setSocketConnected] = useState(false)
    const [newMessage , setNewMessage] = useState('')
    const [messages,setMessages] = useState([])

    // console.log(selectedChat);
    useEffect(()=>{
        socket = io(ENDPOINT)
        socket.emit("setup",user)
        socket.on("connected",()=>setSocketConnected(true))
    },[])
    const fetchMessages = async()=>{
        setLoading(true)
        if(!selectedChat)return;
        const response = await axios.get(`/api/message/${selectedChat._id}`)
        setMessages(response.data)
        console.log(response.data);
        setLoading(false)
        //creates room
        socket.emit('joinChat',selectedChat._id)
    }
    const sendMessage = async(event)=>{
        if(event.key==="Enter" && newMessage){
            try {
                const response = await axios.post('/api/message',{content:newMessage,chatId:selectedChat._id})
                setNewMessage('')
                socket.emit('newMessage',response.data)
                setMessages([...messages,response.data])
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    }
    const typingHandler = async(e)=>{
        setNewMessage(e.target.value)

    }

    useEffect(()=>{
        fetchMessages()
        selectedChatCompare=selectedChat
    },[selectedChat])

    useEffect(()=>{
        socket.on("message recieved",(newMessageRecieved)=>{
            console.log(selectedChatCompare)
            if(!selectedChatCompare || selectedChatCompare._id!==newMessageRecieved.chat._id) {
                //give noti
            }
            setMessages([...messages,newMessageRecieved])
        })
    })

  return (
    <>
    {selectedChat?(<>
    <Box display={'flex'} justifyContent={'space-between'} padding={3}>
        {!selectedChat?.isGroup?(<>
        <Text>{getSenderFull(user,selectedChat.users).userName}</Text>
        <ProfileModal user={getSenderFull(user,selectedChat.users)}/>
        </>):(<>
        <Text>{selectedChat?.chatName}</Text>
        <GroupInfoModal />
        </>)}
    </Box>
    <Box d="flex" flexDirection="column" justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="88%"
            borderRadius="lg"
            overflowY="hidden"
        >
            {loading?<Spinner height={20} width={20} size={'xl'} justifySelf={'center'} alignSelf={'center'}  />:(<>
            <Box height={'87%'}>
                <ScrollableChats messages={messages}/>
            </Box>
            </>)}
        <FormControl isRequired onKeyDown={(e)=>sendMessage(e)} mt={3}>
            <Input bgColor={'#E0E0E0'}  p={2} placeholder='Enter a message' value={newMessage} onChange={(e)=>typingHandler(e)}/>
        </FormControl>
    </Box>
    </>):(<>
    <Box height={'100%'} width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Text>Select a user to display chat</Text>
    </Box>
    </>)}
    </>
  )
}

export default SingleChat