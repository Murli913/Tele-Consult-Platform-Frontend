import React, { useEffect, useCallback, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from 'axios';
import peer from "../service/peer";
import { IconButton } from "@mui/material";
import { useSocket } from "../context/SocketProvider";
import "./Roompage.css";

const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [patientName,setPatientName] = useState('');
  const [gender, setGender] = useState('');
  const [remoteStream, setRemoteStream] = useState();
  const [patientId, setPatientId] = useState('');
  const [prescription, setPrescription] = useState('');
  const [callDate, setCallDate] = useState('');
  const [callTime, setCallTime] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(null);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (remoteSocketId) {
      const interval = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1); // Increment elapsed time every second
      }, 1000);
      setTimer(interval);

      // Clean up the interval when component unmounts or remoteSocketId changes
      return () => clearInterval(interval);
    }
  }, [remoteSocketId]);

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      
      sendStreams();
    },
    [sendStreams]
  );

  const toggleAudioStream = () => {
    if (myStream) {
        myStream.getTracks().forEach((track) => {
            if (track.kind === "audio") {
                track.enabled = !track.enabled;
            }
        });
        setIsAudioOn(!isAudioOn);
    }
};

// Register event handler for "navigate:home" outside of the handleEndCall function
socket.on("navigate:home", () => {
  if (myStream) {
    myStream.getTracks().forEach(track => {
      track.stop();
    });
    setMyStream(null);
  }

  // Clear the remote stream
  setRemoteStream(null);

  // Clear the timer
  clearInterval(timer);
  setTimer(null);

  navigate("/home"); // Adjust path as per your routing setup
});

const handleEndCall = () => {
  // Emit end call event to the server
  socket.emit("call:ended", { to: remoteSocketId });
};



  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);
  const cid = localStorage.getItem('CallId');
  console.log(cid);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make an API call to fetch patient ID
        const response = await axios.get(`http://localhost:8080/callhistory/${cid}/patientId`);
        // Extract patient ID from the response data
        const fetchedPatientId = response.data;
        // Set the fetched patient ID to the state
        setPatientId(fetchedPatientId);
        
      } catch (error) {
        console.error("Error fetching patient ID:", error);
      }
  
      try {
        if(patientId){
        const response = await axios.get(`http://localhost:8080/patient/${patientId}`);
        const pname = response.data.name;
        const pgender = response.data.gender;
        setGender(pgender);
        setPatientName(pname);
        }
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };
  
    fetchData(); // Call the async function immediately
  }, [cid, patientId]); // Include dependencies in the dependency array
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        name: patientName,
        gender: gender
    };
      await axios.put(`http://localhost:8080/callhistory/${cid}/update-prescription/${prescription}`)
      await axios.put(`http://localhost:8080/patient/${patientId}`, requestBody)
      console.log("Prescription added successfully!");
    } catch (error) {
      console.error("Error adding prescription:", error);
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

  return (
    <div className="RoomCnt">
      
      <div className="player-container">
      <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
      {myStream && <p>Timer: {formatTime(elapsedTime)}</p>}
      {myStream && <IconButton onClick={sendStreams}>SS</IconButton>}
      {myStream && <IconButton onClick={toggleAudioStream}>{isAudioOn ?  <i class="fa-solid fa-microphone-slash"></i> : <i class="fa-solid fa-microphone"></i>}</IconButton>}
      {remoteSocketId && !myStream && <button onClick={handleCallUser}>Call</button>}
      {remoteSocketId && myStream && <button onClick={handleEndCall}>End Call</button>}
      {myStream && (
        < >
          <ReactPlayer
            playing
            height="100px"
            width="200px"
            url={myStream}
          />
        </>
      )}
      {remoteStream && (
        <>
          <ReactPlayer
            playing
            height="100px"
            width="200px"
            url={remoteStream}
          />
        </>
      )}
      </div>
      <div className="Input">
      {remoteSocketId && (
      <form onSubmit={handleSubmit}>
        <label>
          <p>Patient Name:</p>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
        </label>
        <label>
          <p>Patient ID:</p>
          <input
            type="text"
            value={patientId}
            readOnly={true}
            
          />
        </label>
        <label>
        <p>Gender:</p>
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </label>
        <label>
        <p>Prescription:</p>
          <textarea
            style={{ width: '500px', resize: 'vertical' }}
            type="text"
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
        
      </form>
      )}
      {remoteSocketId && (
        <div className="schcall">
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
      )}
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

export default RoomPage;

