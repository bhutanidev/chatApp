import { Button, FormControl, VStack , FormLabel,Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

    const[userData , setUserData] = useState({email:'',password:'',username:'',pic:''})
    const navigate = useNavigate()
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const response = await axios.post('/api/register',{...userData})
        console.log(response.data)
        if(response.data.error){
          toast.error(response.data.error)
        }
        navigate('/chatpage')
    }
  return (<>
    <Toaster/>
    <VStack spacing='5px'>
        <form onSubmit={(e)=>handleSubmit(e)}>
        <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input type='email' value={userData.email} onChange={(e)=>{setUserData({...userData,email:e.target.value})}}/>
        </FormControl>
        <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type='password' value={userData.password} onChange={(e)=>{setUserData({...userData,password:e.target.value})}} />
        </FormControl>
        <FormControl>
            <FormLabel>User Name </FormLabel>
            <Input type='text' value={userData.name} onChange={(e)=>{setUserData({...userData,username:e.target.value})}} />
        </FormControl>
        <FormControl>
            <FormLabel>Profile picture</FormLabel>
            <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
        </FormControl>
        <Button marginBlockStart='5px'
        type='submit'
        >Sign Up</Button>
        </form>
    </VStack>
    </>
  )
}

export default SignUp