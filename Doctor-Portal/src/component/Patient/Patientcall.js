import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../Webrtc/SocketProvider";
import axios from 'axios';
import "./Patientstyle.css";
import { MdHome } from "react-icons/md";
import { MdCallEnd } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import { IoIosCall } from "react-icons/io";
import { CiLock } from "react-icons/ci";
import { IoBatteryChargingOutline } from "react-icons/io5";
import { PiVibrate } from "react-icons/pi";
import { FaAsterisk } from "react-icons/fa";
import { RiDualSim1Line } from "react-icons/ri";
import { RiDualSim2Line } from "react-icons/ri";
import { FaSignal } from "react-icons/fa";
import { MdBattery5Bar } from "react-icons/md";
import { MdPhoneMissed } from "react-icons/md";

const Patientcall = () => {
  const [email, setEmail] = useState("");
  // const [room, setRoom] = useState("18002347");
  const [newroom, setNewroom] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [patientId,setPatientId] = useState();
  const [doctorId,setdoctorId] = useState();
  const [pincome, setpincome] = useState([]);
  const [doctorName, setDoctorName] = useState("");
  const [patientName, setPatientName] = useState("");
  const socket = useSocket();
  const navigate = useNavigate();
  const authtoken = localStorage.getItem('token');

const fetchPatientInfo = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/doctor?phoneNumber=${email}`, {
          headers: {
            'Authorization': `Bearer ${authtoken}`
          }
        });
    console.log(response.data);
    setPatientId(response.data.id);
    setpincome(response.data);
    setDoctorName(response.data.pincomingcall);
    setPatientName(response.data.name)
  } catch (error) {
    console.error('Error fetching patient information:', error);
    // Handle error (e.g., show error message)
  }
};

const handleAccept = async (patientName, doctorName) => {
    try {
      const nptid = parseInt(patientId);
      const startIndex = pincome.pincomingcall.indexOf("18002347");
      const extractedValue = pincome.pincomingcall.substring(startIndex + "18002347".length);
      setdoctorId(extractedValue);
      const ndocid = parseInt(extractedValue);
      console.log(ndocid);
      console.log(nptid);
      console.log(typeof(ndocid));
      console.log(typeof(nptid));
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
      navigate('/patient/pcall', { state: { patientEmail, doctorName} }); // Pass the added entry ID to the call page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pouter">
    <div className="featurephn">
    <div className="PatientCnt">
      <div className="fnavbar">
        <div className="simcards">
          <RiDualSim1Line />
          <RiDualSim2Line />
          <MdPhoneMissed />
        </div>
        <div className="battery">
          <FaSignal />
          <MdBattery5Bar />
        </div>
      </div>
      <form>
        <label htmlFor="email">Phone Number</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
      </form>
      <div className="incomingstatus">
        <div>
          <button onClick={fetchPatientInfo}>My calls</button>
          <p className="patientIdLabel1">{pincome.pincomingcall}</p>
          <div className="callbuttons">
            <button onClick={() => handleAccept(patientName, doctorName)}>Accept</button>
            <button>Reject</button>
          </div>
        </div>
      </div>
    </div>
    <div className="numpad">
      <div className="mainpad">
            <div className="acceptside">
              <button><SlOptions /></button>
              <button className="acpt"><IoIosCall /></button>
            </div>
            <div className="okside">
              <button><MdHome /></button>
            </div>
            <div className="rejectside">
              <button><SlOptions /></button>
              <button className="rejt"><MdCallEnd /></button>
            </div>
      </div>
      <div className="dialpad">
        <div className="firstcolumn"> 
            <button>1<sub>#/?</sub></button>
            <button>4<sub>GHI</sub></button>
            <button>7<sub>PQRS</sub></button>
            <button><FaAsterisk /><sub><CiLock /></sub></button>
        </div>
        <div className="secondcolumn">
            <button>2<sub>ABC</sub></button>
            <button>5<sub>JKL</sub></button>
            <button>8<sub>TUV</sub></button>
            <button>0<sub><IoBatteryChargingOutline /></sub></button>
        </div>
        <div className="thirdcolumn">
            <button>3<sub>DEF</sub></button>
            <button>6<sub>MNO</sub></button>
            <button>9<sub>WXYZ</sub></button>
            <button>#<sub><PiVibrate /></sub></button>
        </div> 
      </div>
    </div>
    </div>
    </div>
  );
};

export default Patientcall;
