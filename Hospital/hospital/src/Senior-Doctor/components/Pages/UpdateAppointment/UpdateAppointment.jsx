import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import "./UpdateAppointment.css"; // Import the CSS file for styling
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const UpdateAppointment = () => {
    const [callDate, setCallDate] = useState('');
    const [callTime, setCallTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const location = useLocation();
    const { appointmentId } = location.state;
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("appointment", appointmentId);
        try {
            await axios.put(
                `http://localhost:8080/callhistory/${appointmentId}/update`,
                {
                    callDate,
                    callTime,
                    endTime
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            toast.success("Updated Appointment successfully");
            navigate("/sappointments");
            // Handle success, maybe show a success message or redirect to another page
        } catch (error) {
            toast.error("Error occurred while updating details");
            console.error('Error updating appointment:', error);
            // Handle error, maybe show an error message to the user
        }
    };

    return (
        <div className="dialog-box">
            <div className="form-column">
                <form className="appointment-form" onSubmit={handleSubmit}>
                    <h2 className="update-appointment-heading">Update Appointment Details</h2>
                    <br/>
                    <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            id="date"
                            value={callDate}
                            onChange={(e) => setCallDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="time">Start Time:</label>
                        <input
                            type="time"
                            id="time"
                            value={callTime}
                            onChange={(e) => setCallTime(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endTime">End Time:</label>
                        <input
                            type="time"
                            id="endTime"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-submit">Update Details</button>
                 
                </form>
            </div>
            <div className="image-column">
                {/* Add any image you want */}
                <img src="https://photo.safetyhandler.com/sc0/https:%2F%2Fmedia.safetyhandler.com%2Fmedia%2Fimage%2Fgif%2Fbucket%2Ff5a36ceabfbb6f240347cca1a558d957-0.gif%3Fview=image" alt="Doctor" className="doctor-image" />
            </div>
            <ToastContainer />
        </div>
    );
};

export default UpdateAppointment;
