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

  const [isSeniorDoctor, setIsSeniorDoctor] = useState(false);
  const [seniorDoctorId, setseniorDoctorId] = useState('');

  const handleSeniorDoctorToggle = () => {
      setIsSeniorDoctor(!isSeniorDoctor);
      if (!isSeniorDoctor) {
          setseniorDoctorId(''); // Reset the senior doctor name when toggling off
      }
  };

  const handleAddDoctor = async () => {
    if(seniorDoctorId === '')
    {
      setseniorDoctorId(null);
    }
    try { const response = await fetch('http://localhost:8080/admin/register/doctor',{
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        name: name,
        gender: gender,
        phoneNumber: phoneNumber,
        email: email,
        supervisorDoctor: seniorDoctorId
      }),
    });
      if (response.status === 200) {
        console.log(response.data);
        onClose();
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
          <input type="text" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} />
          <input type="tel" className='appearance-none' placeholder="Phone Number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <div>
            <label>
                <input 
                    id='srDocToggle'
                    type="checkbox" 
                    checked={isSeniorDoctor} 
                    onChange={handleSeniorDoctorToggle} 
                    className="mr-2"
                />
                Sr Doctor
            </label>

            {isSeniorDoctor && (
                <div>
                    <input 
                        type="number" 
                        placeholder="Senior Doctor ID" 
                        value={seniorDoctorId} 
                        onChange={(e) => setseniorDoctorId(e.target.value)} 
                        className="mt-2 p-2 border border-gray-300 rounded-md"
                    />
                </div>
            )}
        </div>
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
