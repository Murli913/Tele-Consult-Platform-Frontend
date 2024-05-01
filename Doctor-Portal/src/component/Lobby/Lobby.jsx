import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSocket } from "../../Webrtc/SocketProvider";
import "./Lobbystyle.css";
import RoomInput from './components/RoomInput';
import UsernameInput from './components/Usernameinput';
import SubmitButton from './components/SubmitButton';
import { connectWithWebSocket } from '../utils/wssConnection/wssConnection';

import { registerNewUser, checkRoomId }  from '../utils/wssConnection/wssConnection';
import { setUsername } from '../store/actions/dashboardActions';

import * as webRtcHandler from '../utils/webRTC/webRTCHandler';
import * as webRTCGroupHandler from '../utils/webRTC/webRTCGroupCallHandler';
import Peer from 'peerjs';
import { connect } from 'react-redux';

const LobbyScreen = ({ saveUsername }) => {
  const [email, setEmail] = useState(""); 
  const docid = localStorage.getItem('loggedInDoctorId');
  let room = "18002347"+docid;// Initial value set to an empty string
   // Initial value set to an empty string

  const socket = useSocket();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Set email and room state from location state when component mounts
    const docid = localStorage.getItem('loggedInDoctorId');
    if (location.state && location.state.patientEmail && location.state.doctorName) {
      setEmail(location.state.patientEmail);
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
  const [roomId, setRoomId] = useState(room);


  const handleSubmitButtonPressed = () => {
    registerNewUser(username);
    saveUsername(username);
    checkRoomId(roomId);
    navigate(`/d/room/${roomId}`);
  };

  return (
    <div className='login-page_container background_main_color'>
      <div className='LobbyCnt'>
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
      <footer className="footer"> <small>&#9400; Copyright 2024, E-swathya</small> </footer>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    saveUsername: username => dispatch(setUsername(username))
  };
};

export default connect(null, mapActionsToProps)(LobbyScreen);

// export default LobbyScreen;
