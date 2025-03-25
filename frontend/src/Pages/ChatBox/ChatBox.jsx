import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar'
import MainChatBox from '../../Components/MainChatBox/MainChatBox'
import './ChatBox.css'
import { useState } from 'react'

function ChatBox() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="chat-box">
      <LeftSideBar setSelectedUser={setSelectedUser} selectedUser={selectedUser}/>
      <MainChatBox selectedUser={selectedUser}/>
    </div>
  )
}

export default ChatBox