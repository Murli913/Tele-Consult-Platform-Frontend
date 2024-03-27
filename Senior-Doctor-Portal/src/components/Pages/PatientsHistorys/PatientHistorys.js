import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PatientHistorys.css'; // Import your CSS file for styling
import axios from 'axios';

const PatientHistorys = () => {
  // Dummy data for patient history (replace with your actual data)
  const [patientHistory, setPatientHistory] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
  const result = await axios.get("http://localhost:8080/callhistory/seniordoctors/1");
    setPatientHistory(result.data);
    console.log("Doctors", result.data);
  };

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
            <th>Patient ID</th>
         
            <th>Consultant-Date</th>
            <th>Consultant-Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patientHistory.map(patient => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
             
              <td>{patient.callDate}</td>
              <td>{patient.callTime}</td>

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
