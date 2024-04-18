import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation from react-router-dom
import './SideNav.css'; // Import CSS file for styling (create this file in your project)
import { MdHome } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { MdOutlinePhoneCallback } from "react-icons/md";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation(); // Use useLocation hook to get the current location

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className={`toggle-btn ${isOpen ? 'open' : ''}`} onClick={toggleNav}>
        &#9776;
      </button>
      <div className={`sidenav ${isOpen ? 'open' : ''}`}>
        <ul id='sidenavitem'>
          {/* Add 'active' class to the <li> if the current location matches */}
          <li className={location.pathname === '/home' ? 'active' : ''}><Link to="/home"> Home<MdHome /></Link> </li>
          {/* Add 'active' class to the <li> if the current location matches */}
          <li className={location.pathname === '/appointments' ? 'active' : ''}><Link to="/appointments">Appointment<FaHistory /></Link></li>
          <li className={location.pathname === '/patienthistory' ? 'active' : ''}><Link to="/home">Patient History<i className="fas fa-history"></i></Link></li>
          <li className={location.pathname === '/incomingcall' ? 'active' : ''}><Link to="/incomingcall">Incoming Calls<MdOutlinePhoneCallback /></Link></li>
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
