import React, { useEffect, useState } from 'react';
import './Doctors.css'; // Import your CSS file for styling
import axios from 'axios';

const Doctors = () => {
  // Dummy data for doctors (replace with your actual data)
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
  const result = await axios.get("http://localhost:8080/doctor/supervisor/1");
    setDoctors(result.data);
  
  };

  // Function to handle doctor removal
  const handleRemoveDoctor = async (id) => {
    await axios.delete(`http://localhost:8080/doctor/doctor/${id}`);
    loadUsers();
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
                <button onClick={() => handleRemoveDoctor(doctor.id)} className="remove-btn">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Doctors;
