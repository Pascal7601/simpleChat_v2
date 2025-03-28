import { useContext, useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import Login from './Pages/Login/Login'
import ChatBox from './Pages/ChatBox/ChatBox'
import ProfileUpdate from './Pages/ProfileUpdate/ProfileUpdate'
import { ToastContainer } from 'react-toastify';
import { AppContext } from './Context/AppContext'



function App() {
  const ProtectedRoute = ({ children }) => {
    const { token } = useContext(AppContext);
    if(!token) {
      return <Navigate to="/" />
    }
    return children;
  };


  return (
    <>
    <ToastContainer />
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/chat' element={
          <ProtectedRoute>
            <ChatBox />
          </ProtectedRoute>}/>
        <Route path='/profile' element={
            <ProtectedRoute>
              <ProfileUpdate />
            </ProtectedRoute>}/>
      </Routes>
      
    </>
  )
}

export default App
