import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Appointmentstyle.css';

const Appointment = () => {
  const [appointmentList, setAppointmentList] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [calldate, setCallDate] = useState(0);
  const appointmentsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [year, setYear] = useState(new Date().getFullYear());
  // Get location object

  const months = [
    { value: 0, label: 'month' },
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  const years = [
    { value: 2020, label: '2020' },
    { value: 2021, label: '2021' },
    { value: 2022, label: '2022' },
    { value: 2023, label: '2023' },
    { value: 2024, label: '2024' },
    { value: 2025, label: '2025' },
    { value: 2026, label: '2026' },
    { value: 2027, label: '2027' },
    { value: 2028, label: '2028' },
    { value: 2029, label: '2029' },
    { value: 2030, label: '2030' },
    { value: 2031, label: '2031' },
    { value: 2032, label: '2032' }
  ];
  

  const days = Array.from({ length: 31 }, (_, index) => ({
    value: index + 1,
    label: index === 0 ? 'Day' : `${index + 1}`
  }));

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
        let response;
          response = await axios.get(`http://localhost:8080/callhistory/doctor/${doctorId}/all`, {
            params: {
              month: selectedMonth,
              day: calldate, // Pad the date with leading zeros if necessary
              year: year
            }
          });
        setAppointmentList(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointmentList.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const paginate = pageNumber => setCurrentPage(pageNumber);
    fetchAppointments();
  }, [selectedMonth, calldate, year]);
  const handleViewPrescription = (patientId, patientName, prescription) => {
    // Navigate to Prescription component with route state
    console.log({patientId});
    console.log({patientName});
    console.log({prescription});
    navigate('/prescription', { state: { patientId, patientName, prescription } });
  };
  
  return (
    <div className='outer1'>
    <div className='container'>
      <div className='searchfilter'>
      <div className='searchbar'>
        <input type='text' placeholder='Search...'></input>
        <button class="search-button">Search</button>
      </div>
      <div className='filters'>
        <select id="daySelect" value={calldate} onChange={e => setCallDate(parseInt(e.target.value))}>
          {days.map(day => (
            <option key={day.value} value={day.value}>{day.label}</option>
          ))}
        </select>
        <select id="monthSelect" value={selectedMonth} onChange={e => setSelectedMonth(parseInt(e.target.value))}>
          {months.map(month => (
            <option key={month.value} value={month.value}>{month.label}</option>
          ))}
        </select>
        <select id="yearSelect" value={year} onChange={e => setYear(parseInt(e.target.value))}>
          {years.map(year => (
            <option key={year.value} value={year.value}>{year.label}</option>
          ))}
        </select>
      </div>
      </div>
      <hr />
      <div className="callhistory">
        {appointmentList.map(appointment => (
          <div key={appointment.id} className="card">
            <div className="left">
              <div>Patient id: PID{appointment.patient.id}</div><br/>
              <div>Patient Name: {appointment.patient.name}</div><br/>
              <div>Date: {appointment.callDate}</div>
            </div>
            <div className="right">
              <button className="viewbtn" onClick={() => handleViewPrescription(appointment.patient.id, appointment.patient.name, appointment.prescription)}>View</button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
    </div>
  );
};

export default Appointment;
