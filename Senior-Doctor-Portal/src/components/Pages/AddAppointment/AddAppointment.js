import React, { useState } from 'react'
import './AddAppointment.css';
const AddAppointment = () => {
    const [appointments, setAppointments] = useState([]);
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

    Form to add new appointment
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
    </form>
    </div>
  )
}

export default AddAppointment