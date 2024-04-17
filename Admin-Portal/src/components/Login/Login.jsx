// Login.jsx
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss'; // Import the SCSS file
import { checkValidData } from '../../utils/validate';

const Login = () => {
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async () => {
    // Handle login logic here
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;
    console.log(email.current.value);
    console.log(password.current.value);
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.current.value,
          password: password.current.value,
        }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      const token = data.token;
      const message = data.message;
      console.log(token + " " + message);
      localStorage.setItem("token",token);
      localStorage.setItem("email",email);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Invalid Email or password");
    }
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
                ref={email}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="input-label">Password</label>
              <input
                type="password"
                id="password"
                className="input-field"
                placeholder="Enter your password"
                ref={password}
              />
            </div>
            <p className="text-red-500 font-bold text-lg">{errorMessage}</p>
            <button className="login-button" onClick={handleLogin}>Sign In</button>
            <p className="signup-link">Don't have an account? <span className="signup-text">Sign up for free</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
