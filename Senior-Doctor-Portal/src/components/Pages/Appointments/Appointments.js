import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Appointment.css'; // Import your CSS file for styling
import axios from 'axios';
import { Button } from '@mui/material';
const Appointments = () => {
  // Dummy data for appointments (replace with your actual data)
  const [appointments, setAppointments] = useState([]);
  
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/appointment/appointment");
    setAppointments(result.data);
    console.log("appointment", result.data);
  };

  // State for form input fields
  const [formData, setFormData] = useState({
    patientName: '',
    doctorName: '',
    date: '',
    time: '',
  });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new appointment to the list
    const newAppointment = {
      id: appointments.length + 1, // Generate ID dynamically (you might use a better approach)
      ...formData,
    };
    setAppointments([...appointments, newAppointment]);
    // Reset form fields
    setFormData({ patientName: '', doctorName: '', date: '', time: '' });
  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        <Button> Add Appointment</Button>
      <div className={`appointments-list-container ${appointments.length > 2 ? 'sliding' : ''}`}>
       

        {/* Table to display appointments */}
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.patientname}</td>
                <td>{appointment.doctorname}</td>
                <td>{appointment.dptdate}</td>
                <td>{appointment.apttime}</td>
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
