import { useContext, useEffect, useState } from 'react';
import './MainChatBox.css'
import { FaPlus } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { AppContext } from '../../Context/AppContext';
import useWebSocket from '../../hooks/useWebSocket';

function MainChatBox({ selectedUser, newChat }) {
  const {currentUser, token} = useContext(AppContext);
  const [message, setMessage] = useState('');
  const {messages, sendMessage} = useWebSocket(newChat?.id, currentUser?.id);

  const handleSubmit = async () => {
    if(message.trim() === '') return;
    sendMessage({
      content: message,
      sender_id: currentUser.id,
      conversation_id: newChat.id
    });
    setMessage('');
  }


  return (
    selectedUser ? (
    <div className="main-chat">
      <div className="user">
        <img className='avatar' src="src/assets/avatar.png" alt="" />
        <div className='username'>
          <p>{ selectedUser.username}</p>
          <span>Online</span>
        </div>
      </div>

      <div className="chat-space">
        {messages.map((msg, index) => (
          <div key={msg.id || `temp-${index}`} className={msg.sender_id === currentUser.id ? 'msg-own' : 'new-msg'}>
            <p className='msg'>{msg.message}</p>
            <div>
            <span>{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        ))}
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
        <div className="main-chat">
          <img className='chat-icon' src="src/assets/app-icon.png" alt="" />
          <p className='select-user'>Your All Time Chat Application</p>
        </div>
      )
  )
}

export default MainChatBox