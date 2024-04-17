import React, { useState, useEffect } from 'react';
import './PatientDetails.scss'; // Import the SCSS file for styling
import axios from 'axios';

const PatientDetails = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:8080/patient/all', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to filter patients based on search query
  const filteredPatients = patients.filter((patient) => {
    const query = searchQuery.toLowerCase();
    return (
      patient.name.toLowerCase().includes(query) ||
      patient.email.toLowerCase().includes(query) ||
      patient.phoneNumber.includes(searchQuery)
    );
  });

  return (
    <div className="patient-details">
      <h1>Patient Details</h1>
      <div className="search-container">
      <label style={{fontWeight: 'bold', fontFamily: 'Arial, sans-serif'}}>Search</label>
        <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search patients by name, email, or phone number..." />
        {/* Add a search icon button here if needed */}
      </div>
      <table className="patient-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Phone Number</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient, index) => (
            <tr key={index}>
              <td>{patient.name}</td>
              <td>{patient.email}</td>
              <td>{patient.gender}</td>
              <td>{patient.phoneNumber}</td>
              {/* Add more table data as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add more elements/components as needed */}
    </div>
  );
};

export default PatientDetails;
