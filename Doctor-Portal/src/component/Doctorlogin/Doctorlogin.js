import React, { useState, useEffect, useRef } from 'react';
import './dloginstyle.css';
import axios from 'axios';
import nmimg from './namaskar.png';
import { FaGooglePlusG } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef(null);
  // const registerBtnRef = useRef(null);
  const loginBtnRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();

      // Send login request to backend
      try {
        const response = await fetch('http://localhost:8080/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          // const errorMessage = await response.text();
          throw new Error('Login failed');
        }
        const data = await response.json();
        const { token, message } = data;

        // Set patient's ID in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('email', message);

        const authtoken = localStorage.getItem('token');
      axios.get(`http://localhost:8080/doctor/doctor-details/${email}`, {
      headers: {
        'Authorization': `Bearer ${authtoken}`
      }
    })
    .then(response => {
      console.log(response.data);
      localStorage.setItem('loggedInDoctorId', response.data.id);
      console.log(response.data.id);
    })
    .catch(error => {
      console.error('Error fetching patient details:', error);
      // Handle error here
    });
        // console.log(token);
        navigate('/home');
      // Redirect to Home.js or any desired route
      } catch (error) {
        setError('Invalid phone number or password');
      }
    };

  // useEffect(() => {
  //   // const container = containerRef.current;
  //   // const registerBtn = registerBtnRef.current;
  //   const loginBtn = loginBtnRef.current;

  //   const handleRegisterClick = () => {
  //     setIsActive(true);
  //   };

  //   const handleLoginClick = () => {
  //     setIsActive(false);
  //   };

  //   registerBtn.addEventListener('click', handleRegisterClick);
  //   loginBtn.addEventListener('click', handleLoginClick);

    

  //   // Clean up event listeners
  //   return () => {
  //     registerBtn.removeEventListener('click', handleRegisterClick);
  //     loginBtn.removeEventListener('click', handleLoginClick);
  //   };
  // }, []);

  return (
    <div className="screen">
      <div className='login-box' ref={containerRef}>
      {/* <div className={`form-container sign-up ${isActive ? 'active' : ''}`}>
        <form>
          <h1>Create Account</h1>
          <div className="social-icons">
            <FaGooglePlusG />
          </div>
          <input type="text" placeholder="Name"/>
          <input type="email" placeholder="Email"/>
          <input type="password" placeholder="Password"/>
          <span>or use your email for registration</span>
          <button ref={registerBtnRef}>Sign Up</button>
        </form>
      </div> */}
      <div className="form-container">
      {error && <p style={{position:'absolute', top:'30px', left:'90px', color:'red'}}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>
          <div className="social-icons">
            <FaGooglePlusG />
          </div>
          <span>or use your email password</span>
          <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
          <a href="#">Forget Your Password?</a>
          <button type='submit' ref={loginBtnRef}>Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <img src={nmimg} style={{height: "300px"}}></img>
      </div>
    </div>
    </div>
    
  );
}

export default LoginPage;
