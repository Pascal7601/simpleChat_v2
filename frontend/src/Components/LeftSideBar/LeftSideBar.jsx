import ChatDetails from '../ChatDetails/ChatDetails';
import './LeftSideBar.css'
import { IoIosSearch } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

function LeftSideBar({ setSelectedUser, selectedUser, setNewChat, newChat, setChatHistory, chatHistory }) {
  const [dots, setDots] = useState(false);
  const menuRef = useRef(null);
  const {logout} = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setDots(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <div className={`l-bar ${selectedUser ? 'hide-on-mobile' : ''}`}>
      <div className="l-navbar">
        <img className='app-icon' src="src/assets/app-icon.png" alt="" />
        <div className="dot-container" ref={menuRef}>
          <HiOutlineDotsVertical className='dots' onClick={() => setDots(prev => !prev)}/>
          {dots &&
          <div className="option">
            <Link to='/profile'>
              <p className='profile-link'>Edit Profile</p>
            </Link>
            <hr />
            <p className='logout-btn' onClick={handleLogout}>Logout</p>
          </div>}
        </div>
      </div>
      <div className='search'>
        <IoIosSearch className='search-icon'/>
        <input type="text" placeholder='Search' />
      </div>
      <ChatDetails setSelectedUser={setSelectedUser} 
      selectedUser={selectedUser} setNewChat={setNewChat}
      newChat={newChat} setChatHistory={setChatHistory} 
      chatHistory={chatHistory}/>
    </div>
  )
}

export default LeftSideBar