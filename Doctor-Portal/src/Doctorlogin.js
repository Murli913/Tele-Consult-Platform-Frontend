// DoctorLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./dloginstyle.css";

const DoctorLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send login request to backend
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }
      const data = await response.json();
      const { doctorId } = data;

      // Set doctor's ID in localStorage
      localStorage.setItem('loggedInDoctorId', doctorId);
      navigate('/home');
     // Redirect to Home.js or any desired route
    } catch (error) {
      setError('Invalid phone number or password');
    }
  };

  return (
    <div className='dcontainer'>
      <h2>Doctor Login</h2>
      {error && <p>{error}</p>}
      <form className='loginform' onSubmit={handleSubmit}>
        <div className='dc1'>
          <label htmlFor="phoneNumber">Phnnumbr:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className='dc2'>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default DoctorLogin;
