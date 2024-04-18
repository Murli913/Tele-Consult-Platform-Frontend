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

const Patientscreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [doctors, setDoctors] = useState([]);
  const socket = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:8080/doctor/all');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleSubmitForm = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response = await axios.get(`http://localhost:8080/patient?phoneNumber=${email}`);
        if (response.data.length === 0) {
          // If patient with given phone number doesn't exist, create a new patient
          const newPatientResponse = await axios.post('http://localhost:8080/patient', { phoneNumber: email });
          console.log('New patient created:', newPatientResponse.data);
          // Assuming the response contains the newly created patient ID
          const newPatientId = newPatientResponse.data.id;
          await axios.post('http://localhost:8080/doctor/join-room', { patientPhoneNumber: email, doctorPhoneNumber: room });
          setEmail("Patient@gmail.com");
          // Now you can proceed with joining the room or any further actions
          
          socket.emit("room:join", { email: "Patient@gmail.com", room });
          
        } else {
          // If patient with given phone number exists, join the room
          const existingPatientId = response.data.name;
          await axios.post('http://localhost:8080/doctor/join-room', { patientPhoneNumber: email, doctorPhoneNumber: room });
          setEmail("Patient@gmail.com");// Assuming it returns an array with the first matching patient
          socket.emit("room:join", { email: existingPatientId + "@gmail.com", room });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    [email, room, socket, setEmail]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/p/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

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
        <label htmlFor="doctor">Select Doctor</label>
        <select id="doctor" value={room} onChange={(e) => setRoom(e.target.value)}>
          <option value="">Select Doctor</option>
          {doctors.map(doctor => (
            <option key={doctor.id} value={doctor.phoneNumber}>{doctor.name}</option>
          ))}
        </select>
        <br />
        {/* <button onClick={handleSubmitForm}>Join</button> */}
      </form>
    </div>
    <div className="numpad">
      <div className="mainpad">
            <div className="acceptside">
              <button><SlOptions /></button>
              <button className="acpt"><IoIosCall /></button>
            </div>
            <div className="okside">
              <button onClick={handleSubmitForm}><MdHome /></button>
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

export default Patientscreen;
