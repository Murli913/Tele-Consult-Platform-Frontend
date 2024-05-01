import React, { useState, useEffect } from 'react';
import './history.css';
import { IoCloseCircle } from "react-icons/io5";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DisplayRating from '../rating/rating';


function History() {
    const navigate=useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
          navigate("/");
        } }, []);
    const [showModal, setShowModal] = useState(false);
    const [pastAppointments, setPastAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const openModal = (appointment) => {
        setSelectedAppointment(appointment);
    };

    const closeModal = () => {
        setSelectedAppointment(null);
    };  

    useEffect(() => {
        fetchPastData();
    }, []);
    


    const fetchPastData = async () => {
        try {
            const pid = localStorage.getItem('patientId');
            const token = localStorage.getItem('token');
            console.log(pid);
            console.log(token);
            const response = await axios.get(`http://localhost:8080/patient/past-apt`, {
                // headers: {
                //     'Authorization': `Bearer ${token}`
                // },
                params:{
                    patientId : pid
                },
                withCredentials: true
            });
            console.log(response);
            if (response.data.length === 0) {
                // If no appointments are fetched, show a message
                console.log("No Previous Appointments");
            } else {
                // Update the state with fetched appointments
                const appointmentsWithDuration = response.data.map(appointment => {
                    const callTime = new Date(`1970-01-01T${appointment.callTime}`);
                    const endTime = new Date(`1970-01-01T${appointment.endTime}`);
                    const duration = endTime.getTime() - callTime.getTime();
                    // const hours = Math.floor(duration / (1000 * 60 * 60));
                    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((duration % (1000 * 60)) / 1000);
                    // const formattedHours = String(hours).padStart(2, '0');
                    const formattedMinutes = String(minutes).padStart(2, '0');
                    const formattedSeconds = String(seconds).padStart(2, '0');
                    const durationString = `${formattedMinutes}m${formattedSeconds}s`;
                    return { ...appointment, duration: durationString };
                });
                setPastAppointments(appointmentsWithDuration);
                console.log(appointmentsWithDuration);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };


    const renderModal = () => {
        if (!selectedAppointment) return null;
        const appointment = selectedAppointment;

        return (
            <div className="modal-overlay">
                <div className="modal">
                    <div className="modal-header">
                        <h2 className='doc-name'>Purpose: {appointment.reason}</h2>
                        <button onClick={closeModal} className='close-btn'><IoCloseCircle /></button>
                    </div>
                    <div className="modal-body">
                        <div className="modal-info" style={{ textAlign: 'left' }}>
                            {/* <img src="./images/maharshi.jpg" className='doc-img past-modal-img' alt="" /> */}
                            <div className="doctorDetails">
                            <h3>Doctor Details</h3>
                                <p><b>Name: </b> Dr. {appointment.doctorName}</p>
                                <p><b>Gender:</b> {appointment.doctorGender}</p>
                                <p><b>Email:</b> {appointment.doctorEmail}</p>
                                <p><b>Phone Number:</b> {appointment.doctorPhoneNumber}</p>
                                <p><b>Rating:</b>  <DisplayRating rating={appointment.doctorRating} /></p>
                            </div>
                            <div className="aptDetails">
                                <h3>Appointment Details</h3>
                                <p><b>Date: </b>{appointment.callDate}</p>
                                <p><b>Time: </b>{appointment.callTime}</p>
                                <p><b>Prescription: </b>{appointment.prescription}</p>
                                <p><b>Call Duration: </b>{appointment.duration}</p>
                                <p><b>Call Rating: </b><DisplayRating rating={appointment.callRating} /></p>
                            </div>
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
        {pastAppointments.length !== 0 ? (
        <div className="sub-parent">
                {pastAppointments.map((appointment, index) => (
                    <div className='hist-content'>
                    <div key={index} className='gap'>
                        <p className='up-apt1' style={{'text-align':'left'}}><b>Doctor Name:</b> {appointment.doctorName}</p>
                        <p className='up-apt1'><b>Date:</b> {appointment.callDate}</p>
                        <p className='up-apt1'><b>Time:</b> {appointment.callTime}</p>
                        <div className="view-hist-btn up-apt1">
                            <button onClick={() => openModal(appointment)} className='view-btn'>View Details</button>
                        </div>
                    </div>
                    </div>
                ))}
        </div>
        ) : (
            <p style={{'color':'var(--body_color)', 'text-align':'center', 'font-weight':'100'}}>No Previous Appointments</p>
        )}
        {renderModal()}
    </div>
    );
}

export default History;
