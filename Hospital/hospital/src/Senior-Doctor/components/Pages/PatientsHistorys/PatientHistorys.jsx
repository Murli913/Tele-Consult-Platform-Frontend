// PatientHistorys.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PatientHistorys.css';
import { useNavigate } from 'react-router-dom';

const PatientHistorys = () => {
  const [doctorId, setDoctorId] = useState(null);
  const [patientHistory, setPatientHistory] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [filteredPatientHistory, setFilteredPatientHistory] = useState([]);
  const navigate=useNavigate();
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
      loadPatientHistory();
    }
  }, [doctorId]);

  useEffect(() => {
    // Apply filters when search, selected date, or selected time change
    applyFilters();
  }, [search, selectedDate, selectedTime]);

  const loadPatientHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/callhistory/doctor/${doctorId}/callhistory`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      setPatientHistory(response.data);
      setFilteredPatientHistory(response.data); // Set filtered data initially same as all data
    } catch (error) {
      console.error("Error fetching patient history:", error);
    }
  };

  const applyFilters = () => {
    let filteredData = [...patientHistory];

    // Filter by search text
    if (search) {
      filteredData = filteredData.filter(patient =>
        patient.patient.id.toString().includes(search) ||
        patient.doctor.id.toString().includes(search)
      );
    }

    // Filter by selected date
    if (selectedDate) {
      filteredData = filteredData.filter(patient =>
        patient.callDate === selectedDate
      );
    }

    // Filter by selected time
    if (selectedTime) {
      filteredData = filteredData.filter(patient =>
        patient.callTime === selectedTime
      );
    }

    setFilteredPatientHistory(filteredData);
  };

  return (
    <div className="patient-history-container">
      <h2 className="patient-history-heading">Patient History</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Doctor ID or Patient ID"
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="search-filters">
          <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
            <option value="">Select Date</option>
            {patientHistory.map(patient => (
              <option key={patient.id} value={patient.callDate}>{patient.callDate}</option>
            ))}
          </select>
          <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
            <option value="">Select Time</option>
            {patientHistory.map(patient => (
              <option key={patient.id} value={patient.callTime}>{patient.callTime}</option>
            ))}
          </select>
        </div>
      </div>
      <table className="patient-history-table">
        <thead>
          <tr>
            <th>Consultant ID</th>
            <th>Patient ID</th>
            <th>Doctor ID</th>
            <th>Consultant Date</th>
            <th>Consultant Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatientHistory.map(patient => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.patient.id}</td>
              <td>{patient.doctor.id}</td>
              <td>{patient.callDate}</td>
              <td>{patient.callTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientHistorys;
