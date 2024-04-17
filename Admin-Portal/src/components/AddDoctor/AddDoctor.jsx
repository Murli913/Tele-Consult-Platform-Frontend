import React, { useState } from 'react';
import './AddDoctor.scss'; // Import the SCSS file for styling

const AddDoctor = ({ onClose, onAddDoctor }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Function to handle adding a new doctor
  const handleAddDoctor = () => {
    // Perform validation if needed
    const newDoctor = {
      name,
      email,
      password,
      gender,
      phoneNumber
    };
    onAddDoctor(newDoctor);
    // Clear input fields after adding doctor
    setName('');
    setEmail('');
    setPassword('');
    setGender('');
    setPhoneNumber('');
  };

  return (
    <div className="add-doctor-container">
      <div className="form-container">
        <h2>Add Doctor</h2>
        <div className="input-fields">
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="text" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} />
          <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <button className="add-doctor-btn" onClick={handleAddDoctor}>Add Doctor</button>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
      <div className="image-container">
        <img src="https://cdn.dribbble.com/users/5194042/screenshots/14291793/media/9176d850065ae92a1f08cdf807eacf0a.gif" alt="Doctor Image" />
      </div>
    </div>
  );
};

export default AddDoctor;
