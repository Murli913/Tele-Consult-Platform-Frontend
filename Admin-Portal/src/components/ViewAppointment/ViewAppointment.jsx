import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewAppointment.scss'; // Import the SCSS file for styling
import { useNavigate } from 'react-router-dom';

const ViewAppointments = () => {
  console.log("hello"); 
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [availableDoctorIds, setAvailableDoctorIds] = useState([]);
  const [availablePatientIds, setAvailablePatientIds] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      fetchAppointments();
    }
  }, [navigate]);
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/callhistory/admin/all', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      const sortedAppointments = response.data.sort((a, b) => new Date(b.callDate) - new Date(a.callDate));
      setAppointments(sortedAppointments);

      // Extract available dates, times, doctor IDs, and patient IDs from appointments
      const dates = sortedAppointments.map(appointment => appointment.callDate);
      const uniqueDates = [...new Set(dates)];
      setAvailableDates(uniqueDates);

      const times = sortedAppointments.map(appointment => appointment.callTime);
      const uniqueTimes = [...new Set(times)];
      setAvailableTimes(uniqueTimes);

      const doctorIds = sortedAppointments.map(appointment => appointment.doctor.id);
      const uniqueDoctorIds = [...new Set(doctorIds)];
      setAvailableDoctorIds(uniqueDoctorIds);

      const patientIds = sortedAppointments.map(appointment => appointment.patient.id);
      const uniquePatientIds = [...new Set(patientIds)];
      setAvailablePatientIds(uniquePatientIds);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle date selection
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Function to handle time selection
  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  // Function to handle doctor ID selection
  const handleDoctorIdChange = (e) => {
    setSelectedDoctorId(e.target.value);
  };

  // Function to handle patient ID selection
  const handlePatientIdChange = (e) => {
    setSelectedPatientId(e.target.value);
  };

  // Filter appointments by selected criteria
  const filteredAppointments = appointments.filter(appointment =>
    (!selectedDate || appointment.callDate === selectedDate) &&
    (!selectedTime || appointment.callTime === selectedTime) &&
    (!selectedDoctorId || appointment.doctor.id === parseInt(selectedDoctorId)) &&
    (!selectedPatientId || appointment.patient.id === parseInt(selectedPatientId))
  );

  return (
    <div className="view-appointment">
     
      <h1>View Appointment</h1>
      <div className="search-container">
        <select value={selectedDate} onChange={handleDateChange}>
          <option value="">Select Date</option>
          {availableDates.map(date => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>
        <select value={selectedTime} onChange={handleTimeChange}>
          <option value="">Select Time</option>
          {availableTimes.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
        <select value={selectedDoctorId} onChange={handleDoctorIdChange}>
          <option value="">Select Doctor ID</option>
          {availableDoctorIds.map(id => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>
        <select value={selectedPatientId} onChange={handlePatientIdChange}>
          <option value="">Select Patient ID</option>
          {availablePatientIds.map(id => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>
      </div>
      <table className="appointment-table">
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Patient</th>
            <th>Call Date</th>
            <th>Call Time</th>
            <th>End Time</th>
            <th>Prescription</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.doctor.id}</td>
              <td>{appointment.patient.id}</td>
              <td>{appointment.callDate}</td>
              <td>{appointment.callTime}</td>
              <td>{appointment.endTime}</td>
              <td>{appointment.prescription}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAppointments;
