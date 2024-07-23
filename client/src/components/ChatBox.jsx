import React, { useContext } from 'react'
import { ChatContext } from '../context/chatContext'
import { Box } from '@chakra-ui/react'
import SingleChat from './SingleChat'

const ChatBox = () => {
  const{selectedChat, fetchChatsAgain , setFetchChatsAgain} = useContext(ChatContext)
  return (
    <Box d={{base:selectedChat ? "flex" : "none" , md:"flex"}}
    alignItems={'center'}
    flexDir={'column'}
    p={3}
    bgColor={'white'}
    w={{base:'100%' , md:'68%'}}
    borderRadius='lg'
    borderWidth='1px'
    >
      <SingleChat />
    </Box>
  )
}

export default ChatBox