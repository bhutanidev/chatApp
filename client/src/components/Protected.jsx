import React, { useContext } from 'react'
import { ChatContext } from '../context/chatContext'
import Login from '../page/Login'
import { Outlet , useNavigate , Navigate } from 'react-router-dom'
const Protected = () => {
    const navigate = useNavigate()
    const{user} = useContext(ChatContext)
    return (user?<Outlet/>:<Navigate to='/'/>)
}

export default Protected