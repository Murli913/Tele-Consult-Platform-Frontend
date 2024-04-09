import './navbar.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { MdPhoneInTalk } from "react-icons/md";



function Navbar() {

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };
    
return(
    <div>
        <nav className="nav-bar">
            <div className="logo-title">
                <Link to="/home" className='title-logo'>eSwasthya</Link>
            </div>
            <button className='btn-talk' onClick={() => { window.location.href = "/client"; }}><MdPhoneInTalk />Talk with DOC!</button>
            <div className='usr-logo' onClick={toggleDropdown}>
                <FaRegUserCircle />
                {showDropdown && (
                <div className="dropdown-content">
                    <Link to="/profile">Profile</Link>
                    <Link to="/settings">Settings</Link>
                    <Link to="/logout">Logout</Link>    
                </div>
                )}
            </div>
        </nav>

    </div>
);
}

export default Navbar;