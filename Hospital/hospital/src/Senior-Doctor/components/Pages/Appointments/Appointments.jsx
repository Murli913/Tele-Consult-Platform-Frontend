import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';
import "./Appointment.css"

const Appointments = () => {
  const [doctorId, setDoctorId] = useState(null);
  const [doctorHistoryData, setDoctorHistoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } 
},[]);

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
      fetchDoctorHistory();
    }
  }, [doctorId]);

  useEffect(() => {
    if (searchText === '') {
      setFilteredData(doctorHistoryData);
    } else {
      const filtered = doctorHistoryData.filter(appointment => appointment.id.toString().includes(searchText));
      setFilteredData(filtered);
    }
  }, [searchText, doctorHistoryData]);

  const handleUpdateDoctor = (appointmentId) => {
    console.log("appointtest", appointmentId);
    navigate('/updateappointment', { state: { appointmentId } });
  };

  const fetchDoctorHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/callhistory/doctor/${doctorId}/callhistory`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      setDoctorHistoryData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching doctor history:', error);
    }
  };

  const gotoAddAppointment = () => {
    navigate("/saddappointment");
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="appointments-container">
      <div className="appointment-heading">
        <h2>Appointments</h2>
        <Button onClick={gotoAddAppointment} className="btn-add-appointment">Add Appointment</Button>
      </div>
      <div className="search-container">
  
  <input
    type="text"
    placeholder="Search by Appointment ID"
    value={searchText}
    onChange={handleSearch}
    className="search-input"
  />
</div>


      <div className={`appointments-list-container ${doctorHistoryData.length > 6 ? 'sliding' : ''}`}>
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Call Date</th>
              <th>Call Time</th>
              <th>Patient ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.slice(0, 6).map(appointment => ( // Display only the first 6 filtered records
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{appointment.callDate}</td>
                <td>{appointment.callTime}</td>
                <td>{appointment.patient.id}</td>
                <td className="action-column">
                  <button onClick={() => handleUpdateDoctor(appointment.id)} className="btn-update">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {doctorHistoryData.length > 6 && ( // Show a message if there are more than 6 records
          <p className="scroll-message">Showing 6 out of {doctorHistoryData.length} records.</p>
        )}
      </div>
    </div>
  );
};

export default Appointments;
