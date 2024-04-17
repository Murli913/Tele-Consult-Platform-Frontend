import React, { useState } from 'react';
import './Profile.scss'; // Import the SCSS file for styling

const Profile = ({ onClose }) => {
  useEffect(() => {
    if(localStorage.getItem("token") === null)
    {
      navigate("/");
    }
  }, []);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleUpdateDetails = () => {
    // Handle update details logic here
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="profile-photo">
        {/* Profile photo goes here */}
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf1y2A8q1zP66KMRjOJZfXsbZKVuv1QmlyIOGTVH0J8A&s" alt="Profile" />
      </div>
      <div className="personal-details">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        <button className="update-details-btn" onClick={handleUpdateDetails}>Update Details</button>
        {"  "}
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Profile;
