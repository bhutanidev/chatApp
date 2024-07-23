import React, { useContext, useState } from 'react'
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton, Box, Input, Button,} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import SearchDisplay from './SearchDisplay'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import UserBadgeItem from './UserBadgeItem'
import { ChatContext } from '../context/chatContext'
const GroupChatModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const[groupName , setGroupName] = useState()
    const[members  , setMembers] = useState([])
    const [searchUser,setSearchUser] = useState()
    const [searchResult , setSearchResult] = useState([])
    const{setChats,chats,setFetchChatsAgain , fetchChatsAgain} = useContext(ChatContext)
    const handleSearch = async(query)=>{
        setSearchUser(query)
        const response = await axios.get(`/api/user?search=${query}`)
        setSearchResult(response.data)
    }
    const handleSubmit = async()=>{
        if(!members || !groupName){
            toast.error("fill all the details")
            return
        }
        try {
            const response = await axios.post('/api/chat/group',{chatName:groupName,userList:JSON.stringify(members.map((member)=>member._id))})
            if(response.data.error){
                toast.error(response.data.error)
                return
            }else{
                toast.success('group created successfully')
            }

            setChats([response.data,...chats])
            // setFetchChatsAgain(!fetchChatsAgain)
            setMembers([])
            setGroupName('')
            setSearchUser('')
            onClose()
            
        } catch (error) {
            toast.error('Some error occured')
        }
    }
    const deleteMember = async(id)=>{
        setMembers(()=>{
            return members.filter((member)=>member._id!==id)
        })
    }
    const addToGroup = async(user)=>{
        // if(!members){
        //     toast.error('Select users')
        //     return
        // }
        if(members?.find((member)=>member._id===user._id)){
            toast.error('already in the group')
            return
        }
        try {
            setMembers([...members,user])
        } catch (error) {
            toast.error("An error occured")
        }
    }
  return (
    <>
    <Toaster/>
    <span onClick={onOpen}>{children}</span>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Group Chat</ModalHeader>
        <ModalCloseButton />
        <ModalBody display={'flex'} flexDirection={'column '} gap={2}>
          {/* <Text>Create Group Chat</Text> */}
          {/* <Box display={'flex'} gap={1}> */}
            <Input placeholder='Group Name' onChange={(e)=>setGroupName(e.target.value)}></Input>
          {/* </Box> */}
          <Input placeholder='Members' onChange={(e)=>handleSearch(e.target.value)}></Input>
          <Box>
          {searchResult?.slice(0,5).map((user)=><SearchDisplay key={user._id} username={user.userName} pic={user.pic} email={user.email} handlefunction={()=>addToGroup(user)}/>)}
          </Box>
          <Box display={'flex'} flexWrap={'wrap'}>
            {members?.map((member)=><UserBadgeItem key={member._id} user={member} handleFunction={()=>deleteMember(member._id)}/>)}
          </Box>
{/* render list */}
{/* display selected members */}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  )
}

export default GroupChatModal