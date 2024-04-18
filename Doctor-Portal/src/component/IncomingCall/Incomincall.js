// IncomingCall.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./IncomingStyle.css";
 // Import your CSS file for styling

const IncomingCall = ({ doctorId }) => {
  const [aptid, setaptid] = useState('');
  const [incomingCall, setIncomingCall] = useState(null);
  const [patientId, setPatientId] = useState(null);
  const [patientName, setPatientName] = useState(null);
  const [doctorName, setDoctorName] = useState(null);
  const [callDate, setCallDate] = useState('');
  const [callTime, setCallTime] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const authtoken = localStorage.getItem('token');

  

  useEffect(() => {
    const fetchIncomingCall = async () => {
      try {

        const doctorId = localStorage.getItem('loggedInDoctorId');
        if (!doctorId) {
            console.error('Doctor ID not found.');
            return;
        }
        // Fetch the incoming call details for the logged-in doctor
        console.log(authtoken);
        const response = await axios.get(`http://localhost:8080/doctor/${doctorId}/incoming-call`, {
          headers: {
            'Authorization': `Bearer ${authtoken}`
          }
        });
        console.log(response.data);
        setIncomingCall(response.data);
      } catch (error) {
        setError('Error fetching incoming call details');
      }
    };

    fetchIncomingCall();
  }, [doctorId]);

  const handleAccept = async (patientName, doctorName) => {
    try {
      const nptid = parseInt(patientId);
      const ndocid = parseInt(localStorage.getItem('loggedInDoctorId')); 
      const now = new Date();
      const istDateTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }).format(now);
      
      console.log("IST Time:", istDateTime); 
      const payload = {
        doctor: { id: ndocid }, // Use the correct field name 'doctor'
        patient: { id: nptid },
        callDate: new Date().toISOString().slice(0,10),
        callTime: istDateTime,
         // Current time // You can set prescription if needed
      };
      
      // Add the entry to the callhistory table
      const response = await axios.post('http://localhost:8080/callhistory/add', payload);
  
      // Retrieve the ID of the added entry
      const addedEntryId = response.data; // Assuming the server returns the ID in the response
      localStorage.setItem('CallId', addedEntryId);

      
      // Redirect to call page
      let patientEmail;
      if (!patientName) {
        patientEmail = 'Patient@gmail.com';
      } else {
        patientEmail = `${patientName.replace(/\s+/g, '').toLowerCase()}@gmail.com`;
      }
      navigate('/call', { state: { patientEmail, doctorName} }); // Pass the added entry ID to the call page
    } catch (error) {
      setError('Error accepting call');
    }
  };
  

  const handleReject = async () => {
    const doctorId = localStorage.getItem('loggedInDoctorId');
    try {
      await axios.put(`http://localhost:8080/callhistory/${doctorId}/reject-call`, {
        headers:{
          'Authorization':`Bearer ${authtoken}`
        }
      });
      // Optionally, you can reset the state variables or perform any other necessary actions
    } catch (error) {
      setError('Error rejecting call');
    }
  };

  const handleScheduleCall = async () => {
    try {
      const nptid = parseInt(patientId);
      const ndocid = parseInt(localStorage.getItem('loggedInDoctorId')); 
      const payload = {
        doctor: { id: ndocid }, // Use the correct field name 'doctor'
        patient: { id: nptid }, // Assuming doctorId is a number or string // Assuming patientId is a number or string
        callDate,
        callTime,
      };
      console.log(payload);
      await axios.post('http://localhost:8080/callhistory/schedule', payload);
      // Optionally, you can reset the form fields or perform any other necessary actions
    } catch (error) {
      setError('Error scheduling call');
    }
  };

  useEffect(() => {
    if (incomingCall) {
      // Extract the patient's ID from the phone number in incoming call
      const fetchPatientId = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/doctor/id?phoneNumber=${incomingCall}`,{
            headers: {
              'Authorization': `Bearer ${authtoken}`
            }
          });
          console.log(response.data.id);
          console.log(response.data.name);
          setPatientId(response.data.id);
          setPatientName(response.data.name);
        } catch (error) {
          setError('Error fetching patient ID');
        }
      };

      fetchPatientId();
    }
  }, [incomingCall]);


  useEffect(() => {
    if (localStorage.getItem('loggedInDoctorId')) {
      const doctorId = localStorage.getItem('loggedInDoctorId');
      const fetchDoctorName = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/doctor/phone/${doctorId}`,{
            headers: {
              'Authorization': `Bearer ${authtoken}`
            }
          });
          console.log(response.data);
          const phoneNumberAsString = response.data.toString();
          setDoctorName(phoneNumberAsString);
        } catch (error) {
          setError('Error fetching doctor details');
        }
      };

      fetchDoctorName();
    }
  }, []);

  return (
    <div className='outer2'>
    <div className="incomingCallContainer">
      <h4>Incoming Call</h4><hr />
      {error && <p>{error}</p>}
      <br />
      {incomingCall && (
        <div className="incomingCallCard">
          <p className="incomingCallText">Incoming Call from</p>
          {patientId && (
            <div>
              <p className="patientIdLabel">Patient ID:</p>
              <p className="patientId">{patientId}</p>
              <p className="patientIdLabel">Patient Name:</p>
              <p className='patientId'>{patientName}</p>
            </div>
          )}
          <div className="buttonContainer">
            <button className="acceptButton" onClick={() => handleAccept(patientName, doctorName)}>Accept</button>
            <button className="rejectButton" onClick={handleReject}>Reject</button>
          </div>
          <div className="scheduleForm">
            <input
              type="date"
              value={callDate}
              onChange={(e) => setCallDate(e.target.value)}
              placeholder="Call Date"
            />
            <input
              type="time"
              value={callTime}
              onChange={(e) => setCallTime(e.target.value)}
              placeholder="Call Time"
            />
            <button className="scheduleButton" onClick={handleScheduleCall}>Schedule Call</button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default IncomingCall;
