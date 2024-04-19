import React, { useState } from 'react';
import axios from 'axios';

const AddAppointment = () => {
    const [formData, setFormData] = useState({
        did: '',
        pid: '',
        callDate: '',
        callTime: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/callhistory/doctor/add", formData, {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
              });
            alert("Appointment added successfully!");
            setFormData({ did: '', pid: '', callDate: '', callTime: '' });
        } catch (error) {
            console.error("Error adding appointment:", error);
            alert("Failed to add appointment. Please try again later.");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="appointments-container">
            <h2>Add Appointment</h2>
            <form onSubmit={handleSubmit} className="appointment-form">
                <div className="form-group">
                    <label htmlFor="patientId">Doctor ID:</label>
                    <input
                        type="text"
                        id="patientId"
                        name="did"
                        value={formData.did}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="doctorId">Patient ID:</label>
                    <input
                        type="text"
                        id="doctorId"
                        name="pid"
                        value={formData.pid}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="callDate"
                        value={formData.callDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="time">Time:</label>
                    <input
                        type="time"
                        id="time"
                        name="callTime"
                        value={formData.callTime}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn-submit">Add Appointment</button>
            </form>
        </div>
    );
};

export default AddAppointment;
