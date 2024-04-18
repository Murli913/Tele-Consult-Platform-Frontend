import React, { useState, useEffect } from 'react';
import './SeniorDoctorDetails.scss'; // Import the SCSS file for styling
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SeniorDoctorDetails = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);
  const styles = {
    button: {
      padding: '10px 20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      '&:hover': {
        backgroundColor: '#45a049',
      },
    },
  };
  

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:8080/doctor/all', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const  gotodoctorundersenior = () => {
    navigate("/viewdoctorundersenior");
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      doctor.name.toLowerCase().includes(searchLower) ||
      doctor.email.toLowerCase().includes(searchLower) ||
      doctor.phoneNumber.toLowerCase().includes(searchLower)
    );
  });

  const handleDeleteDoctor = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/doctor/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      fetchDoctors();
      toast.success("Doctor deleted successfully");
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  return (
    <div className="doctor-details">
      <h1>List of Senior Doctors</h1>
      <div className="search-container">
      <label style={{fontWeight: 'bold', fontFamily: 'Arial, sans-serif'}}>Search</label>

        <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search doctors..." />
        <br />
        <br/>
      
      </div>
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
              <button style={styles.button} onClick={gotodoctorundersenior}>View</button>

                {"  | "}
              <button onClick={() => handleDeleteDoctor(doctor.id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 16px', cursor: 'pointer' }}>Delete</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default SeniorDoctorDetails;
