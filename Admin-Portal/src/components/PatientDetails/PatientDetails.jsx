// PatientDetails.js
import React, { useState, useEffect } from 'react';
import './PatientDetails.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PatientDetails = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } else {
      fetchPatients();
    }
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:8080/patient/all', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      const sortedPatients = response.data.sort((a, b) => a.name.localeCompare(b.name));
      setPatients(sortedPatients);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleView = (patientId) => {
    navigate('/viewpatienthistory',{ state : { patientId }});
  };

  return (
    <div className="patient-details">
      <h1>Patient Details</h1>
      <div className="search-container">
        <label style={{fontWeight: 'bold', fontFamily: 'Arial, sans-serif'}}>Search</label>
        <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search patients by name, email, or phone number..." />
      </div>
      <table className="patient-table">
        <thead>
          <tr>
            <th>Patient-id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Phone Number</th>
            <th>Prescription History</th>
          </tr>
        </thead>
        <tbody>
          {patients.filter((patient) => patient.name.toLowerCase().includes(searchQuery.toLowerCase())).map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.email}</td>
              <td>{patient.gender}</td>
              <td>{patient.phoneNumber}</td>
              <td>
                <button className="view-button" onClick={() => handleView(patient.id)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientDetails;
