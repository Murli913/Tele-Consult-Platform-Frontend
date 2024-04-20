import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';
import "./Appointment.css"
const Appointments = () => {
  const [doctorId, setDoctorId] = useState(null);
  const [doctorHistoryData, setDoctorHistoryData] = useState([]);
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
      fetchDoctorHistory();
    }
  }, [doctorId]);

  const handleupdatedoctor = (appointmentId) => {
    console.log("appointtest", appointmentId);
    navigate('/updateappointment',{ state : { appointmentId }});
  };

  const fetchDoctorHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/callhistory/doctor/${doctorId}/callhistory`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      setDoctorHistoryData(response.data);
    } catch (error) {
      console.error('Error fetching doctor history:', error);
    }
  };

  const gotoAddAppointment = () => {
    navigate("/saddappointment");
  };

  return (
    <div className="appointments-container">
      <h2>Appointments</h2>
      <Button onClick={gotoAddAppointment}>Add Appointment</Button>
      <div className={`appointments-list-container ${doctorHistoryData.length > 10 ? 'sliding' : ''}`}>
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Appointment-id</th>
              <th>Call-Date</th>
              <th>Call-Time</th>
              <th>Patient-Id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctorHistoryData.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{appointment.callDate}</td>
                <td>{appointment.callTime}</td>
                <td>{appointment.patient.id}</td>
                <td className="action-column">
                <button onClick={() => handleupdatedoctor(appointment.id)} style={{ backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 16px', cursor: 'pointer' }}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
