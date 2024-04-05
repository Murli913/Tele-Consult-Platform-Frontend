import React, { useState, useEffect, useRef } from 'react';
import './loginPage.css';
import { FaGooglePlusG } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import bg from './videos/bg.mp4'; 

function LoginPage() {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef(null);
  const registerBtnRef = useRef(null);
  const loginBtnRef = useRef(null);
  const navigate = useNavigate();

  const handleSignClick = () => {
    navigate('/home');
  };

  useEffect(() => {
    const container = containerRef.current;
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
      <video autoPlay loop muted className="background-video">
        <source src={bg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
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
        <form>
          <h1>Sign In</h1>
          <div className="social-icons">
            <FaGooglePlusG />
          </div>
          <span>or use your email password</span>
          <input type="email" placeholder="Username"/>
          <input type="password" placeholder="Password"/>
          <a href="#">Forget Your Password?</a>
          <button ref={loginBtnRef} onClick={handleSignClick} >Sign In</button>
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
    </div>
    
  );
}

export default LoginPage;
