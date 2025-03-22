import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login/Login'
import ChatBox from './Pages/ChatBox/ChatBox'
import ProfileUpdate from './Pages/ProfileUpdate/ProfileUpdate'

function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/chat' element={<ChatBox />}/>
      <Route path='/profile' element={<ProfileUpdate />}/>
    </Routes>
      
    </>
  )
}

export default App
