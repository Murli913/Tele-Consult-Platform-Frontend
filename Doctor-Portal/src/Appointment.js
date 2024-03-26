import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Appointment = () => {
  const [appointmentList, setAppointmentList] = useState([]);
  const navigate = useNavigate();
  // Get location object

  useEffect(() => {
    // Fetch all call history details for the logged-in doctor
    const fetchAppointments = async () => {
      try {
        // Retrieve doctorId from localStorage
        const doctorId = localStorage.getItem('loggedInDoctorId');
        if (!doctorId) {
          console.error('Doctor ID not found.');
          return;
        }

        const response = await axios.get(`http://localhost:8080/callhistory/doctor/${doctorId}/all`);
        setAppointmentList(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleViewPrescription = (patientId, patientName, prescription) => {
    // Navigate to Prescription component with route state
    console.log({patientId});
    console.log({patientName});
    console.log({prescription});
    navigate('/prescription', { state: { patientId, patientName, prescription } });
  };

  return (
    <div className='container'>
      <h3>Appointment History:</h3><hr/>
      <div className="call-history">
        {appointmentList.map(appointment => (
          <div key={appointment.id} className="card">
            <div className="left">
              <div>Patient id: PID{appointment.patient.id}</div><br/>
              <div>Patient Name: {appointment.patient.name}</div><br/>
              <div>Date: {appointment.callDate}</div>
            </div>
            <div className="right">
              <button onClick={() => handleViewPrescription(appointment.patient.id, appointment.patient.name, appointment.prescription)}>View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointment;
