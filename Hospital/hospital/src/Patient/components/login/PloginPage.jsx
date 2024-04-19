import React, { useState, useEffect, useRef } from 'react';
import './loginPage.css';
import { FaGooglePlusG } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
 import bg from './bg.mp4';
import { checkValidData } from '../../../utils/validate';

function PLoginPage() {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef(null);
  const registerBtnRef = useRef(null);
  const loginBtnRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSignin = async () => {
    const message = checkValidData(emailRef.current.value, passwordRef.current.value);
    setErrorMessage(message);
    if (message) return;
    // Authentication
  try {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("Login failed");
    }
    const data = await response.json();
    const { token, message } = data;
    console.log(token + " " + message);
    localStorage.setItem("token", token);
    localStorage.setItem("email", message);
    naviagte("/patient");
  } catch (error) {
    setErrorMessage("Invalid Email or password");
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
      {error && <p style={{position:'absolute', top:'30px', left:'90px', color:'red'}}>{error}</p>}
        <form onSubmit={(e) => e.preventDefault()}>
          <h1>Sign In</h1>
          <div className="social-icons">
            <FaGooglePlusG />
          </div>
          <span>or use your email password</span>
          <input ref={emailRef} type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
          <input ref={passwordRef} type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
          <p className="text-red-500 font-bold text-lg">{errorMessage}</p>
          <a href="#">Forget Your Password?</a>
          <button type='submit' ref={loginBtnRef} onClick={handleSignin}>Sign In</button>
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

export default PLoginPage;
