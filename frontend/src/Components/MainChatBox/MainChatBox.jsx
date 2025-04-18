import { use, useContext, useEffect, useRef, useState } from 'react';
import './MainChatBox.css'
import { FaPlus } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { AppContext } from '../../Context/AppContext';
import useWebSocket from '../../hooks/useWebSocket';
import { Navigate, useNavigate } from 'react-router-dom';
import LeftSideBar from '../LeftSideBar/LeftSideBar';

function MainChatBox({ selectedUser, newChat, setSelectedUser }) {
  const {currentUser, token} = useContext(AppContext);
  const [message, setMessage] = useState('');
  const {messages, sendMessage, setMessages} = useWebSocket(newChat?.id, currentUser?.id);
  const [oldMessages, setOldMessages] = useState([]);
  const chatSpaceRef = useRef(null);
  const navigate = useNavigate()
 
  useEffect(() => {
    if(!newChat) return;
    const fetchMessages = async () => {
      try {
        setOldMessages([]);
        const response = await fetch(`https://simplechat-v2.onrender.com/messages/${newChat.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await response.json()
        setOldMessages(data)
      }
      catch (error) {
        console.error('Error:', error)
      }
    }
    fetchMessages();
  }
  , [newChat])

  const handleSubmit = async () => {
    if(message.trim() === '') return;
    sendMessage({
      content: message,
      sender_id: currentUser.id,
      conversation_id: newChat.id
    });
    setMessage('');
  }
  useEffect(() => {
    if(!chatSpaceRef.current) return;
    chatSpaceRef.current.scrollTop = chatSpaceRef.current.scrollHeight;
  }
  , [messages, oldMessages])

  const handleBack = () => {
    setSelectedUser(null);
    setMessages([]);
  }


  return (
    selectedUser ? (
    <div className={`main-chat ${selectedUser ? 'hide-main-on-mobile' : ''}`}>
      <div className="user">
        <img className='avatar' src={selectedUser?.avatar || "/avatar.png"} alt="" />
        <div className='username'>
          <p>{ selectedUser.username}</p>
          <span>Online</span>
        </div>
        <button className='back-btn' onClick={handleBack}>Back</button>
      </div>

      <div className="chat-space" ref={chatSpaceRef}>
        {/* <div className="chat-messages"> */}
        {[...oldMessages, ...messages]
        .filter(msg => msg.conversation_id === newChat?.id)
        .map((msg, index) => {
          const isOldMessage = oldMessages.some(oldMsg => oldMsg.id === msg.id);
      
          // Use timestamp from DB for old messages, otherwise use current time
          const messageTime = isOldMessage
            ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return (
          <div key={msg.id || `temp-${index}`} className={msg.sender_id === currentUser.id ? 'msg-own' : 'new-msg'}>
            <p className='msg'>{msg.content}</p>
            <div className='msg-time'>
            <span>{messageTime}</span>
            </div>
          </div>
        )})}
        {/* </div> */}
      </div>

      <div className="msg-input">
        <input type="text" placeholder='type a message' 
        className='input-msg'
        value={message}
        onChange={(e) => setMessage(e.target.value)}/>
        <input type="file" id='file' accept='image/png, image/jpg' hidden />
        <label htmlFor="file">
          <FaPlus className='file-icon'/>
        </label>
        <IoMdSend className='send-btn' 
        onClick={handleSubmit}/>
      </div>
    </div>
      ) 
      : (
        <div className={`main-chat ${selectedUser ? 'hide-main-on-mobile' : ''}`}>
          <div className="other-option">
            <img className='chat-icon' src="src/assets/app-icon.png" alt="" />
            <p className='select-user'>Chat Privately with SimChat</p>
          </div>
        </div>
      )
  )
}

export default MainChatBox