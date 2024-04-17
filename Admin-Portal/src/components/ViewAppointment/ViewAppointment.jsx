import React, { useState } from 'react';
import './ViewAppointment.scss'; // Import the SCSS file for styling

const ViewAppointment = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [appointments, setAppointments] = useState([
    // Sample appointment data, replace it with your actual data
    { callDate: 'April 17, 2024', callTime: '10:00 AM', endTime: '11:00 AM', prescription: 'Medicine A, Medicine B' },
    // Add more appointment objects as needed
  ]);

  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to filter appointments based on search query
  const filteredAppointments = appointments.filter((appointment) => {
    return (
      appointment.callDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.callTime.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.endTime.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.prescription.toLowerCase().includes(searchQuery.toLowerCase())
      // Add more fields to search as needed
    );
  });

  return (
    <div className="view-appointment">
      <h1>View Appointment</h1>
      <div className="search-container">
        <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search appointments..." />
      </div>
      <table className="appointment-table">
        <thead>
          <tr>
            <th>Call Date</th>
            <th>Call Time</th>
            <th>End Time</th>
            <th>Prescription</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.callDate}</td>
              <td>{appointment.callTime}</td>
              <td>{appointment.endTime}</td>
              <td>{appointment.prescription}</td>
              {/* Add more table data as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add more elements/components as needed */}
    </div>
  );
};

export default ViewAppointment;
