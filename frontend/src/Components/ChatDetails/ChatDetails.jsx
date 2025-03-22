import './ChatDetails.css'
import { IoMdSend } from "react-icons/io";

function ChatDetails() {

  return (
    <div className="chat-details">
      <div className="chat-user">
        <img className='avatar' src="src/assets/avatar.png" alt="" />
        <div className="friends">
          <p className="c-username">Fide</p>
          <span className='c-message'>Vipi</span>
        </div>
      </div>
      <div className="chat-user">
        <img className='avatar' src="src/assets/avatar.png" alt="" />
        <div className="friends">
          <p className="c-username">Sister</p>
          <span className='c-message'>Heyy</span>
        </div>
      </div>
      <div className="chat-user">
        <img className='avatar' src="src/assets/avatar.png" alt="" />
        <div className="friends">
          <p className="c-username">Mother</p>
          <span className='c-message'>Heyy</span>
        </div>
      </div>
      <div className="chat-user">
        <img className='avatar' src="src/assets/avatar.png" alt="" />
        <div className="friends">
          <p className="c-username">Sonia</p>
          <span className='c-message'>Heyy</span>
        </div>
      </div>
      <div className="chat-user">
        <img className='avatar' src="src/assets/avatar.png" alt="" />
        <div className="friends">
          <p className="c-username">Sonia</p>
          <span className='c-message'>Heyy</span>
        </div>
      </div>
    </div>
  )
}

export default ChatDetails