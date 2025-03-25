import ChatDetails from '../ChatDetails/ChatDetails';
import './LeftSideBar.css'
import { IoIosSearch } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";

function LeftSideBar({ setSelectedUser, selectedUser, setNewChat }) {

  return (
    <div className="l-bar">
      <div className="l-navbar">
        <img className='app-icon' src="src/assets/app-icon.png" alt="" />
        <div className="dot-container">
          <HiOutlineDotsVertical className='dots'/>
          <div className="option">
            <p>Edit Profile</p>
            <hr />
            <p>Logout</p>
          </div>
        </div>
      </div>
      <div className='search'>
        <IoIosSearch className='search-icon'/>
        <input type="text" placeholder='Search' />
      </div>
      <ChatDetails setSelectedUser={setSelectedUser} selectedUser={selectedUser} setNewChat={setNewChat}/>
    </div>
  )
}

export default LeftSideBar