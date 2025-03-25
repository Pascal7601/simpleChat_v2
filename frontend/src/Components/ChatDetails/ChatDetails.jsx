import './ChatDetails.css'
import { IoMdSend } from "react-icons/io";
import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../Context/AppContext';

function ChatDetails({ selectedUser, setSelectedUser }) {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [newChat, setNewChat] = useState([]);
  const {currentUser, token} = useContext(AppContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8001/users', {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        const data = await response.json()
        setUsers(data)
      }
      catch (error) {
        console.error('Error:', error)
      }
    }
    fetchUsers()
  }
  , [])

  useEffect(() => {
    const fetchChat = async () => {
      if(!selectedUser) return;
      try {
        const response = await fetch('http://localhost:8001/chats/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  
          },
          body: JSON.stringify({ receiver_id: selectedUser.id })
        })
        const data = await response.json()
        console.log(data);
        setNewChat(data);
      }
      catch (error) {
        console.error('Error:', error)
      }
    }
    fetchChat();
  }, [selectedUser])

  return (
    <>
    <div className="chat-details">
      {users.map(user => (
      <div onClick={()=> setSelectedUser(user)} className="chat-user" key={user.id}>
        <img className='avatar' src="src/assets/avatar.png" alt="" />
          <div className="friends">
          <p className="c-username">{user.username}</p>
          <span className='c-message'>Vipi</span>
        </div>
      </div>
      ))}
    </div>
    </>
  )
}

export default ChatDetails