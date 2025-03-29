import './ChatDetails.css'
import { IoMdSend } from "react-icons/io";
import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../Context/AppContext';
import useWebSocket from '../../hooks/useWebSocket';

function ChatDetails({ selectedUser, setSelectedUser, setNewChat, newChat, setChatHistory, chatHistory }) {
  const [users, setUsers] = useState([]);
  const {currentUser, token} = useContext(AppContext);
  const {messages, sendMessage} = useWebSocket(newChat?.id, currentUser?.id, setChatHistory, chatHistory, selectedUser);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://simplechat-v2.onrender.com/users', {
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
        const response = await fetch('https://simplechat-v2.onrender.com/chats/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ receiver_id: selectedUser.id })
        })
        const data = await response.json()
        setNewChat(data);
      }
      catch (error) {
        console.error('Error:', error)
      }
    }
    fetchChat();
  }, [selectedUser])

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch('https://simplechat-v2.onrender.com/chats', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();

        // Map chat history by user ID
        const chatData = {};
        data.forEach(chat => {
          const otherUser = chat.participants.find(user => user.id !== currentUser.id);
          if (otherUser) {
            chatData[otherUser.id] = chat?.last_message?.content || "";
          }
        });
        console.log(chatData);
        setChatHistory(chatData);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchChats();
  }, [token, currentUser]);


  return (
    <>
    <div className="chat-details">
      {users
      .filter(user => user.id !== currentUser.id)
      .map(user => (
      <div onClick={()=> setSelectedUser(user)} className="chat-user" key={user.id}>
        <img className='avatar' src={user?.avatar || "/avatar.png"} alt="" />
          <div className="friends">
          <p className="c-username">{user.username}</p>
          <span className='c-message'>
            {chatHistory[user.id] || ''}
          </span>
        </div>
      </div>
      ))}
    </div>
    </>
  )
}

export default ChatDetails