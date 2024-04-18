import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ViewPatientHistory.css'; // Import your CSS file for styling
import axios from 'axios';

const ViewPatientHistory = ({ match }) => {
  const [patientHistory, setPatientHistory] = useState([]);

  useEffect(() => {
    loadPatientHistory();
  }, []);

  const loadPatientHistory = async () => {
    try {
      if (!match.params || !match.params.id) {
        console.error("Patient ID not found in URL");
        return;
      }
      const response = await axios.get(`http://localhost:8080/callhistory/${match.params.id}`);
      setPatientHistory(response.data);
      console.log("Patient History", response.data);
    } catch (error) {
      console.error("Error fetching patient history:", error);
    }
  };
  

  return (
    <div className="view-patient-history-container">
      <h2>View Patient History</h2>

      <table className="view-patient-history-table">
        <thead>
          <tr>
            <th>Consultant ID</th>
            <th>Patient ID</th>
            <th>Doctor ID</th>
            <th>Consultant Date</th>
            <th>Consultant Time</th>
          </tr>
        </thead>
        <tbody>
          {patientHistory.map(patient => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.patient.id}</td>
              <td>{patient.doctor.id}</td>
              <td>{patient.callDate}</td>
              <td>{patient.callTime}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/patienthistory" className="back-link">Back to Patient History</Link>
    </div>
  );
};

export default ViewPatientHistory;
