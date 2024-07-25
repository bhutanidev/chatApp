import { Button, FormControl, VStack , FormLabel,Input } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import {Navigate , useNavigate} from 'react-router-dom'
import { ChatContext } from '../context/chatContext';

const LoginForm = () => {
    const navigate = useNavigate()
    const[userData , setUserData] = useState({email:'',password:''})
    const{user,setUser} = useContext(ChatContext)
    const handleSubmit = async(e)=>{
        e.preventDefault()
        // console.log({...userData})
        try {
            const response = await axios.post('/api/login',{email:userData.email,password:userData.password})
            // console.log(response.data);
            console.log(user);
            if(response.data.success){
                setUser(response.data.user)
                navigate('/chatpage')
            }
        } catch (error) {
            console.log(error);
            if(error.response.status === 401){
                toast.error('Incorrect email or password');
            }
        }
    }
  return (
    <>
    <Toaster/>
        <form onSubmit={(e)=>handleSubmit(e)}>
    <VStack spacing='5px'>
        <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input type='email' value={userData.email} onChange={(e)=>{setUserData({...userData,email:e.target.value})}}/>
        </FormControl>
        <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type='password' value={userData.password} onChange={(e)=>{setUserData({...userData,password:e.target.value})}} />
        </FormControl>
        <Button marginBlockStart='5px'
        type='submit'
        >Login</Button>
    </VStack>
        </form>
    </>
  )
}

export default LoginForm