import './sidebar.css';
import { MdDashboard } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import { GoPlusCircle } from "react-icons/go";
import { BiLogOutCircle } from "react-icons/bi";

function PSidebar() {
    return (
        <div className="side-content">
            <div className="top-buttons">
                <button className='btn btn-home' onClick={() => { window.location.href = "/home"; }}><MdDashboard />Dashboard</button>
                <button className='btn btn-history' onClick={() => { window.location.href = "/history"; }}><GoHistory />History</button>
                <button className='btn btn-bnow' onClick={() => { window.location.href = "/book"; }}><GoPlusCircle />Book Now</button>
            </div>
            <button className='btn logout-btn txt' onClick={() => { window.location.href = "/"; }}><BiLogOutCircle />Logout</button>
        </div>
    );
}

export default PSidebar;
