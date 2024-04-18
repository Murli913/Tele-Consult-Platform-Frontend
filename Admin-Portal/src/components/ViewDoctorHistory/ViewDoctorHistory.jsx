import React, { useState, useEffect } from 'react';
import './ViewDoctorHistory.scss';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ViewDoctorHistory = () => {
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
      <h1>Call History for Doctor ID: {doctorId}</h1>
      <div className="search-container">
        <label>Search by Patient ID</label>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by Patient ID..."
        />
      </div>
      <div className="card-container">
        {filteredDoctorHistory.map((record, index) => (
          <div className="call-record" key={index}>
            <h2>Call Record {record.id}</h2>
            <p><strong>Patient ID:</strong> {record.patient.id}</p>
            <p><strong>Date:</strong> {record.callDate}</p>
            <p><strong>Time:</strong> {record.callTime}</p>
            <p><strong>Prescription:</strong> {record.prescription}</p>
            {/* Include additional fields as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewDoctorHistory;