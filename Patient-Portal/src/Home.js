import React from 'react';
import './Home.css';

function HomePage() {
    return (
        <div className="home-content">
            <div className="top-content">
                <div className="top-left">
                    <h3 className='head'>Upcoming Appointments</h3>
                </div>
                <div className="top-right">
                    <h3 className='head'>Past Consultations</h3>
                </div>
            </div>
            <div className="bottom-content">
                <h3 className='head'>Top Doctors</h3>
            </div>
        </div>
    );
}

export default HomePage;
