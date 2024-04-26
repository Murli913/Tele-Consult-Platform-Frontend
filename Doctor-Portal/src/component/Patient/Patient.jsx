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
  // const [room, setRoom] = useState("18002347");
  const [newroom, setNewroom] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [pincome, setpincome] = useState([]);
  const socket = useSocket();
  const navigate = useNavigate();
  const authtoken = localStorage.getItem('token');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/doctor/alldoctors`, {
        headers: {
          'Authorization': `Bearer ${authtoken}`
        }
      });
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const checkAssignedDoctor = async (patientPhoneNumber) => {
    try {
        const response = await axios.get(`http://localhost:8080/callhistory/checkassigneddoctor?patientphonenumber=${patientPhoneNumber}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

const fetchPatientInfo = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/doctor?phoneNumber=${email}`, {
          headers: {
            'Authorization': `Bearer ${authtoken}`
          }
        });
    console.log(response.data);
    setpincome(response.data);
  } catch (error) {
    console.error('Error fetching patient information:', error);
    // Handle error (e.g., show error message)
  }
};

  const handleSubmitForm = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response0 = await axios.get(`http://localhost:8080/doctor?phoneNumber=${email}`, {
          headers: {
            'Authorization': `Bearer ${authtoken}`
          }
        });
        let room = "18002347";
        if (response0.data.length === 0) {
          // If patient with given phone number doesn't exist, create a new patient
          const newPatientResponse = await axios.post(`http://localhost:8080/callhistory/addpt`, {
            headers: {
              'Authorization': `Bearer ${authtoken}`
            }, 
            phoneNumber: email });
          console.log('New patient created:', newPatientResponse.data);
          // Assuming the response contains the newly created patient ID
          const newPatientId = newPatientResponse.data.id;
          const responce0 = await axios.post(`http://localhost:8080/callhistory/join-room`, {
            patientPhoneNumber: email, 
            doctorPhoneNumber: room
          },{
            headers: {
              'Authorization': `Bearer ${authtoken}`
            }
          });
          console.log(responce0.data);
          if(responce0.data === 0)
          {
            let assignedDoctor;
                    // Check assigned doctor repeatedly until it is not null
            while(true)
            {
              const responce1 = await axios.get(`http://localhost:8080/callhistory/checkassigneddoctor?patientphonenumber=${email}`);
              console.log(responce1);
              if(responce1.data !== '')
              {
                assignedDoctor = responce1.data;
                break;
              }
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
            
              // Now assignedDoctor contains the assigned doctor ID
            console.log('Assigned Doctor:', assignedDoctor);
            let nr = room+assignedDoctor;
            room = String(nr);
            console.log(room);
            setEmail("Patient@gmail.com");
            socket.emit("room:join", { email: "Patient@gmail.com", room });
          } else{
              let nr = responce0.data;
              console.log(nr);
              console.log(typeof(nr));
              room = String(nr);
              console.log(room);
              console.log(typeof(room))
              setEmail("Patient@gmail.com");
              socket.emit("room:join", { email: "Patient@gmail.com", room });
          }
          
        } else if(response0.data.length !== 0){
          // If patient with given phone number exists, join the room
          const existingPatientId = response0.data.name;
          
          
          const responde1 = await axios.post(`http://localhost:8080/callhistory/join-room`, {
            patientPhoneNumber: email, 
            doctorPhoneNumber: room
          },{
            headers: {
              'Authorization': `Bearer ${authtoken}`
            }
          });
          console.log(responde1.data);
          if(responde1.data === 0)
          {
            let assignedDoctor1;
                    // Check assigned doctor repeatedly until it is not null
            while(true)
            {
              const responde2 = await axios.get(`http://localhost:8080/callhistory/checkassigneddoctor?patientphonenumber=${email}`);
              console.log(responde2);
              if(responde2.data !== '')
              {
                assignedDoctor1 = responde2.data;
                break;
              }
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
            
              // Now assignedDoctor contains the assigned doctor ID
            console.log('Assigned Doctor:', assignedDoctor1);
            let nr1 = room+assignedDoctor1;
            room = String(nr1);
            console.log(room);
            setEmail(existingPatientId + "@gmail.com");
            socket.emit("room:join", { email: existingPatientId + "@gmail.com", room});
          } else{
              let nr1 = responde1.data;
              console.log(nr1);
              console.log(typeof(nr1));
              room = String(nr1);
              console.log(room);
              console.log(typeof(room))
              setEmail(existingPatientId + "@gmail.com");
              socket.emit("room:join", { email: existingPatientId + "@gmail.com", room});
            }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    [email, socket, setEmail]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      console.log(data);
      const { email, room } = data;
      console.log(room);
      navigate(`/p/room/${room}`);
    },
    [navigate]
  );

  const handleReject = async () => {
    try {
      // Send request to remove patient from the waiting queue
      await axios.get(`http://localhost:8080/callhistory/waitingqueue/removepatient?ptphonenumber=${email}`);
      console.log('Patient removed from waiting queue');
      window.location.reload();
    } catch (error) {
      console.error('Error removing patient from waiting queue:', error);
      // Handle error (e.g., show error message)
    }
  };

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
        <label htmlFor="room">HelpLine Number</label>
        <input
          type="text"
          id="room"
          readOnly="true"
          value={18002347}
          />
        <br />
        <br />
      </form>
      <div className="incomingstatus">
          <button onClick={handleReject}>Reject</button> 
      </div>
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
