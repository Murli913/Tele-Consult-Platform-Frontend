import React, { useState } from 'react';
import './SeniorDoctorDetails.scss'; // Import the SCSS file for styling
import { useNavigate } from 'react-router-dom';

const SeniorDoctorDetails = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [seniorDoctors, setSeniorDoctors] = useState([
    // Sample senior doctor data, replace it with your actual data
    { name: 'Dr. Johnson', email: 'johnson@example.com', phoneNumber: '123-456-7890', gender: 'Male' },
    // Add more senior doctor objects as needed
  ]);
  const navigate = useNavigate();

  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const gotoAddDoctor = () => {
    navigate("/adddoctor");
  };

  // Function to handle delete senior doctor action
  const handleDeleteSeniorDoctor = (index) => {
    const updatedSeniorDoctors = [...seniorDoctors];
    updatedSeniorDoctors.splice(index, 1);
    setSeniorDoctors(updatedSeniorDoctors);
  };

  return (
    <div className="senior-doctor">
      <h1>List of Senior Doctors</h1>
      <div className="search-container">
        <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search senior doctors..." />
      
      </div>
      <table className="senior-doctor-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {seniorDoctors.map((seniorDoctor, index) => (
            <tr key={index}>
              <td>{seniorDoctor.email}</td>
              <td>{seniorDoctor.name}</td>
              <td>{seniorDoctor.phoneNumber}</td>
              <td>{seniorDoctor.gender}</td>
              <td>
              <button onClick={() => handleDeleteSeniorDoctor(index)}>View</button>
              {" | "}
                <button onClick={() => handleDeleteSeniorDoctor(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeniorDoctorDetails;
