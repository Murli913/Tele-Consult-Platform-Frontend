import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import axios from 'axios';
import "./Patientstyle.css";

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
    <div className="PatientCnt">
      <form onSubmit={handleSubmitForm}>
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
        <button>Join</button>
      </form>
    </div>
  );
};

export default Patientscreen;
