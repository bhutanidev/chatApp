import {React,useContext, useEffect} from 'react'
import axios from 'axios'
import { ChatContext } from '../context/chatContext'
import toast, { Toaster } from 'react-hot-toast'
import { Box, Button, Stack, Text } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import Chatloading from './Chatloading'
import getSender from '../helpers/senderName'
import GroupChatModal from './GroupChatModal'


const Chats = () => {

  const{user , setUser , setSelectedChat ,selectedChat , chats , setChats , fetchChatsAgain} = useContext(ChatContext)
  const fetchChats = async()=>{
    try {
      const response = await axios.get('/api/chat',{withCredentials:true})
      setChats(response.data)
    } catch (error) {
      toast.error("An error occured")
    }
  }
  useEffect(()=>{
    fetchChats();
  },[fetchChatsAgain])
  return (
    <>
    <Box d={{base:selectedChat ? "none" : "flex" , md:"flex"}} flexDir='column' bgColor={'white'} borderRadius="lg" h='100%' w={400}>
      <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Text>My Chats</Text>
        <GroupChatModal>
          <Button rightIcon={<AddIcon/>}>New Group Chat</Button>
        </GroupChatModal>
      </Box>
      <Box display={'flex'} flexDirection={'column'} p={2} overflowY={'hidden'} w='100%' >
        <Stack overflowY={scroll} gap={3}>
        {chats ? chats.map((chat)=>{
          return(
            <Box  onClick={()=>setSelectedChat(chat)} borderRadius={4} px={2} py={3} key={chat._id} bg={selectedChat===chat ? '#38B2AC' : '#E8E8E8'} color={selectedChat===chat ? 'white' : 'black' } cursor={'pointer'}>
              <Text>{!chat.isGroup ? getSender(user,chat.users): chat.chatName}</Text>
              {/* <Text>{chat.chatName}</Text> */}
            </Box>
          )
        }) : (<Chatloading/>)}
        </Stack>
      </Box>

    </Box>
    <Toaster/>
    </>
  )
}

export default Chats