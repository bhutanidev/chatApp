import { Button, Container, Text   } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import LoginForm from '../components/LoginForm'
import SignUp from '../components/SignUp'
import React, { useContext, useEffect } from 'react'
import { ChatContext } from '../context/chatContext'
import { Navigate, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const Login = () => {
  const {user} = useContext(ChatContext)
  // console.log("user",user)
  const navigate = useNavigate()
  // useEffect(()=>{
  //   if(user){
  //     navigate('/chatpage')
  //   }
  // },[user])
  if(user){
    return (<Navigate to='/chatpage'/>)
  }
  return (
    <>
    <Toaster/>
    <Container  bg={'white'} height='500px'>
        <Tabs variant='enclosed'>
  <TabList>
    <Tab w="50%">Login</Tab>
    <Tab w="50%">Sign-Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <LoginForm/>
    </TabPanel>
    <TabPanel>
      <SignUp/>
    </TabPanel>
  </TabPanels>
</Tabs>
    </Container>
    </>
  )
}

export default Login