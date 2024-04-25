import React, { useState, useEffect, useRef } from 'react';
import './loginPage.css';
import { FaGooglePlusG } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
// import bg from './bg.mp4';
import 'react-toastify/dist/ReactToastify.css';
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

  const [isActiveTwo, setIsActiveTwo] = useState(false);

  const handleRegisterClick = () => {
    setIsActiveTwo(true);
  };

  const handleLoginClick = () => {
    setIsActiveTwo(false);
  };

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
        // console.log(token);
        navigate('/home');
      // Redirect to Home.js or any desired route
      } catch (error) {
        toast.error("Invalid Credentials");
        // setError('Invalid phone number or password');
      }
    };


  useEffect(() => {
    // const container = containerRef.current;
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

    

    // Clean up event listeners
    return () => {
      registerBtn.removeEventListener('click', handleRegisterClick);
      loginBtn.removeEventListener('click', handleLoginClick);
    };
  }, []);

  return (
    <div className="screen">
      {/* <video autoPlay loop muted className="background-video">
        <source src={bg} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
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
      <div className={`form-container sign-in ${isActive ? '' : 'active'}`}>
      {error && <p style={{position:'absolute', top:'30px', left:'90px', color:'red'}}>{error}</p>}
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
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of site features</p>
            <button className={`hidden ${isActive ? 'active' : ''}`} ref={registerBtnRef}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer />
    </div>
    
  );
}

export default PLoginPage;
