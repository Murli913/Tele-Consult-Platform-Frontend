import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSocket } from "../../Webrtc/SocketProvider";
import "./Patientstyle.css";
import RoomInput from '../Lobby/components/RoomInput';
import UsernameInput from '../Lobby/components/Usernameinput';
import SubmitButton from '../Lobby/components/SubmitButton';
import { connectWithWebSocket } from '../utils/wssConnection/wssConnection';

import { registerNewUser, checkRoomId }  from '../utils/wssConnection/wssConnection';
import { setUsername } from '../store/actions/dashboardActions';

import * as webRtcHandler from '../utils/webRTC/webRTCHandler';
import * as webRTCGroupHandler from '../utils/webRTC/webRTCGroupCallHandler';
import Peer from 'peerjs';
import { connect } from 'react-redux';
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

const Patientredirected = ({ saveUsername }) => {
  const [email, setEmail] = useState(""); 
  const docid = localStorage.getItem('loggedInDoctorId');
  let room = "18002347";// Initial value set to an empty string
  const socket = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // Set email and room state from location state when component mounts
    const docid = localStorage.getItem('loggedInDoctorId');
    if (location.state && location.state.patientEmail && location.state.doctorName) {
      setEmail(location.state.patientEmail);
      setRoomId(location.state.doctorName);
      console.log(typeof(room));
      console.log({email});
      // Optionally set room state based on your requirements
    }
  }, [location.state]);

  useEffect(() => {
    // Initialize Peer
    const myPeer = new Peer();

    // Get local stream and connect with peer
    webRtcHandler.getLocalStream();
    webRTCGroupHandler.connectWithMyPeer(myPeer); // pass myPeer to your connection handler
  }, []);


  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState("");


  const handleSubmitButtonPressed = () => {
    registerNewUser(username);
    saveUsername(username);
    checkRoomId(roomId);
    navigate(`/p/room/${roomId}`);
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
      <UsernameInput username={username} setUsername={setUsername} />
        <input
        placeholder="Enter RoomId"
        type="text"
        value={roomId}
        // onChange={(event) => {
        //   setRoomId(event.target.value);
        // }}
        />
        <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} />
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
{/* <UsernameInput username={username} setUsername={setUsername} />
        <input
        placeholder="Enter RoomId"
        type="text"
        value={roomId}
        // onChange={(event) => {
        //   setRoomId(event.target.value);
        // }}
        />
        <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} /> */}
const mapActionsToProps = (dispatch) => {
  return {
    saveUsername: username => dispatch(setUsername(username))
  };
};

export default connect(null, mapActionsToProps)(Patientredirected);

// export default LobbyScreen;
