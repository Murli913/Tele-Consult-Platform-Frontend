import React, { useEffect, useState } from 'react';
import './EditAppointment.css';
import { useNavigate } from 'react-router-dom';
const EditAppointment = () => {
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleEdit = () => {
    const navigate=useNavigate();
    useEffect(() => {
      if (!localStorage.getItem("token")) {
        navigate("/");
      } 
  },[]);
    // Handle edit functionality here
    console.log('Editing...');
  };

  return (
    <div className="edit-page">
      <h1>Edit Appointment</h1>
      <div className="edit-form">
        <form>
          <div className="form-group">
            <label htmlFor="patientName">Patient Name:</label>
            <input
              type="text"
              id="patientName"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="doctorName">Doctor Name:</label>
            <input
              type="text"
              id="doctorName"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <button type="button" onClick={handleEdit}>Edit Appointment</button>
        </form>
      </div>
    </div>
  );
};

export default EditAppointment;
