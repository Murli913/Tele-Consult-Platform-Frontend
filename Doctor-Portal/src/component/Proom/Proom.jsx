import React, { useEffect, useCallback, useState ,useRef} from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../Webrtc/SocketProvider";
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
import { callStates } from '../store/actions/callActions';
import { MdBattery5Bar } from "react-icons/md";
import { MdPhoneMissed } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaRecordVinyl } from "react-icons/fa";
import { connect } from 'react-redux';
import DashboardInformation from '../Dashboardinformation/Dashboardinformation';
import GroupCall from '../GroupCall/GroupCall';
import Peer from 'peerjs'; // Import PeerJS library
import PGroupCall from "../PGroupCall/PGroupCall";
import { connectWithWebSocket } from '../utils/wssConnection/wssConnection';

const PRoomPage = (props) => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [patientName,setPatientName] = useState('');
  const [gender, setGender] = useState('');
  const [patientId, setPatientId] = useState('');
  const [prescription, setPrescription] = useState('');
  const [callDate, setCallDate] = useState('');
  const [callTime, setCallTime] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(null);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [recording, setRecording] = useState(null); 
  const [isrd, setrd] = useState(false);
  const [callHistory, setCallHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prescription1, setPrescription1] = useState("");
  const [endcall, setendcall] = useState(false);
  const [inputelapsed, setinputelapsed] = useState(60);
  const [inputtimer, setinputTimer] = useState(60);
  const authtoken = localStorage.getItem('token');

  const {
    localStream,
    remoteStream,
    callState,
    callerUsername,
    callingDialogVisible,
    callRejected,
    hideCallRejectedDialog,
    setDirectCallMessage,
    message,
    username
  } = props;

  const mediaRecorderRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    let interval;
    if (endcall) {
      interval = setInterval(() => {
        setinputelapsed((prevTimer) => prevTimer - 1);
      }, 1000);
      setinputTimer(interval);
      if (inputelapsed === 0) {
        navigate('/home'); // Navigate back to the home screen after 15 minutes
      }
    }
    return () => clearInterval(interval);
  }, [inputelapsed, endcall]);

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

//   const toggleAudioStream = () => {
//     if (myStream) {
//         myStream.getTracks().forEach((track) => {
//             if (track.kind === "audio") {
//                 track.enabled = !track.enabled;
//             }
//         });
//         setIsAudioOn(!isAudioOn);
//     }
// };

// Register event handler for "navigate:home" outside of the handleEndCall function
// socket.on("navigate:home", () => {
//   if (myStream) {
//     myStream.getTracks().forEach(track => {
//       track.stop();
//     });
//     setMyStream(null);
//   }

//   // Clear the remote stream
//   setRemoteStream(null);

//   // Clear the timer
//   clearInterval(timer);
//   setTimer(null);

//   navigate("/patient"); // Adjust path as per your routing setup
// });
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
        axios.put(`http://localhost:8080/doctor/${doctorId}/rejectcall`)
      }, 2000); // Delay of 2000 milliseconds (2 seconds)
    })
    .catch(error => {
      console.error("Error updating end time:", error);
    });
  socket.emit("call:ended", { to: remoteSocketId });
};

const handleScheduleConsent = async() => {
  try{
    await axios.put(`http://localhost:8080/callhistory/scheduleconsent?callId=${cid}`);
  } catch {
    console.log("Soory couldnt update");
  }
}

const handleRecordingConsent = async() => {
  try{
    await axios.put(`http://localhost:8080/callhistory/changerecordconsent?cid=${cid}`);
  } catch {
    console.log("Soory couldnt update");
  }
}


  // const handleCallUser = useCallback(async () => {
  //   const stream = await navigator.mediaDevices.getUserMedia({
  //     audio: true,
  //     video: false,
  //   });
  //   const offer = await peer.getOffer();
  //   socket.emit("user:call", { to: remoteSocketId, offer });
  //   setMyStream(stream);
  // }, [remoteSocketId, socket]);

  // const handleIncommingCall = useCallback(
  //   async ({ from, offer }) => {
  //     setRemoteSocketId(from);
  //     const stream = await navigator.mediaDevices.getUserMedia({
  //       audio: true,
  //       video: false,
  //     });
  //     setMyStream(stream);
  //     console.log(`Incoming Call`, from, offer);
  //     const ans = await peer.getAnswer(offer);
  //     socket.emit("call:accepted", { to: from, ans });
  //   },
  //   [socket]
  // );

  // const sendStreams = useCallback(() => {
  //   for (const track of myStream.getTracks()) {
  //     peer.peer.addTrack(track, myStream);
  //   }
  // }, [myStream]);

  // const handleCallAccepted = useCallback(
  //   ({ from, ans }) => {
  //     peer.setLocalDescription(ans);
  //     console.log("Call Accepted!");
      
  //     sendStreams();
  //   },
  //   [sendStreams]
  // );

  // const handleNegoNeeded = useCallback(async () => {
  //   const offer = await peer.getOffer();
  //   socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  // }, [remoteSocketId, socket]);

  // useEffect(() => {
  //   peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
  //   return () => {
  //     peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
  //   };
  // }, [handleNegoNeeded]);

  // const handleNegoNeedIncomming = useCallback(
  //   async ({ from, offer }) => {
  //     const ans = await peer.getAnswer(offer);
  //     socket.emit("peer:nego:done", { to: from, ans });
  //   },
  //   [socket]
  // );

  // const handleNegoNeedFinal = useCallback(async ({ ans }) => {
  //   await peer.setLocalDescription(ans);
  // }, []);

  // useEffect(() => {
  //   peer.peer.addEventListener("track", async (ev) => {
  //     const remoteStream = ev.streams;
  //     console.log("GOT TRACKS!!");
  //     setRemoteStream(remoteStream[0]);
  //   });
  // }, []);

  // useEffect(() => {
  //   socket.on("user:joined", handleUserJoined);
  //   socket.on("incomming:call", handleIncommingCall);
  //   socket.on("call:accepted", handleCallAccepted);
  //   socket.on("peer:nego:needed", handleNegoNeedIncomming);
  //   socket.on("peer:nego:final", handleNegoNeedFinal);

  //   return () => {
  //     socket.off("user:joined", handleUserJoined);
  //     socket.off("incomming:call", handleIncommingCall);
  //     socket.off("call:accepted", handleCallAccepted);
  //     socket.off("peer:nego:needed", handleNegoNeedIncomming);
  //     socket.off("peer:nego:final", handleNegoNeedFinal);
  //   };
  // }, [
  //   socket,
  //   handleUserJoined,
  //   handleIncommingCall,
  //   handleCallAccepted,
  //   handleNegoNeedIncomming,
  //   handleNegoNeedFinal,
  // ]);

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
      <div className="pcalloptions">
          <PGroupCall />
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
                <button onClick={handleScheduleConsent}>0<sub><IoBatteryChargingOutline /></sub></button>
            </div>
            <div className="rthirdcolumn">
                <button>3<sub>DEF</sub></button>
                <button>6<sub>MNO</sub></button>
                <button onClick={handleRecordingConsent}>9<sub>WXYZ</sub></button>
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