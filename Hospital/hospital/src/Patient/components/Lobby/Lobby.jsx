import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { useSocket } from "../../Webrtc/SocketProvider";
import "./Lobbystyle.css";
import RoomInput from './pcomponents/RoomInput';
import UsernameInput from './pcomponents/Usernameinput';
import SubmitButton from './pcomponents/SubmitButton';
import { connectWithWebSocket } from '../utils/wssConnection/wssConnection';

import { registerNewUser, checkRoomId }  from '../utils/wssConnection/wssConnection';
import { setUsername } from '../store/actions/dashboardActions';

import * as webRtcHandler from '../utils/webRTC/webRTCHandler';
import * as webRTCGroupHandler from '../utils/webRTC/webRTCGroupCallHandler';
import Peer from 'peerjs';
import { connect } from 'react-redux';

const PLobbyScreen = ({ saveUsername }) => {
  const [email, setEmail] = useState(""); 
  const [roomId, setRoomId] = useState('');// Initial value set to an empty string
   // Initial value set to an empty string

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    connectWithWebSocket();
  }, []);

  useEffect(() => {
    const docid = localStorage.getItem('loggedInDoctorId');
    if (location.state && location.state.pemail && location.state.room) {
      setEmail(location.state.pemail);
      setRoomId(location.state.room);
    }
  }, [location.state]);

  useEffect(() => {
    const myPeer = new Peer();
    webRtcHandler.getLocalStream();
    webRTCGroupHandler.connectWithMyPeer(myPeer);
  }, []);


  const [username, setUsername] = useState('');


  const handleSubmitButtonPressed = () => {
    registerNewUser(username);
    saveUsername(username);
    checkRoomId(roomId);
    navigate(`/bp/room/${roomId}`);
  };

  return (
    <div className='login-page_container background_main_color'>
      <div className='LobbyCnt'>
        <UsernameInput username={username} setUsername={setUsername} />
        <input
        placeholder="Enter RoomId"
        type="text"
        value={roomId}
        />
        <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} />
      </div>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    saveUsername: username => dispatch(setUsername(username))
  };
};

export default connect(null, mapActionsToProps)(PLobbyScreen);
