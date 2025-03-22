import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar'
import MainChatBox from '../../Components/MainChatBox/MainChatBox'
import './ChatBox.css'

function ChatBox() {
  return (
    <div className="chat-box">
      <LeftSideBar />
      <MainChatBox />
    </div>
  )
}

export default ChatBox