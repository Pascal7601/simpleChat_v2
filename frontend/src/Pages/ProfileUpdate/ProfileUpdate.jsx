import './ProfileUpdate.css'

function ProfileUpdate() {
  return (
    <div className="profile">
      <p className='profile-title'>Profile</p>
      <div className="profile-top">
        <input type="file" id="image" accept="image/jpg, image/png" hidden/>
        <label htmlFor="image">
          <img className="profile-img" src="src/assets/avatar.png" alt="" />
        </label>
        <div>
          <p>Pascal</p>
          <span>Software Engineer</span>
        </div>
      </div>
      <div className="bio">
          <div className="about" id='bio-rows'>
            <p>Website</p>
            <span>pascalswe.com</span>
          </div>
          <div className="contact" id='bio-rows'>
            <p>Phone Number</p>
            <span>+254707377461</span>
          </div>
          <div className="email"  id='bio-rows'>
            <p>Email</p>
            <span>pascalswe@gmail.com</span>
          </div>
          <div className="address" id='bio-rows'>
            <p>Address</p>
            <span>Tom Mboya street</span>
          </div>
          <div className="city" id='bio-rows'>
            <p>City</p>
            <span>Nairobi</span>
          </div>
      </div>
    </div>
  )
}

export default ProfileUpdate