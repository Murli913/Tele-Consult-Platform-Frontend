import React, { useEffect, useCallback, useState, useRef } from 'react';
import ConversationButtons from '../ConversationButtons/ConversationButtons';
import * as webRTCGroupCallHandler from '../utils/webRTC/webRTCGroupCallHandler';
import './GroupCallRoom.css';
import GroupCallVideo from './GroupCallVideo';
import GroupCallButton from '../GroupCallButton/GroupCallButton';
import { IconButton } from "@mui/material";
import { IoMdMic } from "react-icons/io";
import { IoMdMicOff } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { MdDownloading } from "react-icons/md";
import { BsRecordCircle } from "react-icons/bs";
import { FaRegStopCircle } from "react-icons/fa";
import { ImPhoneHangUp } from "react-icons/im";
import axios from 'axios';

const GroupCallRoom = (props) => {
  const { localStream, groupCallStreams, groupCallActive } = props;
  const [recording, setRecording] = useState(null); 
  const [isrd, setrd] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [inputelapsed, setinputelapsed] = useState(60);
  const [timer, setTimer] = useState(null);
  const [inputtimer, setinputTimer] = useState(60);
  const [patientId, setPatientId] = useState('');
  const [endcall, setendcall] = useState(false);
  const leaveRoom = () => {
    webRTCGroupCallHandler.leaveGroupCall();
  };
  useEffect(() => {
    if (localStream) {
      const interval = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1); // Increment elapsed time every second
      }, 1000);
      setTimer(interval);

      // Clean up the interval when component unmounts or remoteSocketId changes
      return () => clearInterval(interval);
    }
  }, [localStream]);

const handleEndCall = () => {
  // Emit end call event to the server
  const now = new Date();
  const cid = localStorage.getItem('CallId');
  console.log(cid);
  const endtime = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(now);

  axios.put(`http://localhost:8080/callhistory/${cid}/updateendtime/${endtime}`)
    .then(() => {
      setTimeout(() => {
        const doctorId = localStorage.getItem('loggedInDoctorId');
        axios.put(`http://localhost:8080/callhistory/${doctorId}/reject-call`);
      }, 2000); // Delay of 2000 milliseconds (2 seconds)
      clearInterval(timer);
      setTimer(null);
      setendcall(true);
    })
    .catch(error => {
      console.error("Error updating end time:", error);
    });
};

const toggleRecording = () => {
    if (!isrd) {
      handleStartRecording();
    } else {
      handleStopRecording();
    }
};

  const handleStartRecording = () => {
    // Check if MediaRecorder is available and myStream is set
    setrd(true);
    if (MediaRecorder.isTypeSupported('video/webm')) {
    //   const combinedStream = new MediaStream([...myStream.getAudioTracks(), ...remoteStream.getAudioTracks()]);
      const mediaRecorder = new MediaRecorder(localStream, { mimeType: 'video/webm' });

      // Event handler for when data is available
      mediaRecorder.ondataavailable = (event) => {
        setRecording(event.data);
      };

      // Start recording
      mediaRecorder.start();

      // Save MediaRecorder instance to reference
      mediaRecorderRef.current = mediaRecorder;
    } else {
      console.error('MediaRecorder is not supported or myStream is not set');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setrd(false);
  };

  const handleDownloadRecording = () => {
    if (recording) {
      const blob = new Blob([recording], { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'recording.webm';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };
  return (
    <div className='player-container'>
      <div className="avatar">
        <RxAvatar />
        <div className="duration1">
        {<p style={{color:"var(--body_color)", fontSize:"18px"}}>{formatTime(elapsedTime)}</p>}
        </div>
      </div>
      <div className='group_call_videos_container'>
        {
          groupCallStreams.map(stream => {
            return <GroupCallVideo key={stream.id} stream={stream} />;
          })
        }
      </div>
      <div className="bottom-player">
        <ConversationButtons {...props} groupCall />
        <div className="trio1">
        {<button  className='str' color="black"  aria-label="record" onClick={toggleRecording}>
                              {isrd ? <FaRegStopCircle /> : <BsRecordCircle />}
                          </button>}
        {groupCallActive && <GroupCallButton onClickHandler={leaveRoom}/>}
        {<button  className='str' onClick={handleDownloadRecording}><MdDownloading /></button>}
        </div>
      </div>
    </div>
  );
};
const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export default GroupCallRoom;
