import './sidebar.css'
import { Link } from 'react-router-dom';
function Sidebar() {

    return(
        <div className="side-content">
            <Link to="/home" className='home-btn txt'>Dashboard</Link><br />
            <Link to="/history" className='history-btn txt'>History</Link><br />
            <Link to="/book" className='book-btn txt'>Book Now</Link><br />
            <Link to="/" className='logout-btn txt'>Logout</Link>
        </div>
    );
}

export default Sidebar;