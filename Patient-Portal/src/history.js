import React, { useState } from 'react';
import './history.css';
import { IoCloseCircle } from "react-icons/io5";

function History() {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const renderModal = () => {
        return (
            <div className="modal-overlay">
                <div className="modal">
                    <div className="modal-header">
                        <h2 className='doc-name'>Appointment ID: 576934</h2>
                        <button onClick={closeModal} className='close-btn'><IoCloseCircle /></button>
                    </div>
                    <div className="modal-body">
                        <div className="modal-info" style={{ textAlign: 'left' }}>
                            <img src="./images/maharshi.jpg" className='doc-img past-modal-img' alt="" />
                            <p><b>Date: </b>13-02-2024</p>
                            <p><b>Time: </b>11:15 AM</p>
                            <p><b>Doctor Name: </b>Dr. Maharshi Patel</p>
                            <p><b>Prescription: </b>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur cumque repudiandae consequatur voluptate vero totam esse labore ad soluta reprehenderit dolore voluptatem possimus, corrupti consequuntur dicta distinctio tempora ea error!</p>
                            <p><b>Call Duration: </b>13m25s</p>
                        </div>
                        <div className="modal-graphs">

                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="history-content">
            <h2 className="history-title">Previous Consultations</h2>
            <div className='hist-content'>
                {/* <div className="hist-bar"> */}
                    <h4 className='hist-apt'>Appointment ID: 576934</h4>
                    <p className='hist-apt'><b>Date:</b> 13-02-2024</p>
                    <p className='hist-apt'><b>Time:</b> 11:15 AM</p>
                {/* </div> */}
                <div className="view-hist-btn">
                    <button onClick={openModal} className='view-btn'>View Details</button>
                    {showModal && renderModal()}
                </div>
            </div>
            <div className='hist-content'>
                {/* <div className="hist-bar"> */}
                    <h4 className='hist-apt'>Appointment ID: 576934</h4>
                    <p className='hist-apt'><b>Date:</b> 13-02-2024</p>
                    <p className='hist-apt'><b>Time:</b> 11:15 AM</p>
                {/* </div> */}
                <div className="view-hist-btn">
                    <button onClick={openModal} className='view-btn'>View Details</button>
                    {/* {showModal && renderModal()} */}
                </div>
            </div>
            <div className='hist-content'>
                {/* <div className="hist-bar"> */}
                    <h4 className='hist-apt'>Appointment ID: 576934</h4>
                    <p className='hist-apt'><b>Date:</b> 13-02-2024</p>
                    <p className='hist-apt'><b>Time:</b> 11:15 AM</p>
                {/* </div> */}
                <div className="view-hist-btn">
                    <button onClick={openModal} className='view-btn'>View Details</button>
                    {/* {showModal && renderModal()} */}
                </div>
            </div>
            <div className='hist-content'>
                {/* <div className="hist-bar"> */}
                    <h4 className='hist-apt'>Appointment ID: 576934</h4>
                    <p className='hist-apt'><b>Date:</b> 13-02-2024</p>
                    <p className='hist-apt'><b>Time:</b> 11:15 AM</p>
                {/* </div> */}
                <div className="view-hist-btn">
                    <button onClick={openModal} className='view-btn'>View Details</button>
                    {/* {showModal && renderModal()} */}
                </div>
            </div>
            <div className='hist-content'>
                {/* <div className="hist-bar"> */}
                    <h4 className='hist-apt'>Appointment ID: 576934</h4>
                    <p className='hist-apt'><b>Date:</b> 13-02-2024</p>
                    <p className='hist-apt'><b>Time:</b> 11:15 AM</p>
                {/* </div> */}
                <div className="view-hist-btn">
                    <button onClick={openModal} className='view-btn'>View Details</button>
                    {/* {showModal && renderModal()} */}
                </div>
            </div>
            <div className='hist-content'>
                {/* <div className="hist-bar"> */}
                    <h4 className='hist-apt'>Appointment ID: 576934</h4>
                    <p className='hist-apt'><b>Date:</b> 13-02-2024</p>
                    <p className='hist-apt'><b>Time:</b> 11:15 AM</p>
                {/* </div> */}
                <div className="view-hist-btn">
                    <button onClick={openModal} className='view-btn'>View Details</button>
                    {/* {showModal && renderModal()} */}
                </div>
            </div>
            <div className='hist-content'>
                {/* <div className="hist-bar"> */}
                    <h4 className='hist-apt'>Appointment ID: 576934</h4>
                    <p className='hist-apt'><b>Date:</b> 13-02-2024</p>
                    <p className='hist-apt'><b>Time:</b> 11:15 AM</p>
                {/* </div> */}
                <div className="view-hist-btn">
                    <button onClick={openModal} className='view-btn'>View Details</button>
                    {/* {showModal && renderModal()} */}
                </div>
            </div>
            <div className='hist-content'>
                {/* <div className="hist-bar"> */}
                    <h4 className='hist-apt'>Appointment ID: 576934</h4>
                    <p className='hist-apt'><b>Date:</b> 13-02-2024</p>
                    <p className='hist-apt'><b>Time:</b> 11:15 AM</p>
                {/* </div> */}
                <div className="view-hist-btn">
                    <button onClick={openModal} className='view-btn'>View Details</button>
                    {/* {showModal && renderModal()} */}
                </div>
            </div>
            <div className='hist-content'>
                {/* <div className="hist-bar"> */}
                    <h4 className='hist-apt'>Appointment ID: 576934</h4>
                    <p className='hist-apt'><b>Date:</b> 13-02-2024</p>
                    <p className='hist-apt'><b>Time:</b> 11:15 AM</p>
                {/* </div> */}
                <div className="view-hist-btn">
                    <button onClick={openModal} className='view-btn'>View Details</button>
                    {/* {showModal && renderModal()} */}
                </div>
            </div>
            <div className='hist-content'>
                {/* <div className="hist-bar"> */}
                    <h4 className='hist-apt'>Appointment ID: 576934</h4>
                    <p className='hist-apt'><b>Date:</b> 13-02-2024</p>
                    <p className='hist-apt'><b>Time:</b> 11:15 AM</p>
                {/* </div> */}
                <div className="view-hist-btn">
                    <button onClick={openModal} className='view-btn'>View Details</button>
                    {/* {showModal && renderModal()} */}
                </div>
            </div>
            <div className='hist-content'>
                {/* <div className="hist-bar"> */}
                    <h4 className='hist-apt'>Appointment ID: 576934</h4>
                    <p className='hist-apt'><b>Date:</b> 13-02-2024</p>
                    <p className='hist-apt'><b>Time:</b> 11:15 AM</p>
                {/* </div> */}
                <div className="view-hist-btn">
                    <button onClick={openModal} className='view-btn'>View Details</button>
                    {/* {showModal && renderModal()} */}
                </div>
            </div>
            <div className='hist-content'>
                {/* <div className="hist-bar"> */}
                    <h4 className='hist-apt'>Appointment ID: 576934</h4>
                    <p className='hist-apt'><b>Date:</b> 13-02-2024</p>
                    <p className='hist-apt'><b>Time:</b> 11:15 AM</p>
                {/* </div> */}
                <div className="view-hist-btn">
                    <button onClick={openModal} className='view-btn'>View Details</button>
                    {/* {showModal && renderModal()} */}
                </div>
            </div>
            
            
        </div>
    );
}

export default History;
