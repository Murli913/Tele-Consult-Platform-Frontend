import React, { useState, useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bg from './videos/bg2.mp4';
import Modal from 'react-modal';
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { IoIosCloseCircle } from "react-icons/io";
Modal.setAppElement('#root');

const Home = () => {
  const [searchStartTime, setSearchStartTime] = useState('');
  const [searchEndTime, setSearchEndTime] = useState('');
  const [filteredCallHistory, setFilteredCallHistory] = useState([]);
  const [selectdate, setselectdate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [callStatistics, setCallStatistics] = useState({});
  const [data, setData] = useState(null);

  const navigate = useNavigate(); // Hook for navigation



  const handleSearch = async () => {
    try {
      const doctorId = localStorage.getItem('loggedInDoctorId');
      const formattedDate = formatDate(selectdate); // Assuming you have a function formatDate to format the date
      console.log(formattedDate);
      let response;
      if (!searchStartTime || !searchEndTime) {
        // Fetch all call history for the doctor for today
        response = await axios.get(`http://localhost:8080/callhistory/doctor/${doctorId}`, {
          params: {
            date: formattedDate
          }
        })
      } else {
        // Fetch call history for the doctor within the specified time range
        response = await axios.get(`http://localhost:8080/callhistory/doctor/${doctorId}`, {
          params: {
            date: formattedDate,
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

  const renderCalendar = () => {
    const currentDate = new Date();
    const year = selectdate.getFullYear();
    const month = selectdate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    const calendar = [];
  for (let i = 0; i < startingDay; i++) {
    calendar.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }

  // Fill in the days of the current month
  for (let i = 1; i <= daysInMonth; i++) {
    const dayDate = new Date(year, month, i);
    const isSelected = dayDate.toDateString() === selectdate.toDateString();
    calendar.push(
      <div
    key={`day-${i}`}
    className={`calendar-day ${isSelected ? 'selected' : ''}`}
    onClick={() => handleDayClick(dayDate)} // This line sets the selected date when a date is clicked
  >
    {i}
  </div>
    );
  }

  return calendar;
};

useEffect(() => {
  // Calculate statistics whenever filteredCallHistory changes
  const calculateStatistics = () => {
    const statistics = {};
    for (let i = 7; i < 24; i++) {
      statistics[i] = 0;
    }
    let maxi = 0;
    filteredCallHistory.forEach(call => {
      const callHour = parseInt(call.callTime.split(":")[0]);
      if (!isNaN(callHour) && callHour >= 7 && callHour <= 23) {
        statistics[callHour]++;
        maxi = Math.max(statistics[callHour],maxi);
      }
    });
    
    setCallStatistics(statistics);
  };
  calculateStatistics();
}, [filteredCallHistory, callStatistics]);

useEffect(() => {
    const hourLabels = [];
    const callCounts = [];
    for (let i = 9; i <= 17; i += 1) {
      hourLabels.push(`${i}:00`);
      callCounts.push(callStatistics[i] || 0); // Use 0 if no calls for the hour
    }
    const labels = hourLabels;
    const newData = {
      labels: labels,
      datasets: [
        {
          label: "My First dataset", // Setting up the label for the dataset
          backgroundColor: "rgb(255, 99, 132)", // Setting up the background color for the dataset
          borderColor: "rgb(255, 99, 132)", // Setting up the border color for the dataset
          data: callCounts, // Setting up the data for the dataset
        },
      ],
    };
    setData(newData);
},[callStatistics, data]);

const handleDayClick = async (date) => {
  setselectdate(date);
  setIsModalOpen(true);
  console.log(date);
  try {
    // Fetch call history for the selected date
    const doctorId = localStorage.getItem('loggedInDoctorId');
    const formattedDate = formatDate(date); // Assuming you have a function formatDate to format the date
    console.log(formattedDate);
    const response = await axios.get(`http://localhost:8080/callhistory/doctor/${doctorId}`, {
      params: {
        date: formattedDate // Pass the selected date to the backend API
      }
    });
    setFilteredCallHistory(response.data);
    
  } catch (error) {
    console.error('Error fetching call history for selected date:', error);
  }
};

const closeModal = () => {
  setIsModalOpen(false);
};

// Define chart options separately


// Prepare data points for every hour interval

return (
  <div className='outer'>
    <video autoPlay loop muted className="background-video">
      <source src={bg} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div className='mainpage'>
      <div className='rightnav'>
        <div className="calendar-container">
          <div className="calendar-header">
          <button onClick={() => {const prevMonthDate = new Date(selectdate.getFullYear(), selectdate.getMonth() - 1, 1);
              setselectdate(prevMonthDate);
            }}>
            Prev
          </button>
            <h5>{selectdate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h5>
            <button onClick={() => setselectdate(new Date(selectdate.getFullYear(), selectdate.getMonth() + 1, 1))}>
              Next
            </button>
          </div>
          <div className="calendar-body">
            <div className="calendar-weekdays">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <div className="calendar-days">
              {renderCalendar()}
            </div>
          </div>
        </div>
        <div className="chart-container">
            <h3>Call Statistics Chart</h3>
            {data && <Line data={data} />} {/* Conditional rendering */}
        </div>
      </div>
      <Modal
  className="modal"
  overlayClassName="modal-overlay"
  isOpen={isModalOpen}
  onRequestClose={closeModal}>
    <button className="close-button" onClick={closeModal}><IoIosCloseCircle /></button>
  {/* Display call history in modal */}
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
  <div className="modal-callhistory">
    {filteredCallHistory.map(call => (
      <div key={call.id} className="modal-card">
        <div className="left">
          <div className="modal-patient-name">Patient Name: {call.patient.name}</div><br/>
          <div className="modal-doctor-name">Doctor Name: {call.doctor.name}</div><br/>
          <div className="modal-call-time">Time: {call.callTime}</div>
        </div>
        <div className="right">
          {/* Pass patient email and doctor name as arguments to handleCallButtonClick */}
          {/* <button className= "callbtn"onClick={() => handleCallButtonClick(call.patient.name, call.doctor.phoneNumber)}>Call</button> */}
        </div>
      </div>
    ))}
  </div>
</Modal>

    </div>
  </div>
);
};

export default Home;

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns 0-indexed month
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};