import './MainChatBox.css'
import { FaPlus } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";

function MainChatBox({ selectedUser }) {
  return (
    <div className="main-chat">
      <div className="user">
        <img className='avatar' src="src/assets/avatar.png" alt="" />
        <div className='username'>
          <p>{selectedUser ? selectedUser.username : 'Select a user to chat'}</p>
          <span>Online</span>
        </div>
      </div>
      <div className="chat-space">
        <div className="msg-own">
          <p className='msg'>Hello I sent something kindly confirm with those that are invloved...</p>
          <div>
            <span>12.30AM</span>
          </div>
        </div>
        <div className="new-msg">
          <img src="src/assets/pic1.jpg" alt="" className='img-pic'/>
          <div>
            <span>12.30AM</span>
          </div>
        </div>
        <div className="msg-own">
          <p className='msg'>Hello I sent something kindly confirm with those that are invloved...</p>
          <div>
            <span>12.30AM</span>
          </div>
        </div>
        <div className="new-msg">
          <p className='msg'>Hello I sent something kindly confirm with those that are invloved...</p>
          <div>
            <span>12.30AM</span>
          </div>
        </div>
        <div className="msg-own">
          <p className='msg'>Hello I sent something kindly confirm with those that are invloved...</p>
          <div>
            <span>12.30AM</span>
          </div>
        </div>
        <div className="new-msg">
          <p className='msg'>Hello I sent something kindly confirm with those that are invloved...</p>
          <div>
            <span>12.30AM</span>
          </div>
        </div>
        <div className="msg-own">
          <p className='msg'>Hello I sent something kindly confirm with those that are invloved...</p>
          <div>
            <span>12.30AM</span>
          </div>
        </div>
        <div className="new-msg">
          <p className='msg'>Hello I sent something kindly confirm with those that are really...</p>
          <div>
            <span>12.30AM</span>
          </div>
        </div>
      </div>
      <div className="msg-input">
        <input type="text" placeholder='type a message' className='input-msg'/>
        <input type="file" id='file' accept='image/png, image/jpg' hidden />
        <label htmlFor="file">
          <FaPlus className='file-icon'/>
        </label>
        <IoMdSend className='send-btn'/>
      </div>
    </div>
  )
}

export default MainChatBox