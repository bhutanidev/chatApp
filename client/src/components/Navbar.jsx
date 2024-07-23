import { Box , InputGroup ,Menu,MenuButton, Input , InputLeftAddon , Text, Avatar, MenuList, MenuItem, MenuDivider, Button, Spinner} from '@chakra-ui/react'
import {SearchIcon , BellIcon} from '@chakra-ui/icons'
import {React,useContext, useState} from 'react'
import { ChatContext } from '../context/chatContext'
import ProfileModal from './ProfileModal'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { Toaster , toast } from 'react-hot-toast'
import { useDisclosure , Drawer  ,DrawerBody,DrawerFooter,  DrawerHeader, DrawerOverlay,  DrawerContent,  DrawerCloseButton, } from '@chakra-ui/react'
import SearchDisplay from './SearchDisplay'
import Chatloading from './Chatloading'


const Navbar = () => {
  const navigate = useNavigate()
  const{user , setUser , setSelectedChat ,selectedChat , chats , setChats} = useContext(ChatContext)
  const [search , setSearch] =  useState('')
  const [searchResult , setSearchResult] = useState([])
  const [loading , setLoading] = useState(false)
  const[loadingChat , setLoadingChat] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleLogout = async()=>{
    const response = await axios.get('/api/logout',{withCredentials:true})
    if(response.data.success){
      toast.success("Logged Out Successfully",{duration:1000})
      setUser(null)
      // navigate('/')
    }else if(response.data.error){
      setUser(null)
      navigate('/')
      toast.error("Some error occurred retry")
    }
  }
  const handleSearch = async()=>{
    setLoading(true)
    if(!search){
      toast.error("User cant be empty")
      setLoading(false)
      return
    }
    const response = await axios.get(`/api/user?search=${search}`)
    setChats(response.data)
    console.log(response.data);
    setLoading(false)
    setSearchResult(response.data)
  }
  const accessChat = async(userId)=>{
    setLoadingChat(true)
    try {
      const response = await axios.post('/api/chat',{userId})
      console.log('access chat',response.data);
      setSelectedChat(response.data)
      const {data}= await response
      if(!chats.find((c)=>{return c._id === data._id})){
        setChats([data,...chats])
      }
      console.log(chats);
      setLoadingChat(false)
      onClose()
    } catch (error) {
      setLoadingChat(false)
      toast.error("some error occured")

    }
  }
  return (
    <>
    <Toaster/>
    <Box display={'flex'} flexDirection={'row'} bgColor='white' height='7vh' alignItems='center' justifyContent='space-between'>
    <InputGroup padding={2} w={60}>
    <InputLeftAddon h={6} ><SearchIcon h={6} /></InputLeftAddon>
    <Button h={6} onClick={onOpen}>Search</Button>
    </InputGroup>
      <Text>Talk-More</Text>
      <Box paddingInlineEnd={3}>
      <Menu>
        <MenuButton><BellIcon fontSize='2xl'/></MenuButton>
</Menu>
<Menu>
        <MenuButton as='button'><Avatar name={user.username} src={user.pic} size='sm'/></MenuButton>
        <MenuList>
          <ProfileModal user={user}>
          <MenuItem>Profile</MenuItem>
          </ProfileModal>
          <MenuDivider/>
          <MenuItem onClick={handleLogout}>LogOut</MenuItem>
        </MenuList>
</Menu>
</Box>
    </Box>
    <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
      <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search user</DrawerHeader>

          <DrawerBody display='flex' flexDirection='column' >
            <Box display='flex'>
              <Input placeholder='Enter User' onChange={(e)=>setSearch(e.target.value)}/>
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            <Box display='flex' flexDirection={'column'} gap={1}>
              {/* {searchResult && searchResult.length!==0 ?searchResult.map((searchUser)=>{
                return(<SearchDisplay key={searchUser._id} pic={searchUser.pic} username={searchUser.userName} email={searchUser.email} handlefunction = {()=>{accessChat(searchUser._id)}}/>)
              }):null} */}
              {loading ? <Chatloading/> : searchResult?.map((searchUser)=>{
                return(<SearchDisplay key={searchUser._id} pic={searchUser.pic} username={searchUser.userName} email={searchUser.email} handlefunction = {()=>{accessChat(searchUser._id)}}/>)
              })}
            </Box>
            {loadingChat&&<Spinner d='flex' ml='auto'/>}
          </DrawerBody>
      </DrawerContent>
    </Drawer>
    </>
  )
}

export default Navbar