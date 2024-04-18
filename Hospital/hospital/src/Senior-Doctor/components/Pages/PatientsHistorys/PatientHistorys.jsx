import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PatientHistorys.css'; // Import your CSS file for styling
import axios from 'axios';

const PatientHistorys = () => {
  const [patientHistory, setPatientHistory] = useState([]);

  useEffect(() => {
    loadPatientHistory();
  }, []);

  const loadPatientHistory = async () => {
    try {
      const response = await axios.get("http://localhost:8080/callhistory/seniordoctors/1");
      setPatientHistory(response.data);
      console.log("Patient History", response.data);
    } catch (error) {
      console.error("Error fetching patient history:", error);
    }
  };

  return (
    <div className="patient-history-container">
      <h2>Patient History</h2>

      <table className="patient-history-table">
        <thead>
          <tr>
            <th>Consultant ID</th>
            <th>Patient ID</th>
            <th>Doctor ID</th>
            <th>Consultant Date</th>
            <th>Consultant Time</th>
            <th>Action</th>
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
              <td className="action-column">
                <Link to={`/viewpatienthistory/${patient.id}`} className="action-link">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientHistorys;
