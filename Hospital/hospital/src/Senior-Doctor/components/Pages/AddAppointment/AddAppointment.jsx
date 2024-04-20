// AddAppointment.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./AddAppointment.css";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddAppointment = () => {
    const navigate=useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
          navigate("/");
        } 
    },[]);
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
         
            setFormData({ did: '', pid: '', callDate: '', callTime: '' });
            toast.success("Add Apoointment successfully");
            navigate("/sappointments");
        } catch (error) {
            console.error("Error adding appointment:", error);
            toast.error("Error occurred while adding appointment");
        
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="dialog-box">
            <div className="form-column">
                <form onSubmit={handleSubmit} className="appointment-form">
                    <h2 className="add-appointment-heading">Add Appointment</h2>
                    <br/>
                    <div className="form-group">
                        <label htmlFor="doctorId">Doctor ID:</label>
                        <input
                            type="text"
                            id="doctorId"
                            name="did"
                            value={formData.did}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="patientId">Patient ID:</label>
                        <input
                            type="text"
                            id="patientId"
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
                        <label htmlFor="time">Time: {" "}{" "}</label>
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
            <div className="image-column">
                <img src="https://media.licdn.com/dms/image/D5612AQH8InK04zt5MA/article-cover_image-shrink_600_2000/0/1653677155362?e=2147483647&v=beta&t=tMpvukUVEMkxQBL9ONAgpResi904jtPJetDNbLfgGuc" alt="Doctor" className="doctor-image" />
               
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddAppointment;
