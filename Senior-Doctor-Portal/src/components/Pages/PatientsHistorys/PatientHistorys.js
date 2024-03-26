import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PatientHistorys.css'; // Import your CSS file for styling

const PatientHistorys = () => {
  // Dummy data for patient history (replace with your actual data)
  const [patientHistory, setPatientHistory] = useState([
    { id: 1, patientName: 'John Doe', doctorName: 'Dr. Smith', date: '2024-03-22' },
    { id: 2, patientName: 'Jane Smith', doctorName: 'Dr. Brown', date: '2024-03-24' },
    { id: 3, patientName: 'Jane Smith', doctorName: 'Dr. Brown', date: '2024-03-24' },
    { id: 4, patientName: 'Jane Smith', doctorName: 'Dr. Brown', date: '2024-03-24' },
    { id: 5, patientName: 'Jane Smith', doctorName: 'Dr. Brown', date: '2024-03-24' },
    { id: 6, patientName: 'Jane Smith', doctorName: 'Dr. Brown', date: '2024-03-24' },
    { id: 7, patientName: 'Jane Smith', doctorName: 'Dr. Brown', date: '2024-03-24' },
    { id: 8, patientName: 'Jane Smith', doctorName: 'Dr. Brown', date: '2024-03-24' },
    // Add more patient history as needed
  ]);

  // Function to render detailed view of patient details
  const renderDetailView = (patientId) => {
    // Code to display detailed view of patient details
    console.log(`Viewing details for patient with ID ${patientId}`);
  };

  return (
    <div className="patient-history-container">
      <h2>Patient History</h2>

      {/* Table to display patient history */}
      <table className="patient-history-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Doctor Name</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patientHistory.map(patient => (
            <tr key={patient.id}>
              <td>{patient.patientName}</td>
              <td>{patient.doctorName}</td>
              <td>{patient.date}</td>
              <td className="action-column">
                {/* Link to view patient details */}
                <button onClick={() => renderDetailView(patient.id)} className="action-link">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientHistorys;
