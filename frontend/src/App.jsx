import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login/Login'
import ChatBox from './Pages/ChatBox/ChatBox'
import ProfileUpdate from './Pages/ProfileUpdate/ProfileUpdate'
import { ToastContainer } from 'react-toastify';
import AppProvider from './Context/AppContext'


function App() {


  return (
    <>
    <ToastContainer />
    <AppProvider>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/chat' element={<ChatBox />}/>
        <Route path='/profile' element={<ProfileUpdate />}/>
      </Routes>
    </AppProvider>
      
    </>
  )
}

export default App
