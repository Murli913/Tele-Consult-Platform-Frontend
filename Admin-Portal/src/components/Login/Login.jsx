// Login.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss'; // Import the SCSS file

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Handle login logic here
    navigate("/seniordoctor"); // Navigate to senior doctor page after successful login
  };

  return (
    <div className="login-container">
      <div className="login-dialog">
        {/* Left Column */}
        <div className="left-column">
          <img
            src="https://i.pinimg.com/originals/b8/23/e3/b823e38cc01fdb9278b6f7faa2feda6d.gif"
            alt="Doctor"
            className="login-image"
          />
        </div>
        {/* Right Column */}
        <div className="right-column">
          <div className="login-form">
            <h1 className="login-heading">Welcome back</h1>
            <p className="login-subheading">Please enter your details</p>
            <div className="input-group">
              <label htmlFor="email" className="input-label">Email</label>
              <input
                type="email"
                id="email"
                className="input-field"
                placeholder="Enter your email"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="input-label">Password</label>
              <input
                type="password"
                id="password"
                className="input-field"
                placeholder="Enter your password"
              />
            </div>
            <button className="login-button" onClick={handleLogin}>Sign In</button>
            <button className="google-login-button">
              <img
                src="https://cdn-teams-slug.flaticon.com/google.jpg"
                alt="Google"
                className="google-icon"
              />
              Sign in with Google
            </button>
            <p className="signup-link">Don't have an account? <span className="signup-text">Sign up for free</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
