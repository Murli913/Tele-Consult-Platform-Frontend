import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PendingPatientstyle.css';

const PendingPatient = () => {
    const [appointmentList, setAppointmentList] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [calldate, setCallDate] = useState(0);
    const [doctorName, setDoctorName] = useState("18002347");
    const appointmentsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [year, setYear] = useState(new Date().getFullYear());
    const [searchQuery, setSearchQuery] = useState('');
  // Get location object
  

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
        console.log(typeof(doctorId));
        if (!doctorId) {
          console.error('Doctor ID not found.');
          return;
        }
        let response;
          response = await axios.get(`http://localhost:8080/callhistory/waiting?doctorId=${doctorId}`);
        setAppointmentList(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
   

  const paginate = pageNumber => setCurrentPage(pageNumber);
    fetchAppointments();
  }, [selectedMonth, calldate, year]);


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCall = async (patientId, patientName) => {
    try {
      const doctorId = parseInt(localStorage.getItem('loggedInDoctorId'));
      console.log(typeof(patientId));
      console.log(typeof(doctorId));
      const response = await axios.put(`http://localhost:8080/callhistory/set-pincoming-call`, {
        patientId,
        doctorId,
      });
      let i = 0;
      const startTime = Date.now();
      while(true)
      {
        const responce1 = await axios.get(`http://localhost:8080/callhistory/ptacptstatus?patientId=${patientId}`);
        if (Date.now() - startTime >= 12000) {
          i = 0;
          console.log("Loop ended after 120 seconds.");
          break;
        }
        console.log(responce1);
        if(responce1.data === 1)
        {
          i = 1;
          break;
        }
        if(responce1 === -1)
        {
          i = 2;
          break;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      let patientEmail;
      if (!patientName) {
        patientEmail = 'Patient@gmail.com';
      } else {
        patientEmail = `${patientName.replace(/\s+/g, '').toLowerCase()}@gmail.com`;
      }
      if(i === 1)
      {
        navigate('/call', { state: { patientEmail, doctorName} }); 
      }
      else if(i === 0)
      {
        console.log("patient didnt lift the call");
      }
      else if(i === 2)
      {
        console.log("Patient is busy");
      }
      console.log(response.data); // Log the response if needed
    } catch (error) {
      console.error('Error setting pincomingcall:', error);
    }
  };

  const handledontcall = async(patientId) => {
    try{
      console.log(patientId);
      await axios.put(`http://localhost:8080/callhistory/insertback?patientId=${patientId}`)
    } catch{
      console.log("Sorry we cant update");
    }
  }

  
  return (
    <div className='outer1'>
    <div className='container'>
      <div className='searchfilter'>
      <div className='searchbar'>
      <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search your appointments..." />
        <button class="search-button">Search</button>
      </div>
      </div>
      <hr />
      <div className="callhistory">
        {appointmentList.map(appointment => (
          <div key={appointment.id} className="card">
            <div className="left">
              <div>Patient id: PID{appointment.id}</div><br/>
            </div>
            <div className="right">
            <button className="viewbtn" onClick={() => handleCall(appointment.id,appointment.name)}>Call</button>
            <button className="viewbtn" onClick={() => handledontcall(appointment.id)}>Dont Call</button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
    </div>
  );
};

export default PendingPatient;
