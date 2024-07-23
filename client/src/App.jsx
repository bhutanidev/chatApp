import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './page/Login'
import { Toaster } from 'react-hot-toast'
import Chatpage from './page/Chatpage'
import Logout from './page/Logout'
import Protected from './components/Protected'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='App'>
    <Routes>
    <Route path='/' element={<Login/>}/>
    {/* <Route path='/login' element={<Login/>}/> */}
    <Route element={<Protected/>}>
      <Route path='/chatpage' element={<Chatpage/>}/>
    {/* <Route path='/logout' element={<Logout/>}/> */}
    </Route>
    <Route path='/logout' element={<Logout/>}/>
    </Routes>
    </div>
    </>
  )
}

export default App
