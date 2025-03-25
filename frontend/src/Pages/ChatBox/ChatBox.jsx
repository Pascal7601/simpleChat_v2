import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar'
import MainChatBox from '../../Components/MainChatBox/MainChatBox'
import './ChatBox.css'
import { useState } from 'react'

function ChatBox() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [newChat, setNewChat] = useState([]);

  return (
    <div className="chat-box">
      <LeftSideBar setSelectedUser={setSelectedUser} selectedUser={selectedUser} setNewChat={setNewChat}/>
      <MainChatBox selectedUser={selectedUser} newChat={newChat}/>
    </div>
  )
}

export default ChatBox