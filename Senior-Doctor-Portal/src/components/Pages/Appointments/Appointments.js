import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Appointment.css'; // Import your CSS file for styling

const Appointments = () => {
  // Dummy data for appointments (replace with your actual data)
  const [appointments, setAppointments] = useState([
    { id: 1, patientName: 'John Doe', doctorName: 'Dr. Smith', date: '2024-03-22', time: '10:00 AM' },
    { id: 2, patientName: 'Jane Smith', doctorName: 'Dr. Brown', date: '2024-03-24', time: '2:00 PM' },
    { id: 3, patientName: 'Jane Smith', doctorName: 'Dr. Brown', date: '2024-03-24', time: '2:00 PM' },
  
    // Add more appointments as needed
  ]);

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
      <h2>Add Appointment</h2>

      {/* Form to add new appointment */}
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

      <div className={`appointments-list-container ${appointments.length > 2 ? 'sliding' : ''}`}>
        <h2>Appointments</h2>

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
                <td>{appointment.patientName}</td>
                <td>{appointment.doctorName}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
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
