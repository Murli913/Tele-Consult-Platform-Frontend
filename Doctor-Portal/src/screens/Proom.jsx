import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import peer from "../service/peer";
import { useSocket } from "../context/SocketProvider";
import { IconButton } from "@mui/material";
import "./Proomstyle.css";
import axios from "axios";
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
import { FaPhoneVolume } from "react-icons/fa6";
import { FaRecordVinyl } from "react-icons/fa";

const PRoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [timer, setTimer] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const navigate = useNavigate();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  useEffect(() => {
    if (remoteSocketId) {
      const interval = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1); // Increment elapsed time every second
      }, 1000);
      setTimer(interval);
      console.log(remoteSocketId);

      // Clean up the interval when component unmounts or remoteSocketId changes
      return () => clearInterval(interval);
    }
  }, [remoteSocketId]);

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

  navigate("/patient"); // Adjust path as per your routing setup
});
const cid = localStorage.getItem('CallId');
  console.log(cid);
const handleEndCall = () => {
  // Emit end call event to the server
  const now = new Date();
  const endtime = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(now);
  axios.put(`http://localhost:8080/callhistory/${cid}/updateendtime/${endtime}`)
    .then(() => {
      // Set a delay of 2 seconds before making the next API call
      setTimeout(() => {
        const doctorId = localStorage.getItem('loggedInDoctorId');
        axios.put(`http://localhost:8080/doctor/${doctorId}/reject-call`);
      }, 2000); // Delay of 2000 milliseconds (2 seconds)
    })
    .catch(error => {
      console.error("Error updating end time:", error);
    });
  socket.emit("call:ended", { to: remoteSocketId });
};


  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
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
        video: false,
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

  return (
    // <div className="Proomcnt">
    //   <h1>Room Page</h1>
    //   <h4>{remoteSocketId ? "Connected" : "Dialling...."}</h4>
    //   {remoteSocketId && myStream && <p style={{color:"white"}}>{formatTime(elapsedTime)}</p>}
    //   {myStream && <IconButton onClick={toggleAudioStream}>{isAudioOn ?  <i class="fa-solid fa-microphone-slash"></i> : <i class="fa-solid fa-microphone"></i>}</IconButton>}
    //   {remoteSocketId && !myStream && <button onClick={handleCallUser}>Call</button>}
    //   {remoteSocketId && myStream && <button onClick={handleEndCall}>End Call</button>}
    //   {myStream && (
    //     <>
    //       <h1>My Stream</h1>
    //       <ReactPlayer
    //         playing
    //         muted
    //         height="0px"
    //         width="0px"
    //         url={myStream}
    //       />
    //     </>
    //   )}
    //   {remoteStream && (
    //     <>
    //       <h1>Remote Stream</h1>
    //       <ReactPlayer
    //         playing
    //         muted
    //         height="0px"
    //         width="0px"
    //         url={remoteStream}
    //       />
    //     </>
    //   )}
    // </div>
    <div className="pouter">
        <div className="rfeaturephn">
        <div className="rPatientCnt">
          <div className="rfnavbar">
            <div className="rsimcards">
              <RiDualSim1Line />
              <RiDualSim2Line />
              <MdPhoneMissed />
            </div>
            <div className="rbattery">
              <FaSignal />
              <MdBattery5Bar />
            </div>
          </div>
          <div className="callstatus">
            <h4>{remoteSocketId ? "Connected" : "Dialling...."}</h4>
            <FaPhoneVolume />
          </div>
      <div className="timer">
        {remoteSocketId && myStream && <p style={{color:"white"}}>{formatTime(elapsedTime)}</p>}
      </div>
      <div className="calloptions">
        {myStream && <button onClick={toggleAudioStream}>{isAudioOn ?  <i class="fa-solid fa-microphone-slash"></i> : <i class="fa-solid fa-microphone"></i>}</button>}
        {myStream && <button><FaRecordVinyl /></button>}
        {remoteSocketId && myStream && <button onClick={handleEndCall}>End</button>}
        {remoteSocketId && !myStream && <button onClick={handleCallUser}>Call</button>}
      </div>
        </div>
        <div className="rnumpad">
          <div className="rmainpad">
                <div className="racceptside">
                  <button><SlOptions /></button>
                  <button className="racpt"><IoIosCall /></button>
                </div>
                <div className="rokside">
                  <button><MdHome /></button>
                </div>
                <div className="rrejectside">
                  <button><SlOptions /></button>
                  <button className="rrejt"><MdCallEnd /></button>
                </div>
          </div>
          <div className="rdialpad">
            <div className="rfirstcolumn"> 
                <button>1<sub>#/?</sub></button>
                <button>4<sub>GHI</sub></button>
                <button>7<sub>PQRS</sub></button>
                <button><FaAsterisk /><sub><CiLock /></sub></button>
            </div>
            <div className="rsecondcolumn">
                <button>2<sub>ABC</sub></button>
                <button>5<sub>JKL</sub></button>
                <button>8<sub>TUV</sub></button>
                <button>0<sub><IoBatteryChargingOutline /></sub></button>
            </div>
            <div className="rthirdcolumn">
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

const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export default PRoomPage;