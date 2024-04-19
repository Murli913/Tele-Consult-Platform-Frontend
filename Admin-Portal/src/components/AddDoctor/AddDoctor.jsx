import React, { useState } from 'react';
import './AddDoctor.scss';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const AddDoctor = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const [isSeniorDoctor, setIsSeniorDoctor] = useState(false);
  const [seniorDoctorId, setseniorDoctorId] = useState('');
  const navigate = useNavigate();

  const handleSeniorDoctorToggle = () => {
    setIsSeniorDoctor(!isSeniorDoctor);
    if (!isSeniorDoctor) {
      setseniorDoctorId(''); // Reset the senior doctor name when toggling off
    }
  };

  const onClose = () => {
    navigate("/doctordetails");
  };

  const handleAddDoctor = async () => {
    if (!email || !phoneNumber) {
      toast.error("Email and Phone Number are required.");
      setEmailError(!email);
      setPhoneNumberError(!phoneNumber);
      return;
    }
    
    // Email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      toast.error("Invalid email address.");
      setEmailError(true);
      return;
    }

    // Phone number validation regex pattern
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;

    if (!phonePattern.test(phoneNumber)) {
      toast.error("Invalid phone number format. Please enter in the format xxx-xxx-xxxx.");
      setPhoneNumberError(true);
      return;
    }

    if (seniorDoctorId === '') {
      setseniorDoctorId(null);
    }
    try {
      const response = await fetch('http://localhost:8080/admin/register/doctor', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      toast.success("Doctor Add successfully")
    } catch (error) {
      console.error('Error registering doctor:', error);
      toast.error("Error occurred while adding doctor");
    }
  };

  return (
    <div className="add-doctor-container">
      <div className="form-container">
        <h2>Add Doctor</h2>
        <div className="input-fields">
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={emailError ? 'error' : ''} />
          {emailError && <span className="error-message">* Required field</span>}
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input type="tel" className={`appearance-none ${phoneNumberError ? 'error' : ''}`} placeholder="Phone Number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          {phoneNumberError && <span className="error-message">* Required field</span>}
          <div className="senior-doctor-toggle">
            <label htmlFor='srDocToggle'>
              <input
                id='srDocToggle'
                type="checkbox"
                checked={isSeniorDoctor}
                onChange={handleSeniorDoctorToggle}
                className="mr-2"
              />
             Click on Checkbox{" "} to Add Sr Doctor 
            </label>

            {isSeniorDoctor && (
              <div className='srdoc'>
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
          {" "}{" "}
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
      <div className="image-container">
        <img src="https://cdn.dribbble.com/users/5194042/screenshots/14291793/media/9176d850065ae92a1f08cdf807eacf0a.gif" alt="Doctor Image" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddDoctor;
