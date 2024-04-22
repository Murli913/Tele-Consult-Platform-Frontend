import './navbar.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { MdPhoneInTalk } from "react-icons/md";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";

function PNavbar() {
    const navigate=useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
        navigate("/");
        } }, []);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const selectedTheme = localStorage.getItem("selectedTheme") || "light"; // Set default to "light" if not found

    useEffect(() => {
        if (selectedTheme === "light") {
            setLightMode();
        } else {
            setDarkMode();
        }
    }, [selectedTheme]);
    function gotoclear() {
        // Clear the localStorage
        localStorage.clear();
    
    }

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const setDarkMode = () =>{
        document.querySelector("body").setAttribute("data-theme", 'dark')
        localStorage.setItem("selectedTheme", "dark")
    };

    const setLightMode = () =>{
        document.querySelector("body").setAttribute("data-theme", 'light')
        localStorage.setItem("selectedTheme", "light")
    };

    const toggleTheme = (e) => {
        if (e.target.checked) setDarkMode();
        else setLightMode();
    };

    return (
        <div>
            <nav className="nav-bar">
                <div className="logo-title">
                    <Link to="/home" className='title-logo'>eSwasthya</Link>
                </div>
                <button className='btn-talk' onClick={() => { window.location.href = "/client"; }}><MdPhoneInTalk />Talk with DOC!</button>
                <div className='usr-logo' onClick={toggleDropdown}>
                    <div className='dark_mode'>
                        <input
                            className='dark_mode_input'
                            type='checkbox'
                            id='darkmode-toggle'
                            onChange={toggleTheme}
                            defaultChecked = {selectedTheme==="dark"} // Check if selectedTheme is "dark"
                        />
                        <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                            <Sun />
                            <Moon />
                        </label>
                    </div>
                    <FaRegUserCircle />
                </div>
                {dropdownOpen && (
                    <div className="dropdown-menu">
                        <Link to="/profile" className='dropdown-item'>Profile</Link>
                        <Link to="/" className='dropdown-item' onClick={gotoclear}>Logout</Link>
                    </div>
                )}
            </nav>
        </div>
    );
}

export default PNavbar;
