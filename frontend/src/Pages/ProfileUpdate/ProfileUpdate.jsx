import { useContext, useState } from 'react'
import './ProfileUpdate.css'
import { AppContext } from '../../Context/AppContext'
import { GrGallery } from "react-icons/gr";

function ProfileUpdate() {
  const {currentUser, token} = useContext(AppContext);
  const [profileImg, setProfileImg] = useState(null);
  const [userBio, setUserBio] = useState({
    firstName: currentUser.firstName || '',
    lastName: currentUser.lastName || '',
    bio: currentUser.bio || '',
    contact: currentUser.phone_number || '',
    address: currentUser.address || '',
    username: currentUser.username || ''
  });
  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:8002/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          first_name: userBio.firstName,
          last_name: userBio.lastName,
          bio: userBio.bio,
          phone_number: userBio.contact,
          address: userBio.address,
          username: userBio.username
        }) 
      });
      console.log(userBio);
      const data = await response.json()
    } catch (error) {
      console.error('Error', error)
    }
  }
  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg(URL.createObjectURL(file));
    }
  }

  return (
    <div className="profile">
      <p className='profile-title'>Profile</p>
      <div className="profile-top">
        <img
         className="profile-img" 
         src={profileImg || currentUser.avatar || "src/assets/avatar.png"}
         alt="" />
        <div>
          <p>{currentUser.username}</p>
          <span>Software Engineer</span>
        </div>
      </div>
      <div className="bio">
        <div className="names">
          <div className="f-name" id='bio-rows'>
            <label htmlFor="">First Name</label>
            <input type="text" value={userBio.firstName} onChange={(e)=> setUserBio({
              ...userBio,
              firstName: e.target.value
            })}/>
          </div>
          <div className="l-name" id='bio-rows'>
            <label htmlFor="">Last Name</label>
            <input type="text" value={userBio.lastName} onChange={(e)=> setUserBio({
              ...userBio,
              lastName: e.target.value
            })}/>
          </div>
        </div>
        <div className="username" id='bio-rows'>
          <label>Username</label>
          <input type="text" value={userBio.username} onChange={(e)=> setUserBio({
            ...userBio,
            username: e.target.value
          })}/>
        </div>
      
        <div className="contact" id='bio-rows'>
          <label>Phone Number</label>
          <input type="text" value={userBio.contact} onChange={(e)=> setUserBio({
            ...userBio,
            contact: e.target.value
          })}/>
        </div>
        <div className="email"  id='bio-rows'>
          <label>Bio</label>
          <input type="text" value={userBio.bio} onChange={(e)=> setUserBio({
            ...userBio,
            bio: e.target.value
          })}/>
        </div>
        <div className="address" id='bio-rows'>
          <label>Address</label>
          <input type="text" value={userBio.address} onChange={(e)=> setUserBio({
            ...userBio,
            address: e.target.value
          })}/>
        </div>
        <div className="upload-pic">
          <p>Upload Profile image</p>
          <input type="file" accept='image/png, image/jpg, image/jpeg' hidden id='p-pic'
           onChange={handleProfileUpload}/>
          <label htmlFor="p-pic">
            <GrGallery className='g-icon'/>
          </label>
        </div>
        <button className='save-btn' onClick={handleSave}>Save</button>
      </div>
    </div>
  )
}

export default ProfileUpdate