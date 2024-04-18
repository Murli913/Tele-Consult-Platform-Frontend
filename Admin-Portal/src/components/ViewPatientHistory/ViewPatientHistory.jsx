// ViewPatientHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './ViewPatientHistory.scss';

const ViewPatientHistory = () => {
  const location = useLocation();
  const { patientId } = location.state;
  const [patientHistoryData, setPatientHistoryData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (patientId) {
      fetchPatientHistory();
    }
  }, [patientId]);

  const fetchPatientHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/callhistory/${patientId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      setPatientHistoryData(response.data);
    } catch (error) {
      console.error('Error fetching patient history:', error);
    }
  };

  const filteredPatientHistory = patientHistoryData.filter(patient => {
    return String(patient.doctor.id).toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="view-patient-history">
      <h1>Patient History</h1>
      <div className="search-container">
        <label>Search Doctor ID</label>
        <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search by doctor ID..." />
      </div>
      <div className="card-container">
        {filteredPatientHistory.map((patient, index) => (
          <div className="patient-card" key={index}>
            <h2>Record-ID: {patient.id}</h2>
            <p><strong>Doctor-ID:</strong> {patient.doctor.id}</p>
            <p><strong>Prescription:</strong> {patient.prescription}</p>
            <p><strong>Call Date:</strong> {patient.callDate}</p>
            <p><strong>Call Time:</strong> {patient.callTime}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewPatientHistory;
