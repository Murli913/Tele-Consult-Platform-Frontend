import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Appointment.css'; // Import your CSS file for styling
import axios from 'axios';
import { Button } from '@mui/material';

const Appointments = () => {
  const [doctorId, setDoctorId] = useState(null);
  const [doctorHistoryData, setDoctorHistoryData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDoctorId = async () => {
      try {
        const email = localStorage.getItem("email");
        const tkn = localStorage.getItem("token");
        console.log(tkn);
        // console.log(`http://localhost:8080/doctor/by-email/${email}`);
        const result = await axios.get(`http://localhost:8080/doctor/by-email/${email}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
        setDoctorId(result.data);
        console.log("Doctor ID:", result.data);
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
console.log("doctorid", doctorId);
  const fetchDoctorHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/callhistory/doctor/${doctorId}/callhistory`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log("Response:", response.data);
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
      <div className={`appointments-list-container ${doctorHistoryData.length > 2 ? 'sliding' : ''}`}>
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
                  <Link to={`/sappointments/${appointment.id}`} className="action-linkk">View</Link> |{' '}
                  <Link to={`/appointments/${appointment.id}/edit`} className="action-linkk">Edit</Link>
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
