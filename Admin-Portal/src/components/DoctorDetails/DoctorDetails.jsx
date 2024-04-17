import React, { useEffect, useState } from 'react';
import './DoctorDetails.scss'; // Import the SCSS file for styling
import { useNavigate } from 'react-router-dom';

const DoctorDetails = () => {
  const navigate=useNavigate();
  useEffect(() => {
    if(localStorage.getItem("token") === null)
    {
      navigate("/");
    }
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [doctors, setDoctors] = useState([
    // Sample doctor data, replace it with your actual data
    { name: 'Dr. Smith', email: 'smith@example.com', phoneNumber: '987-654-3210', gender: 'Male' },
    // Add more doctor objects as needed
  ]);
  

  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const gotoadddoctor= () => {
 navigate("/adddoctor");
  };

  // Function to filter doctors based on search query
  const filteredDoctors = doctors.filter((doctor) => {
    return (
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.gender.toLowerCase().includes(searchQuery.toLowerCase())
      // Add more fields to search as needed
    );
  });

  // Function to handle delete doctor action
  const handleDeleteDoctor = (index) => {
    const updatedDoctors = [...doctors];
    updatedDoctors.splice(index, 1);
    setDoctors(updatedDoctors);
  };

  return (
    <div className="doctor-details">
      <h1>List of Doctors</h1>
      <div className="search-container">
        <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search doctors..." />
        {/* Add a search icon button here if needed */}
        <br/>
        <button className="add-doctor-btn" onClick={gotoadddoctor}>Add New Doctor</button>
      </div>
      <table className="doctor-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Action</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.map((doctor, index) => (
            <tr key={index}>
              <td>{doctor.name}</td>
              <td>{doctor.email}</td>
              <td>{doctor.phoneNumber}</td>
              <td>{doctor.gender}</td>
              <td>
                <button onClick={() => handleDeleteDoctor(index)}>Delete</button>
              </td>
              {/* Add more table data as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add more elements/components as needed */}
    </div>
  );
};

export default DoctorDetails;
