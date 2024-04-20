import React, { useEffect, useState } from 'react';
import './DoctorUnderSenior.css'; // Import your CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorUnderSenior = () => {
  // Dummy data for doctors (replace with your actual data)
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState(null);
const naviagte=useNavigate();
  useEffect(() => {
    const loadDoctorId = async () => {
      try {
        const email = localStorage.getItem("email");
        const result = await axios.get(`http://localhost:8080/doctor/by-email/${email}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
        setDoctorId(result.data);
      } catch (error) {
        console.error('Error fetching doctor ID:', error);
      }
    };
    loadDoctorId();
  }, []);

  useEffect(() => {
    if (doctorId) {
     loadUsers();
    }
  }, [doctorId]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
  const result = await axios.get(`http://localhost:8080/doctor/under-senior/${doctorId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
  });
    setDoctors(result.data);
  
  };

  // Function to handle doctor removal
  const  handlepatientunderDoctor = (doctorId) => {
    naviagte('/viewpatientunderdoctor',{ state : { doctorId }});
  };
  return (
    <div className="doctor-page-container">
      <h2>Doctor List</h2>

      {/* Table to display doctor entries */}
      <table className="doctor-table">
        <thead>
          <tr>
          <th>Doctor ID</th>
            <th>Gender</th>
            <th>Name</th>
            <th>Phone Number</th>
         
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(doctor => (
            <tr key={doctor.id}>
               <td>{doctor.id}</td>
              <td>{doctor.gender}</td>
              <td>{doctor.name}</td>
              <td>{doctor.phoneNumber}</td>
             
              <td className="action-column">
                {/* Remove action link */}
                <button onClick={() => handlepatientunderDoctor(doctor.id)} className="remove-btn">Patient-History</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorUnderSenior;
