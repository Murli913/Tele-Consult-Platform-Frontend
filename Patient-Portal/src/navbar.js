import './navbar.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { MdPhoneInTalk } from "react-icons/md";

function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div>
            <nav className="nav-bar">
                <div className="logo-title">
                    <Link to="/home" className='title-logo'>eSwasthya</Link>
                </div>
                <button className='btn-talk' onClick={() => { window.location.href = "/client"; }}><MdPhoneInTalk />Talk with DOC!</button>
                <div className='usr-logo' onClick={toggleDropdown}>
                    <FaRegUserCircle />
                </div>
                {dropdownOpen && (
                    <div className="dropdown-menu">
                        <Link to="/profile" className='dropdown-item'>Profile</Link>
                        <Link to="/" className='dropdown-item'>Logout</Link>
                    </div>
                )}
            </nav>
        </div>
    );
}

export default Navbar;
