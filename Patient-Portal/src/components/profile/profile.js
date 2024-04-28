import React, { useState, useEffect } from 'react';
import './profile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function ProfilePage() {
  const navigate=useNavigate();
  useEffect(() => {
      if (!localStorage.getItem("token")) {
        navigate("/");
      } }, []);
  const [patientDetails, setPatientDetails] = useState(null);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

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

  const handleUpdateDetails = () => {
    const token = localStorage.getItem('token');
    const patientId = localStorage.getItem('patientId');
    axios.put(`http://localhost:8080/patient/upd-pat`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: {
        'patientId' : patientId,
        'email' : email,
        'phoneNumber' : phoneNumber,
        'name' : name,
        'password' : password
      }
    })
    .then(response => {
      toast.success("Details Updated Successfully!");
    })
    .catch(error => {
      toast.error("Error updating the details!");
    })
  };

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      {/* <h1>Profile</h1> */}
        <div className="profile-photo">
          {/* Profile photo goes here */}
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf1y2A8q1zP66KMRjOJZfXsbZKVuv1QmlyIOGTVH0J8A&s" alt="Profile" />
        </div>
      {patientDetails ? (
        <div className="personal-details">
          <input type="text" placeholder="Admin" value={patientDetails.name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="admin@gmail.com" value={patientDetails.email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="*********" value={patientDetails.password} onChange={(e) => setPassword(e.target.value)} />
          <input type="text" placeholder="9131487737" value={patientDetails.phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <button className="update-details-btn" onClick={handleUpdateDetails}>Update Details</button>
          {"  "}
          <button className="close-btn" >Close</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <ToastContainer />  
    </div>
  );
}

export default ProfilePage;
