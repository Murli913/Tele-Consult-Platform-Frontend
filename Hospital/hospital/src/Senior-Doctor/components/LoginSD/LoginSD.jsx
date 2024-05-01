import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkValidData } from "../../../utils/validate";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const LoginSD = () => {
  const naviagte = useNavigate();

  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const gotosd = async () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;
    console.log(typeof email.current.value);
    console.log(typeof password.current.value);
    // Authentication
    try {
      const emailValue = email.current.value.toString();
      const passwordValue = password.current.value.toString();

      const response = await axios.post(
        "http://localhost:8080/auth/srdoc/login",
        {
          email: emailValue,
          password: passwordValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Called!!");
      console.log(response.data.token);
      const token = response.data.token;
      console.log(token);
      const message = response.data.message;
      console.log(token + " " + message);
      localStorage.setItem("token", token);
      localStorage.setItem("email", message);
      toast.success("Login successfully");
      setTimeout(() => {
        naviagte("/maindash");
      }, 1000);
    } catch (error) {
      toast.error("Error occurred while login");
      console.log(error);
      setErrorMessage("Invalid Email or password");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* Left side */}
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Welcome back</span>
          <span className="font-light text-gray-400 mb-8">
            Welcome back! Please enter your details
          </span>

          <div className="py-4">
            <span className="mb-2 text-md">Email</span>
            <input
              ref={email}
              type="email"
              name="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Password</span>
            <input
              ref={password}
              type="password"
              name="pass"
              id="pass"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <div className="flex justify-between w-full py-4">
            <div className="mr-24">
              <input type="checkbox" name="ch" id="ch" className="mr-2" />
              <span className="text-md">Remember for 30 days</span>
            </div>
            <span className="font-bold text-md">Forgot password</span>
          </div>
          <p className="text-red-500 font-bold text-lg">{errorMessage}</p>
          <button
            className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
            onClick={gotosd}
          >
            Sign in
          </button>
        </div>
        {/* Right side */}
        <div className="relative">
          <img
            src="https://media.baamboozle.com/uploads/images/75518/1593048433_804210"
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginSD;
