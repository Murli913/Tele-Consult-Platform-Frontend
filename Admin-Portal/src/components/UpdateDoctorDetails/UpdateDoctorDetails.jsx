import React, { useState } from 'react';
import './UpdateDoctorDetails.scss';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const UpdateDoctorDetails = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const location = useLocation();
  const { doctorId } = location.state;

  const navigate = useNavigate();

  const onClose = () => {
    navigate("/doctordetails");
  };

  const handleUpdateDoctor = async () => {
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

    try {
      const response = await axios.put(`http://localhost:8080/doctor/${doctorId}`, {
        name: name,
        gender: gender,
        phoneNumber: phoneNumber,
        email: email,
      }, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
      });
      if (response.status === 200) {
        console.log(response.data);
        onClose();
        toast.success("Doctor details updated successfully");
      }
    } catch (error) {
      console.error('Error updating doctor details:', error);
      toast.error("Error occurred while updating doctor details");
    }
  };

  return (
    <div className="update-doctor-container">
      <div className="form-container">
        <h2>Update Doctor Details</h2>
        <div className="input-fields">
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={emailError ? 'error' : ''} />
          {emailError && <span className="error-message">Invalid email address</span>}
          <input type="text" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} />
          <input type="tel" placeholder="Phone Number (xxx-xxx-xxxx)" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className={phoneNumberError ? 'error' : ''} />
          {phoneNumberError && <span className="error-message">Invalid phone number format</span>}
        </div>
        <button className="update-btn" onClick={handleUpdateDoctor}>Update</button>
        {" "} {" "} {" "}
        <button className="update-btnn" onClick={onClose}>close</button>
      </div>
      <div className="image-container"> <img src="https://cdn.dribbble.com/users/514480/screenshots/2091133/media/707a1f1c7d082f47858b783edaf64129.gif" alt="Doctor Image" /> </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateDoctorDetails;
