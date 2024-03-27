import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Appointment.css'; // Import your CSS file for styling
import axios from 'axios';
import { Button } from '@mui/material';
const Appointments = () => {
  // Dummy data for appointments (replace with your actual data)
  const [appointments, setAppointments] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/callhistory/getappointment/2");
    setAppointments(result.data);
    console.log("appointment", result.data);
  };


  const gotoaddappointment = () => {
   navigate("/addappointment");
  };


  return (
    <div className="appointments-container">
     

      {/* Form to add new appointment
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="patientName">Patient Name:</label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="doctorName">Doctor Name:</label>
          <input
            type="text"
            id="doctorName"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-submit">Add Appointment</button>
      </form> */}
 <h2>Appointments</h2>
        <Button onClick={gotoaddappointment}> Add Appointment</Button>
      <div className={`appointments-list-container ${appointments.length > 2 ? 'sliding' : ''}`}>
       

        {/* Table to display appointments */}
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Appointment-id</th>
              <th>Call-Date</th>
              <th>Call-Time</th>
              <th>Patient-Id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{appointment.callDate}</td>
                <td>{appointment.callTime}</td>
                <td>{appointment.patient.id}</td>
                <td className="action-column">
                  {/* Link to view appointment */}
                  <Link to={`/appointments/${appointment.id}`} className="action-linkk">View</Link> |{' '}
                  
                  {/* Link to edit appointment */}
                  <Link to={`/appointments/${appointment.id}/edit`} className="action-linkk">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
