import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSocket } from "../../Webrtc/SocketProvider";
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

const Patientlobby = () => {
  const [email, setEmail] = useState(""); 
  const docid = localStorage.getItem('loggedInDoctorId');
  const [room, setroom] = useState("");// Initial value set to an empty string
   // Initial value set to an empty string

  const socket = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // Set email and room state from location state when component mounts
    console.log(location.state.doctorName);
    if (location.state && location.state.patientEmail && location.state.doctorName) {
      setEmail(location.state.patientEmail);
    setroom(location.state.doctorName);
      console.log(typeof(room));
      console.log({email});
      // Optionally set room state based on your requirements
    }
  }, [location.state]);

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      console.log(data);
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
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email">Email ID</label>
        <input
          type="email"
          id="email"
          placeholder="Patient@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room">Room Number</label>
        <input
          type="text"
          id="room"
          value={room}
          // onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <br />
      </form>
      <div className="incomingstatus">
        {/* <div>
          <button onClick={fetchPatientInfo}>My calls</button>
          <p className="patientIdLabel1">{pincome.pincomingcall}</p>
          <div className="callbuttons">
            <button>Accept</button>
            <button>Reject</button>
          </div>
        </div> */}
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

export default Patientlobby;
