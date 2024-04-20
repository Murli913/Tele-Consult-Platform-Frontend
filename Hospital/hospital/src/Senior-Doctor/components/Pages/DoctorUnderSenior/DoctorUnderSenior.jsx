import React, { useEffect, useState } from 'react';
import './DoctorUnderSenior.css'; // Import your CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorUnderSenior = () => {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState(null);
  const navigate = useNavigate();

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

  const loadUsers = async () => {
    const result = await axios.get(`http://localhost:8080/doctor/under-senior/${doctorId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    });
    setDoctors(result.data);
  };

  const handlePatientUnderDoctor = (doctorId) => {
    navigate('/viewpatientunderdoctor', { state: { doctorId } });
  };

  return (
    <div className="doctor-dialog-container">
      <div className="doctor-dialog">
        <h2 className="doctor-heading">Doctor List</h2>

        {/* Search input field */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Doctor..."
            className="search-input"
          />
        </div>

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
                  <button
                    onClick={() => handlePatientUnderDoctor(doctor.id)}
                    className="patient-history-btn"
                  >
                    Patient History
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorUnderSenior;
