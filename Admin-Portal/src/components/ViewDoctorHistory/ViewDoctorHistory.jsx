// ViewDoctorHistory.js
import React, { useState } from 'react';
import './ViewDoctorHistory.scss';

const ViewDoctorHistory = () => {
  const [doctorHistoryData] = useState([
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 35 },
    { id: 3, name: 'Michael Johnson', age: 40 },
    // Add more dummy data as needed
  ]);

  return (
    <div className="view-doctor-history">
      <h1>List of Patients</h1>
      <div className="search-container">
        <label>Search</label>
        <input type="text" placeholder="Search..." />
      </div>
      <div className="card-container">
        {doctorHistoryData.map((record, index) => (
          <div className="patient-card" key={index}>
            <h2>Patient Record {record.id}</h2>
            <p><strong>ID:</strong> {record.id}</p>
            <p><strong>Name:</strong> {record.name}</p>
            <p><strong>Age:</strong> {record.age}</p>
            {/* Include additional fields as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewDoctorHistory;
