import './sidebar.css';
import { MdDashboard } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import { GoPlusCircle } from "react-icons/go";
import { BiLogOutCircle } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Sidebar() {
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
                <Link to="/history" className='btn btn-history'><GoHistory />History</Link>
                <Link to="/book" className='btn btn-bnow'><GoPlusCircle />Book Now</Link>
                {/* <button className='btn btn-home' onClick={() => { window.location.href = "/home"; }}><MdDashboard />Dashboard</button> */}
                {/* <button className='btn btn-history' onClick={() => { window.location.href = "/history"; }}><GoHistory />History</button> */}
                {/* <button className='btn btn-bnow' onClick={() => { window.location.href = "/book"; }}><GoPlusCircle />Book Now</button> */}
            </div>
            <Link to="/" className='btn logout-btn txt' onClick={gotoclear}><BiLogOutCircle />Logout</Link>
            {/* <button className='btn logout-btn txt' onClick={() => { window.location.href = "/"; }}><BiLogOutCircle />Logout</button> */}
        </div>
    );
}

export default Sidebar;
