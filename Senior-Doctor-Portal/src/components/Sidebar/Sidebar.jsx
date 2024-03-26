import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { UilSignOutAlt, UilBars } from "@iconscout/react-unicons";
import { FaUserDoctor } from "react-icons/fa6";
import { FaPerson } from "react-icons/fa6";
import { FaAppStore } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
const Sidebar = () => {
  const [selected, setSelected] = useState(null);
  const [expanded, setExpanded] = useState(true);
const navigate=useNavigate();
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };
  const gotologin = () => {
    navigate("/login");
  };


  return (
    <>
      <div className="bars" style={expanded ? { left: "60%" } : { left: "5%" }} onClick={toggleSidebar}>
     
      </div>
      <div className={expanded ? 'sidebar expanded' : 'sidebar'}>
        {/* logo */}
        <div className="logo">
          <FaUserDoctor />
          <span>Senior<br/>Doctor</span>
        </div>
        {/* menu */}
        <div className="menu">
        <Link to="/" className={selected === "dashboard" ? "menuItem active" : "menuItem"} onClick={() => setSelected("dashboard")}>
        <BiSolidDashboard /> Dashboard
          </Link>
           <Link to="/appointments" className={selected === "appointments" ? "menuItem active" : "menuItem"} onClick={() => setSelected("appointments")}>
           <FaAppStore /> Appointments
          </Link>
          <Link to="/patienthistory" className={selected === "patient-history" ? "menuItem active" : "menuItem"} onClick={() => setSelected("patient-history")}>
          <FaPerson /> Patient History
          </Link>
          
          <Link to="/doctors" className={selected === "doctors" ? "menuItem active" : "menuItem"} onClick={() => setSelected("doctors")}>
          <FaUserDoctor /> Doctors
          </Link>
       
         
          <div className="menuItem" onClick={() => setSelected(null)}>
            <UilSignOutAlt />
            <Link to="/login"><span>Signout</span></Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
