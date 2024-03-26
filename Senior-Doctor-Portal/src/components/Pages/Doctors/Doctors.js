import React, { useState } from 'react';
import './Doctors.css'; // Import your CSS file for styling

const Doctors = () => {
  // Dummy data for doctors (replace with your actual data)
  const [doctors, setDoctors] = useState([
    { id: 1, gender: 'Male', name: 'Dr. John Doe', phoneNumber: '123-456-7890' },
    { id: 2, gender: 'Female', name: 'Dr. Jane Smith', phoneNumber: '987-654-3210' },
    { id: 3, gender: 'Female', name: 'Dr. Jane Smith', phoneNumber: '987-654-3210' },
    { id: 4, gender: 'Female', name: 'Dr. Jane Smith', phoneNumber: '987-654-3210' },
    { id: 5, gender: 'Female', name: 'Dr. Jane Smith', phoneNumber: '987-654-3210' },
    // Add more doctors as needed
  ]);

  // Function to handle doctor removal
  const handleRemoveDoctor = (id) => {
    setDoctors(doctors.filter(doctor => doctor.id !== id));
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
