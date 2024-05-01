import React, { useState, useEffect, useRef } from 'react';
import './loginPage.css';
import { FaGooglePlusG } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

function PLoginPage() {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef(null);
  const registerBtnRef = useRef(null);
  const loginBtnRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const registerBtn = registerBtnRef.current;
    const loginBtn = loginBtnRef.current;

    const handleRegisterClick = () => {
      setIsActive(true);
    };

    const handleLoginClick = () => {
      setIsActive(false);
    };

    registerBtn.addEventListener('click', handleRegisterClick);
    loginBtn.addEventListener('click', handleLoginClick);

    return () => {
      registerBtn.removeEventListener('click', handleRegisterClick);
      loginBtn.removeEventListener('click', handleLoginClick);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }
      const data = await response.json();
      const { token, message } = data;

      localStorage.setItem('token', token);
      localStorage.setItem('email', message);
      navigate('/home');
    } catch (error) {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="screen">
      <div className='login-box' ref={containerRef}>
        <div className={`form-container sign-in ${isActive ? '' : 'active'}`}>
          {error && <p className="error-msg">{error}</p>}
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
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
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className={`hidden ${isActive ? '' : 'active'}`} ref={loginBtnRef} >Sign In</button>
            </div>
            <div className="image">
              <img src="https://cdn.dribbble.com/users/64533/screenshots/4593751/animated---medical-ai-v3.gif" alt="Background Image" />
              <button className={`hidden ${isActive ? 'active' : ''}`} ref={registerBtnRef}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default PLoginPage;
