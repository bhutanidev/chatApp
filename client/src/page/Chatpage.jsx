import axios from 'axios'
import { Button, Container, Text , Box   } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/chatContext'
import ChatBox from '../components/ChatBox'
import Chats from '../components/Chats'
const Chatpage = () => {
  const {user} = useContext(ChatContext)
  // const[fetchChats,setFetchChats] = useState(false)
  // console.log(user);
  return (
    <>
    <Navbar/>
    {/* user&&<SideDrawer/> */}
    <Box display='flex' padding={5} height='91vh' flexDirection={'row'} justifyContent={'space-between'}>
      <Chats />
      <ChatBox />
    </Box>

    </>
  )
}

export default Chatpage