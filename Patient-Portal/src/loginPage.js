import React, { useState } from 'react';
import './loginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('login');

  const handleLogin = () => {
    // Perform validation for login
    if (username === 'admin' && password === 'password') {
      console.log('Login successful');
      // You can redirect the user to another page or perform any other action upon successful login
    } else {
      setError('Invalid username or password');
    }
  };

  const handleRegister = () => {
    // Perform validation for registration
    if (password !== confirmPassword) {
      setError("Passwords don't match");
    } else {
      console.log('Registration successful');
      // You can handle the registration logic here
    }
  };

  return (
    <div className='login-box'>
      <div className='images'>
        <img src="./images/sample.avif" className='sample-img' alt="" />
      </div>
      <div className="content">
        <h1>Welcome!</h1>
        <button className={activeTab === 'login' ? 'log active' : 'log'} onClick={() => setActiveTab('login')}>Login</button>
        <button className={activeTab === 'register' ? 'reg active' : 'reg'} onClick={() => setActiveTab('register')}>Register</button>

        {activeTab === 'login' && (
          <div className="log-content">
            <input type="text" className='input-log-text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/><br />
            <input type="password" className='input-log-text' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/><br />
            <button className='login-btn' onClick={handleLogin}>LOGIN</button>
            {error && <p className="error">{error}</p>}
          </div>
        )}

        {activeTab === 'register' && (
          <div className="reg-content">
            <input type="text" className='input-reg-text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/><br />
            <input type="password" className='input-reg-text' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/><br />
            <input type="password" className='input-reg-text' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/><br />
            <input type="text" className='input-reg-text' placeholder='Mobile Number' value={mobile} onChange={(e) => setMobile(e.target.value)}/><br />
            <button className='reg-btn' onClick={handleRegister}>REGISTER</button>
            {error && <p className="error">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
} 

export default LoginPage;
