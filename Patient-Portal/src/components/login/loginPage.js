import React, { useState, useEffect, useRef } from 'react';
import './loginPage.css';
import { FaGooglePlusG } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

function LoginPage() {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef(null);
  const loginBtnRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [otpemail, setOtpemail] = useState('');
  const [loginMethod, setLoginMethod] = useState('password');
  const [signvar, setSignvar] = useState('signin');
  const [userOtp, setUserOtp] = useState('');
  const [pname, setPname] = useState('');
  const [pemail, setPemail] = useState('');
  const [ppassword, setPpassword] = useState('');
  const [pgender, setPgender] = useState('');
  const [pmobile, setPmobile] = useState('');
  const [potp, setPotp] = useState('');
  const [otpValidate, setOtpValidate] = useState(false);
  const [signUpOtp, setSignUpOtp] = useState('');

  const handlePasswordClick = () => {
    setLoginMethod('password');
  };

  const handleOTPClick = () => {
    setLoginMethod('otp');
  };

  const handleSignUpVar = (e) => {
    e.preventDefault();
    setSignvar('signup');
  } 

  const handleSignInVar = (e) => {
    e.preventDefault();
    setSignvar('signin');
  }

  const handleGenderChange = (gender) => {
    setPgender(gender);
  }



    const handleLoginPassword = async (e) => {
      // e.preventDefault();

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



    const handleOTP = async() =>{
      const gen_otp = Math.floor(100000 + Math.random() * 900000);
      const temp = gen_otp.toString();
      setOtp(temp);
      console.log(temp);
      
      try{
        await axios.get(`http://localhost:8080/auth/send-otp`, {
          params:
          {
            email: otpemail,
            otp: temp
          }
        })
        toast.success("Email Sent Successfully!")
      }
      catch{
        toast.error("Please enter a registered email!")
      }
    };

    
    const handleSignupOTP = async() =>{
      const gen_otp = Math.floor(100000 + Math.random() * 900000);
      setSignUpOtp(gen_otp.toString());
      console.log(gen_otp.toString());
      try{
        const response = await axios.get(`http://localhost:8080/auth/send-signup-otp`, {
          params:
          {
            email: pemail,
            otp: gen_otp.toString()
          }
        })
        if(response === 'Email Already Exists!') toast.error("Email Already Exists!")
        else toast.success("Email Sent Successfully!")
      }
      catch{
        toast.error("Error Eending the Email!")
      }
    };

    const handleVerifyOtp = async() => {
      if(potp === signUpOtp){
        setOtpValidate(true);
        toast.success("OTP Verified!")
      }
      else toast.error("OTP doesn't match!");
    }

    const handleSignUp = async (e) => {
      e.preventDefault();
      if(otpValidate === true)
      {
        try {
          const response = await fetch('http://localhost:8080/auth/register/patient', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              name: pname,
              email: pemail,
              password: ppassword,
              phoneNumber: pmobile,
              gender: pgender
             }),
          });
          const data = await response.json();
          const { token, message } = data;
          if(message === "User Registration was Successful!!"){
            toast.success(message);
            setSignvar('signin'); 
          }
          else toast.error(message);
        } catch (error) {
          toast.error(error);
        }
      }
      else toast.error("Please Verify OTP!");    
    };

    const handleLoginOTP = async (e) => {
      e.preventDefault();
      console.log(otpemail);
      console.log(otp);
      console.log(userOtp);
      // const 
      try {
        const response = await fetch('http://localhost:8080/auth/login-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },  
          body: JSON.stringify({
            email: otpemail,
            otp_val: otp.toString(),
            otp_user: userOtp.toString(),
          }),
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


    


  return (
    <div className="screen">
      <div className='login-box' ref={containerRef}>
      <div className='form-container'>
        {signvar === 'signin' && (
          <form onSubmit={(e)=>{e.preventDefault();}}>
          <h1>Sign In</h1>
          <div className="up-btns">
          <button type="button" onClick={handlePasswordClick} className={loginMethod === 'password' ? 'active' : ''}>Password</button>
          <button type="button" onClick={handleOTPClick} className={loginMethod === 'otp' ? 'active' : ''}>OTP</button>
          </div><br />
          {loginMethod === 'password' && (
              <div className="sign-in-pw">
                <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <a href="#">Forget Your Password?</a>
                <button type='submit' onClick={handleLoginPassword}>Sign In</button>
                <span>Don't have an Account? <a href="" onClick={handleSignUpVar}>Sign Up</a></span>
              </div>
            )}
            {loginMethod === 'otp' && (
              <div className="sign-in-otp">
                <div className="otp-email-container">
                    <input type="email" value={otpemail} placeholder="Email" onChange={(e) => setOtpemail(e.target.value)} />
                    <span className="send-otp" onClick={handleOTP}>Send OTP</span>
                  </div>
                <input type="number" value={userOtp} placeholder="OTP" onChange={(e) => setUserOtp(e.target.value)} />
                <button type='submit' onClick={handleLoginOTP}>Sign In</button>
                <span>Don't have an Account? <a href="" onClick={handleSignUpVar}>Sign Up</a></span>
              </div>
            )}
        </form>
        )}
        {signvar === 'signup' && (
          <form onSubmit={(e)=>{e.preventDefault();}}>
            <h1>Sign Up</h1>
            <div className="sign-up-container">
              <input type="text" className='itext' value={pname} placeholder="Create Username" onChange={(e) => setPname(e.target.value)}/>
              <div className="otp-email-container">
                <input type="email" value={pemail} placeholder="Email" onChange={(e) => setPemail(e.target.value)} />
                <span className="send-otp" onClick={handleSignupOTP} style={{'margin-right':'5px', 'top':'50%'}}>Send OTP</span>
              </div>
              <div className="otp-email-container">
                <input type="number" value={potp} placeholder="Enter OTP" onChange={(e) => setPotp(e.target.value)} />
                <span className="send-otp" onClick={handleVerifyOtp} style={{'margin-right':'5px', 'top':'50%'}}>Verify OTP</span>
              </div>
              <input type="password" value={ppassword} placeholder="Create Password" onChange={(e) => setPpassword(e.target.value)} />
              <input type="number" value={pmobile} placeholder="Mobile Number" onChange={(e) => setPmobile(e.target.value)}/>
              <div className="genders">
                <h5 className={`gender ${pgender === 'Male' ? 'selected':''}`} onClick={() => handleGenderChange('Male')} style={{'padding':'5px 27px'}}>Male</h5>
                <h5 className={`gender ${pgender === 'Female' ? 'selected':''}`} onClick={() => handleGenderChange('Female')}>Female</h5>
              </div>
              <button type='submit' onClick={handleSignUp} style={{'padding':'10px 30px', 'margin':'5px'}}>Sign Up</button><br />
              <span style={{'margin-top':'5px'}}>Already Registered? <a href="" onClick={handleSignInVar}>Sign In</a></span>
            </div>
          </form>
        )}
      </div>
    </div>
    <ToastContainer />
    </div>
  );
}

export default LoginPage;