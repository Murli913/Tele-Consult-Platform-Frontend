import React, { useState, useEffect } from 'react';
import './profile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const navigate=useNavigate();
  useEffect(() => {
      if (!localStorage.getItem("token")) {
        navigate("/");
      } }, []);
  const [patientDetails, setPatientDetails] = useState(null);

  useEffect(() => {
    // Fetch patient details from backend using the token
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    
    // console.log("Email:", email);
    // console.log("Token:", token);

    axios.get(`http://localhost:8080/patient/patient-details/${email}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      // console.log(response.data);
      localStorage.setItem('patientId', response.data.id);
      // Handle response data here
      setPatientDetails(response.data); // Assuming response.data contains patient details
    })
    .catch(error => {
      console.error('Error fetching patient details:', error);
      // Handle error here
    });
  }, []);  // Empty dependency array ensures useEffect runs only once after initial render

  return (
    <div className="profile-content">
      <h2>Profile</h2>
      {patientDetails ? (
        <div>
          <p>Name: {patientDetails.name}</p>
          <p>Email: {patientDetails.email}</p>
          <p>Gender: {patientDetails.gender}</p>
          <p>Phone Number: {patientDetails.phoneNumber}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProfilePage;
