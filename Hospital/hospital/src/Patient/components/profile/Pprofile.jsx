import React, { useState, useEffect } from 'react';
import './profile.css';
import axios from 'axios';

function PProfilePage() {
  const [patientDetails, setPatientDetails] = useState(null);

  useEffect(() => {
    // Fetch patient details from backend using the token
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    console.log(typeof email);
    // console.log(token);
    try {
      axios.get(`http://localhost:8080/patient/patient-details/${email}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log(response.data);
        // Handle response data here
      })
      .catch(error => {
        console.error('Error fetching patient details:', error);
        // Handle error here
      });
    } catch (error) {
      console.error('Error making request:', error);
      // Handle error here
    }
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  return (
    <div className="profile-content">
      <h1>Profile</h1>
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

export default PProfilePage;
