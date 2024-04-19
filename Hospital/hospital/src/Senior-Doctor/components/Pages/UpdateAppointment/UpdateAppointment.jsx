import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';

const UpdateAppointment = () => {
    const [callDate, setCallDate] = useState('');
    const [callTime, setCallTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const location = useLocation();
    const { appointmentId } = location.state;


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
            // Handle success, maybe show a success message or redirect to another page
        } catch (error) {
            console.error('Error updating appointment:', error);
            // Handle error, maybe show an error message to the user
        }
    };
    

    return (
        <div className="appointments-container">
            <h2>Update Appointment Details</h2>
            <form className="appointment-form" onSubmit={handleSubmit}>
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
                    <label htmlFor="time">Time:</label>
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
                <div className="form-group">
                    <button type="submit" className="btn-submit">Update Details</button>
                    <button type="button" className="btn-cancel">Close</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateAppointment;
