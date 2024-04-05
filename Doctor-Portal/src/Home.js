import React, { useState, useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [searchStartTime, setSearchStartTime] = useState('');
  const [searchEndTime, setSearchEndTime] = useState('');
  const [filteredCallHistory, setFilteredCallHistory] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetchCallHistoryForToday();
  }, []);
  

  const fetchCallHistoryForToday = async () => {
    try {
      // Retrieve doctorId from localStorage
      const doctorId = localStorage.getItem('loggedInDoctorId');
      if (!doctorId) {
        console.error('Doctor ID not found.');
        return;
      }

      // Fetch call history for the logged-in doctor for today
      const response = await axios.get(`http://localhost:8080/callhistory/doctor/${doctorId}`);
      setFilteredCallHistory(response.data);
    } catch (error) {
      console.error('Error fetching call history for today:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const doctorId = localStorage.getItem('loggedInDoctorId');
      let response;
      if (!searchStartTime || !searchEndTime) {
        // Fetch all call history for the doctor for today
        response = await axios.get(`http://localhost:8080/callhistory/doctor/${doctorId}`);
      } else {
        // Fetch call history for the doctor within the specified time range
        response = await axios.get(`http://localhost:8080/callhistory/doctor/${doctorId}`, {
          params: {
            startTime: searchStartTime,
            endTime: searchEndTime
          }
        });
      }
      setFilteredCallHistory(response.data);
    } catch (error) {
      console.error('Error searching call history:', error);
    }
  };
  

  const handleCallButtonClick = (patientName, doctorName) => {
    console.log(doctorName);
    const patientEmail = `${patientName.replace(/\s+/g, '').toLowerCase()}@gmail.com`; // Simulate email using patient name
    navigate('/call', { state: { patientEmail, doctorName } });
  };

  return (
    <div className="container">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Start Time (HH:MM)" 
          value={searchStartTime}
          onChange={e => setSearchStartTime(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="End Time (HH:MM)" 
          value={searchEndTime}
          onChange={e => setSearchEndTime(e.target.value)}
        />
        <button className="searchbtn" onClick={handleSearch}>Search</button>
      </div>
      <h3>Today's Calls:</h3><hr/>
      <div className="call-history">
        {filteredCallHistory.map(call => (
          <div key={call.id} className="card">
            <div className="left">
              {/* <div>Patient id: {call.patient.id}</div><br /> */}
              <div>Patient Name: {call.patient.name}</div><br/>
              <div>Doctor Name: {call.doctor.name}</div><br/>
              <div>Time: {call.callTime}</div>
            </div>
            <div className="right">
              {/* Pass patient email and doctor name as arguments to handleCallButtonClick */}
              {/* <button className= "callbtn"onClick={() => handleCallButtonClick(call.patient.name, call.doctor.phoneNumber)}>Call</button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
