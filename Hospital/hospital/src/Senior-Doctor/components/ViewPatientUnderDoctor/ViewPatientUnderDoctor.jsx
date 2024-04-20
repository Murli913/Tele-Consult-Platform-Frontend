// ViewPatientUnderDoctor.js
import React, { useState, useEffect } from 'react';
import './ViewPatientUnderDoctor.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ViewPatientUnderDoctor = () => {
  const [doctorHistoryData, setDoctorHistoryData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { doctorId } = location.state;

  useEffect(() => {
    fetchDoctorHistory();
  }, []);

  const fetchDoctorHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/callhistory/doctor/${doctorId}/callhistory`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      setDoctorHistoryData(response.data);
    } catch (error) {
      console.error('Error fetching doctor history:', error);
    }
  };

  const filteredDoctorHistory = doctorHistoryData.filter(record => {
    return record.patient.id.toString().includes(searchQuery);
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="view-doctor-history">
      <h1 className="doctor-list-heading">Doctor History</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by Patient ID..."
          className="search-input"
        />
      </div>
      <table className="doctor-history-table">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Doctor ID</th>
            <th>Consultant Date</th>
            <th>Consultant Time</th>
            <th>Prescription</th>
          </tr>
        </thead>
        <tbody>
          {filteredDoctorHistory.map((record, index) => (
            <tr key={index}>
              <td>{record.patient.id}</td>
              <td>{record.doctor.id}</td>
              <td>{record.callDate}</td>
              <td>{record.callTime}</td>
              <td>{record.prescription}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPatientUnderDoctor;
