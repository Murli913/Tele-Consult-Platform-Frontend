import React, { useState, useEffect } from 'react';
import './DoctorDetails.scss';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DoctorDetails = () => {
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

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:8080/doctor/all', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      const sortedDoctors = response.data.sort((a, b) => a.name.localeCompare(b.name));
      setDoctors(sortedDoctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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
      toast.error("Error occurred while deleting doctor");
    }
  };

  const handleViewCallHistory = (doctorId) => {
    navigate('/viewdoctorhistory',{ state : { doctorId }});
  };

  return (
    <div className="doctor-details">
      <h1>List of Doctors</h1>
      <div className="search-container">
        <label style={{fontWeight: 'bold', fontFamily: 'Arial, sans-serif'}}>Search</label>
        <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search doctors..." />
        <br />
        <br/>
        <Link to="/adddoctor" className="add-doctor-btn">Add New Doctor</Link>
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
                <button onClick={() => handleViewCallHistory(doctor.id)} style={{ backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 16px', cursor: 'pointer' }}>View Call History</button>
                {" | "}
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

export default DoctorDetails;
