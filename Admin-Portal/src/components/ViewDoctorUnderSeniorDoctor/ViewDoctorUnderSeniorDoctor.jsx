import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./ViewDoctorUnderSeniorDoctor.scss"
const ViewDoctorUnderSeniorDoctor = () => {
  const { id } = useParams(); // Retrieve the senior doctor's ID from the URL
  const [doctorsUnderSenior, setDoctorsUnderSenior] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSdid, setSelectedSdid] = useState('');
  const [sdidOptions, setSdidOptions] = useState([]);

  useEffect(() => {
    fetchDoctorsUnderSenior();
    fetchSdidOptions();
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

  const fetchSdidOptions = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/sdid-options`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      setSdidOptions(response.data);
    } catch (error) {
      console.error('Error fetching sdid options:', error);
    }
  };

  const handleUpdateSdid = async (doctorId) => {
    try {
      await axios.put(`http://localhost:8080/doctor/${doctorId}/update-sdid/${selectedSdid}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      // Optionally, you can refresh the doctor list after updating sdid
      fetchDoctorsUnderSenior();
    } catch (error) {
      console.error('Error updating sdid:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectSdid = (e) => {
    setSelectedSdid(e.target.value);
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
            placeholder="Search by name, email, or phone number..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <table className="doctor-table">
          <thead>
            <tr>
              <th>Doctor ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.id}</td>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>{doctor.phoneNumber}</td>
                <td>{doctor.gender}</td>
                <td>
                  <select value={selectedSdid} onChange={(e) => handleUpdateSdid(doctor.id, e.target.value)}>
                    <option value="">Select SDID</option>
                    {sdidOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    

};

export default ViewDoctorUnderSeniorDoctor;
