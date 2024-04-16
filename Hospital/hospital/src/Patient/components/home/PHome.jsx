import React, {useState} from 'react';
import './Home.css';
import { IoCloseCircle } from "react-icons/io5";

function PHomePage() {

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };


    return (
        <div className="home-content">
            <div className="top-content">
                <div className="top-left">
                    <h3 className='head'>Upcoming Appointments</h3>
                    <div className="up-content-parent">
                    <div className='up-content'>
                        <h4 className='up-apt'>Dr. Maharshi Patel (MBBS)</h4>
                        <p className='up-apt'><b>Date:</b> 01-04-2024</p>
                        <p className='up-apt'><b>Time:</b> 11:15</p>
                    </div>
                    <div className='up-content'>
                        <h4 className='up-apt'>Dr. Maharshi Patel (MBBS)</h4>
                        <p className='up-apt'><b>Date:</b> 01-04-2024</p>
                        <p className='up-apt'><b>Time:</b> 11:15</p>
                    </div>
                    <div className='up-content'>
                        <h4 className='up-apt'>Dr. Maharshi Patel (MBBS)</h4>
                        <p className='up-apt'><b>Date:</b> 01-04-2024</p>
                        <p className='up-apt'><b>Time:</b> 11:15</p>
                    </div>
                    <div className='up-content'>
                        <h4 className='up-apt'>Dr. Maharshi Patel (MBBS)</h4>
                        <p className='up-apt'><b>Date:</b> 01-04-2024</p>
                        <p className='up-apt'><b>Time:</b> 11:15</p>
                    </div>
                    <div className='up-content'>
                        <h4 className='up-apt'>Dr. Maharshi Patel (MBBS)</h4>
                        <p className='up-apt'><b>Date:</b> 01-04-2024</p>
                        <p className='up-apt'><b>Time:</b> 11:15</p>
                    </div>
                    </div>
                    
                </div>
                <div className="top-right">
                    <h3 className='head'>Past Consultations</h3>
                    <div className="up-content-parent">
                    <div className='up-content'>
                        <h4 className='up-apt'>Dr. Maharshi Patel (MBBS)</h4>
                        <p className='up-apt'><b>Date:</b> 01-01-2024</p>
                        <p className='up-apt'><b>Time:</b> 11:15 AM</p>
                        {/* <p className='up-apt'><b>Purpose:</b> High Fever</p> */}
                    </div>
                    <div className='up-content'>
                        <h4 className='up-apt'>Dr. Murli Talreja (MD)</h4>
                        <p className='up-apt'><b>Date:</b> 01-02-2024</p>
                        <p className='up-apt'><b>Time:</b> 10:15 AM</p>
                        {/* <p className='up-apt'><b>Purpose:</b> High Fever</p> */}
                    </div>
                    <div className='up-content'>
                        <h4 className='up-apt'>Dr. Maharshi Patel (MBBS)</h4>
                        <p className='up-apt'><b>Date:</b> 01-03-2024</p>
                        <p className='up-apt'><b>Time:</b> 11:00 AM</p>
                        {/* <p className='up-apt'><b>Purpose:</b> High Fever</p> */}
                    </div>
                    <div className='up-content'>
                        <h4 className='up-apt'>Dr. Maharshi Patel (MBBS)</h4>
                        <p className='up-apt'><b>Date:</b> 01-03-2024</p>
                        <p className='up-apt'><b>Time:</b> 11:00 AM</p>
                        {/* <p className='up-apt'><b>Purpose:</b> High Fever</p> */}
                    </div>
                    </div>
                </div>
            </div>
            <div className="bottom-content">
                <h3 className='head'>Top Doctors</h3>
                <div className="bt-parent">
                <div className='bt-content'>
                    <h4 className='up-apt doc-name'> 
                    <img src="./images/maharshi.jpg" className='doc-img' alt="" />
                        Dr. Maharshi Patel (MBBS)
                        </h4>
                        <button onClick={openModal} className='view-btn'>View Statistics</button>
                            {showModal && (
                                <div className="modal-overlay">
                                    <div className="modal">
                                        <div className="modal-header">
                                        <h2 className='doc-name'><img src   ="./images/maharshi.jpg" className='doc-img' alt="" /> Dr. Maharshi Patel</h2>
                                        <button onClick={closeModal} className='close-btn'><IoCloseCircle /></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="modal-info" style={{ textAlign: 'left' }}   >
                                                <p><b>Qualification: </b>MBBS</p>
                                                <p><b>No. of patients: </b>203</p>
                                                <p><b>Rating: </b>4.3/5</p>
                                            </div>
                                            <div className="modal-graphs">

                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            )}
                </div>
                <div className='bt-content'>
                    <h4 className='up-apt doc-name'> 
                    <img src="./images/maharshi.jpg" className='doc-img' alt="" />
                        Dr. Maharshi Patel (MBBS)
                        </h4>
                        <button onClick={openModal} className='view-btn'>View Statistics</button>
                </div>
                <div className='bt-content'>
                    <h4 className='up-apt doc-name'> 
                    <img src="./images/maharshi.jpg" className='doc-img' alt="" />
                        Dr. Maharshi Patel (MBBS)
                        </h4>
                        <button onClick={openModal} className='view-btn'>View Statistics</button>
                </div>
                <div className='bt-content'>
                    <h4 className='up-apt doc-name'> 
                    <img src="./images/maharshi.jpg" className='doc-img' alt="" />
                        Dr. Maharshi Patel (MBBS)</h4>
                        <button onClick={openModal} className='view-btn'>View Statistics</button>
                </div>
                </div>                    
            </div>
        </div>
    );
}

export default PHomePage;
