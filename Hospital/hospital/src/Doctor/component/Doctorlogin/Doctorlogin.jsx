// DoctorLogin.js
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./dloginstyle.css";
import { checkValidData } from '../../../utils/validate';

const DoctorLogin = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:8080/auth/doc/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email.current.value, password: password.current.value }),
        });

        if (!response.ok) {
            const errorMessage = await response.text(); // Get error message from response body
            throw new Error(errorMessage || 'Login failed');
        }

        const data = await response.json();
        const token = data.token;
        const message = data.message;

        localStorage.setItem('token', token);
        localStorage.setItem('email', message);

        navigate('/dhome');
    } catch (error) {
        console.error('Login error:', error.message);
        setError('Invalid email or password');
    }
};

  return (
    <div className='dcontainer'>
      <h2>Doctor Login</h2>
      {error && <p>{error}</p>}
      <form className='loginform' onSubmit={handleSubmit}>
        <div className='dc1'>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email"
            ref={email}
          />
        </div>
        <div className='dc2'>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            ref={password}
          />
        </div>
        <button type="submit">Login</button>  
      </form>
    </div>
  );
};

export default DoctorLogin;
