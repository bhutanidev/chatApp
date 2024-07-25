import React, { useContext, useState } from 'react'
import { ChatContext } from '../context/chatContext'
import {Box, Input,Button, FormControl, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { ViewIcon } from '@chakra-ui/icons'
import UserBadgeItem from './UserBadgeItem'

const GroupInfoModal = () => {
    const{user,selectedChat,setSelectedChat,fetchChatsAgain , setFetchChatsAgain} = useContext(ChatContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [newGroupName , setNewGroupName] = useState('')
    // console.log(selectedChat);
    const deleteMember = async(userId,groupId)=>{
        const response = await axios.put('/api/chat/removegroup',{userId,groupId})
        if(response.data.deleted){
          setSelectedChat(null)
        }
        if(response.data.error){
            toast.error(response.data.error)
            return
        }else{
            setSelectedChat(response.data)
            toast.success('Successfully removed')
        }
    }
    const updateName = async(groupId)=>{
        const response = await axios.put('/api/chat/renamegroup',{groupId,newName:newGroupName})
        if(response.data.error){
            toast.error(response.data.error)
            return
        }else{
            setSelectedChat(response.data)
            toast.success('Renamed group')
            setFetchChatsAgain(!fetchChatsAgain)
            onClose()
        }
    }
    const leaveGroup = async(userId,groupId)=>{
        const response = await axios.put('/api/chat/removegroup',{userId,groupId})
        if(response.data.error){
            toast.error(response.data.error)
            return
        }else{
            setSelectedChat(null)
            setFetchChatsAgain(!fetchChatsAgain)
        }
    }
  return (
    <>
    <Toaster/>
    <IconButton icon={<ViewIcon/>} onClick={onOpen}/>
        <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Group Info : {selectedChat.chatName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody display={'flex'} flexDirection={'column '} gap={2}>
            <FormControl>
                <Box display={'flex'} gap={1}>
                <Input placeholder='Enter New Group Name' onChange={(e)=>setNewGroupName(e.target.value)}/>
                <Button onClick={()=>updateName(selectedChat._id)}>Update</Button>
                </Box>
            </FormControl>
          <Text>Members</Text>
          <Box display={'flex'} flexWrap={'wrap'}>
            {selectedChat?.users?.map((member)=><UserBadgeItem key={member._id} user={member} handleFunction={()=>deleteMember(member._id,selectedChat._id)}/>)}
          </Box>
{/* render list */}
{/* display selected members */}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='red' mr={3} onClick={()=>leaveGroup(user._id,selectedChat._id)}>
            leave
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  )
}

export default GroupInfoModal