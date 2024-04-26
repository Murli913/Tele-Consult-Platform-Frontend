import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ViewAppointment.css'; // Import your CSS file for styling

const ViewAppointment = ({ appointments }) => {
  const navigate=useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } 
},[]);
  const { id } = useParams();
  const appointment = appointments.find(appointment => appointment.id === parseInt(id));

  if (!appointment) {
    return <div className="view-appointment-container">Appointment not found.</div>;
  }

  return (
    <div className="view-appointment-container">
      <h2>Appointment Details</h2>
      <div className="appointment-details">
        <div className="detail">
          <strong>Patient Name:</strong> {appointment.patientName}
        </div>
        <div className="detail">
          <strong>Doctor Name:</strong> {appointment.doctorName}
        </div>
        <div className="detail">
          <strong>Date:</strong> {appointment.date}
        </div>
        <div className="detail">
          <strong>Time:</strong> {appointment.time}
        </div>
      </div>
    </div>
  );
};

export default ViewAppointment;
