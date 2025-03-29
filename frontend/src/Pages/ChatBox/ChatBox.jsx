import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar';
import MainChatBox from '../../Components/MainChatBox/MainChatBox'
import './ChatBox.css'
import { useState } from 'react'

function ChatBox() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [newChat, setNewChat] = useState(null);
  const [chatHistory, setChatHistory] = useState({});

  return (
    <div className="chat-box">
      <LeftSideBar setSelectedUser={setSelectedUser} 
      selectedUser={selectedUser} setNewChat={setNewChat}
      newChat={newChat} chatHistory={chatHistory} setChatHistory={setChatHistory}/>
      <MainChatBox selectedUser={selectedUser} newChat={newChat} setSelectedUser={setSelectedUser}/>
    </div>
  )
}

export default ChatBox