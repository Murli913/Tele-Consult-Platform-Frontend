import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./ViewDoctorUnderSeniorDoctor.scss";

const ViewDoctorUnderSeniorDoctor = () => {
  const { id } = useParams(); // Retrieve the senior doctor's ID from the URL
  const [doctorsUnderSenior, setDoctorsUnderSenior] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
console.log("seniordoctorid", id);
  useEffect(() => {
    fetchDoctorsUnderSenior();
  }, [id]); // Ensure useEffect runs whenever the senior doctor's ID changes

  const fetchDoctorsUnderSenior = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/doctor/under-senior/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      setDoctorsUnderSenior(response.data);
    } catch (error) {
      console.error('Error fetching doctors under senior doctor:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const styles = {
    editButton: {
      padding: '8px 12px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      backgroundColor: '#007bff',
      color: '#fff',
      marginRight: '5px',
  
      '&:hover': {
        backgroundColor: '#0056b3',
      },
    },
  };
  

  // Filter doctors based on search query
  const filteredDoctors = doctorsUnderSenior.filter((doctor) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      doctor.name.toLowerCase().includes(searchLower) ||
      doctor.email.toLowerCase().includes(searchLower) ||
      doctor.phoneNumber.toLowerCase().includes(searchLower)
    );
  });


  

  return (
    <div className="view-doctor">
      <h1>Doctors Under Senior Doctor</h1>
    
      <div className="search-container">
      

        <input
          type="text"
          placeholder="Search by name,email or phonenumber..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <button className="add-doctor-btn">Add New Doctor</button>
      <br/>
      <br/>
      <table className="doctor-table">
        <thead>
          <tr>
            <th>Doctor-id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.map((doctor, index) => (
            <tr key={index}>
              <td>{doctor.id}</td>
              <td>{doctor.name}</td>
              <td>{doctor.email}</td>
              <td>{doctor.phoneNumber}</td>
              <td>{doctor.gender}</td>
              <td>
              <button style={styles.editButton}>Edit</button>

               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewDoctorUnderSeniorDoctor;
