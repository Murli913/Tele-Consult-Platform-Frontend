import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { MdPhoneInTalk } from "react-icons/md";
import Sun from "./Sun.svg"; // Import SVGs as files
import Moon from "./Moon.svg"; // Import SVGs as files

function PNavbar() {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(localStorage.getItem("selectedTheme") === "dark");

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem("selectedTheme", "dark");
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem("selectedTheme", "light");
        }
    }, [darkMode]);

    function toggleDarkMode() {
        setDarkMode(!darkMode);
    }

    function handleLogout() {
        localStorage.clear();
        navigate("/");
    }

    function handleTalkWithDoc() {
        navigate("/client");
    }
    
    return (
        <nav className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 flex justify-between items-center relative">
            <div className="flex items-center space-x-4">
                <Link to="/home" className='text-white text-2xl font-bold hover:text-yellow-300 transition duration-300 animate-bounce'>e<span className="text-yellow-300">Swasthya</span></Link>
            </div>
            <Link to="/client" className='btn-talk flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg px-3 py-2 transition duration-300 ease-in absolute left-1/2 transform -translate-x-1/2'>Talk with DOC! <MdPhoneInTalk className="text-lg" /></Link>
            <div className="dark-mode-toggle absolute right-20">
                <input
                    type='checkbox'
                    id='darkmode-toggle'
                    checked={darkMode}
                    onChange={toggleDarkMode}
                    className="hidden"
                />
                <label className="dark-mode-label cursor-pointer w-16 h-8 bg-gray-400 rounded-full flex items-center p-1 transition-all duration-300" htmlFor='darkmode-toggle'>
                    <div className={`knob w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-md transform ${darkMode ? 'translate-x-full' : ''} transition duration-300`}></div>
                    <img src={Sun} alt="Sun" className="w-5 h-5 ml-1" />
                    <img src={Moon} alt="Moon" className="w-5 h-5 ml-1" />
                </label>
            </div>
            <div className="profile-icon text-white cursor-pointer absolute right-4" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <FaRegUserCircle className="text-3xl" />
            </div>
            {dropdownOpen && (
                <div className="dropdown-menu bg-white text-gray-700 dark:bg-gray-800 dark:text-white absolute top-full right-4 mt-2 rounded-lg shadow-md animate-fade-in-down">
                    <Link to="/profile" className='dropdown-item px-3 py-2 flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700'>
                        <FaRegUserCircle className="text-lg" />
                        Profile
                    </Link>
                    <button onClick={handleLogout} className="dropdown-item px-3 py-2 flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                        <FaRegUserCircle className="text-lg" />
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
}

export default PNavbar;
