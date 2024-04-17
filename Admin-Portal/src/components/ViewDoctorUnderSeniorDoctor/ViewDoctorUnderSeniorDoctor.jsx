import React, { useState } from 'react';
import './ViewDoctorUnderSeniorDoctor.scss'; // Import the SCSS file for styling
import { useNavigate } from 'react-router-dom';

const ViewDoctorUnderSenior = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("token") === null)
    {
      navigate("/");
    }
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [doctors, setDoctors] = useState([
    // Sample doctor data, replace it with your actual data
    { id: 1, name: 'Dr. Smith', gender: 'Male', phoneNumber: '987-654-3210' },
    // Add more doctor objects as needed
  ]);
const naviagte=useNavigate();
  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const gotoadddoctor = () => {
   naviagte("/adddoctorinseniordoctor")
  };


  // Function to filter doctors based on search query
  const filteredDoctors = doctors.filter((doctor) => {
    return (
      doctor.id.toString().includes(searchQuery) ||
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Function to handle delete doctor action
  const handleDeleteDoctor = (id) => {
    const updatedDoctors = doctors.filter((doctor) => doctor.id !== id);
    setDoctors(updatedDoctors);
  };

  return (
    <div className="view-doctor">
      <h1>List of Doctors</h1>
      <button className="add-doctor-btn" onClick={gotoadddoctor}>Add New Doctor</button>
      <br/>
      <br/>
      <div className="search-container">
        <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search doctors..." />
      </div>
      <table className="doctor-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.name}</td>
              <td>{doctor.gender}</td>
              <td>{doctor.phoneNumber}</td>
              <td>
                <button onClick={() => handleDeleteDoctor(doctor.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewDoctorUnderSenior;
