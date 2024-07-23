import React, { useContext } from 'react'
import { Button } from '@chakra-ui/react'
import axios from 'axios'
import { ChatContext } from '../context/chatContext'


const Logout = () => {
  const{user} = useContext(ChatContext)
    const handleLogout = async()=>{
      console.log(user);
        const response = await axios.get('/api/protected',{withCredentials:true})
        console.log(response.data);
    }
  return (
    <>
    <Button onClick={handleLogout}>Logout</Button>
    </>
  )
}

export default Logout