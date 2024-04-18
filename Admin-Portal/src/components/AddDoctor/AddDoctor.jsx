import React, { useState } from 'react';
import './AddDoctor.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDoctor = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigate = useNavigate();

  const handleAddDoctor = async () => {
    try { const response = await axios.post('http://localhost:8080/doctor/register',
     { name, email, password, gender, phoneNumber  // Include sdid in the request body 
    },
     {
       headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
       });
      if (response.status === 200) {
        console.log(response.data.message); // Log success message
        onClose(); // Close modal after successful registration
      }
    } catch (error) {
      console.error('Error registering doctor:', error);
    }
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
