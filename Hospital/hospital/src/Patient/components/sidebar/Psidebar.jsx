import './sidebar.css';
import { MdDashboard } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import { GoPlusCircle } from "react-icons/go";
import { BiLogOutCircle } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function PSidebar() {
    const navigate=useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
          navigate("/");
        } }, []);
    function gotoclear() {
        // Clear the localStorage
        localStorage.clear();
       
    }
    return (
        <div className="side-content">
            <div className="top-buttons">
                <Link to="/home" className='btn btn-home' ><MdDashboard />Dashboard</Link>
                <Link to="/book" className='btn btn-bnow'><GoPlusCircle />Book Now</Link>
                <Link to="/history" className='btn btn-history'><GoHistory />History</Link>
            </div>
            <Link to="/" className='btn logout-btn txt' onClick={gotoclear}><BiLogOutCircle />Logout</Link>
        </div>
    );
}

export default PSidebar;
