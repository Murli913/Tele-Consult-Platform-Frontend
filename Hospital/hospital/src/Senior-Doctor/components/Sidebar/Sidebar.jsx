import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { UilSignOutAlt, UilBars } from "@iconscout/react-unicons";
import { FaUserDoctor } from "react-icons/fa6";
import { FaPerson } from "react-icons/fa6";
import { FaAppStore } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const Sidebar = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } 
},[]);
  const [selected, setSelected] = useState(null);
  const [expanded, setExpanded] = useState(true);
  

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };
 

const handleSignOut = () => {
    localStorage.clear(); 
    toast.success("Logout successfully");
    setTimeout(() => {
      navigate("/");
    }, 1000);
   
};

  const gotologin = () => {
    navigate("/login");
  };

  return (
    <>
      <div
        className={`bars ${expanded ? 'expanded' : ''}`}
        style={{ left: `${expanded ? '60%' : '5%'}` }}
        onClick={toggleSidebar}
      >
        <UilBars size="32" />
      </div>
      <div className={`sidebar ${expanded ? 'expanded' : ''}`}>
      <div className="logo">
        <FaUserDoctor/>
       </div>
       <br/>
        <div className="logo">
         
        
          <span>SeniorDoctor</span>
        </div>
        <div className="menu">
          <Link
            to="/maindash"
            className={`menuItem ${selected === "dashboard" ? "active" : ""}`}
            onClick={() => setSelected("dashboard")}
          >
            <BiSolidDashboard />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/sappointments"
            className={`menuItem ${selected === "appointments" ? "active" : ""}`}
            onClick={() => setSelected("appointments")}
          >
            <FaAppStore />
            <span>Appointments</span>
          </Link>
          <Link
            to="/spatienthistory"
            className={`menuItem ${selected === "patient-history" ? "active" : ""}`}
            onClick={() => setSelected("patient-history")}
          >
            <FaPerson />
            <span>Patient List</span>
          </Link>
          <Link
            to="/doctorundersenior"
            className={`menuItem ${selected === "doctors" ? "active" : ""}`}
            onClick={() => setSelected("doctors")}
          >
            <FaUserDoctor />
            <span>Doctors</span>
          </Link>
          <div className="menuItem" onClick={() => setSelected(null)}>
            <UilSignOutAlt />
            <button onClick={handleSignOut}>Sign Out</button>

          </div>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
};

export default Sidebar;
