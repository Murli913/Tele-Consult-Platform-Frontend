import React, { useEffect, useCallback, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from 'axios';
// import peer from "../../Webrtc/peer";
import { IconButton } from "@mui/material";
// import { useSocket } from "../../Webrtc/SocketProvider";
import "./Roompage.css";
import { BsRecordCircle } from "react-icons/bs";
import { FaRegStopCircle } from "react-icons/fa";
import { IoMdMic } from "react-icons/io";
import { IoMdMicOff } from "react-icons/io";
import { MdDownloading } from "react-icons/md";
import { ImPhoneHangUp } from "react-icons/im";
import { RxAvatar } from "react-icons/rx";
import { IoSend } from "react-icons/io5";
import Modal from 'react-modal';
import { IoIosCloseCircle } from "react-icons/io";
import { connect } from 'react-redux';
import DashboardInformation from '../Dashboardinformation/Dashboardinformation';
import { callStates } from '../store/actions/callActions';
import GroupCall from '../GroupCall/GroupCall';
import { connectWithWebSocket } from '../utils/wssConnection/wssConnection';
import Peer from 'peerjs'; // Import PeerJS library
import DisplayRating from '../rating/rating';
// import "./proom.css";
Modal.setAppElement('#root');

const PRoomPage = (props) => {
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

  const location = useLocation();

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

  // const handleUserJoined = useCallback(({ email, id }) => {
  //   console.log(`Email ${email} joined room`);
  //   setRemoteSocketId(id);
  // }, []);

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

//   const sendStreams = useCallback(() => {
//     for (const track of myStream.getTracks()) {
//       peer.peer.addTrack(track, myStream);
//     }
//   }, [myStream]);

//   const handleCallAccepted = useCallback(
//     ({ from, ans }) => {
//       peer.setLocalDescription(ans);
//       console.log("Call Accepted!");
      
//       sendStreams();
//     },
//     [sendStreams]
//   );

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
//   setendcall(true);
//   // navigate("/home"); 
// });
const cid = localStorage.getItem('CallId');

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

  axios.put(`http://localhost:8080/callhistory/${cid}/updateendtime/${endtime}`,null,{withCredentials : true})
    .then(() => {
      // Set a delay of 2 seconds before making the next API call
      axios.put(`http://localhost:8080/callhistory/${patientId}/rjctcall`,null,{withCredentials : true})
      setTimeout(() => {
        const doctorId = localStorage.getItem('loggedInDoctorId');
        axios.put(`http://localhost:8080/callhistory/${doctorId}/reject-call`,null,{withCredentials : true});
      }, 2000); // Delay of 2000 milliseconds (2 seconds)
    })
    .catch(error => {
      console.error("Error updating end time:", error);
    });
  socket.emit("call:ended", { to: remoteSocketId });
};



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
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make an API call to fetch patient ID
        const response = await axios.get(`http://localhost:8080/callhistory/${cid}/patientId`,null,{withCredentials : true});
        // Extract patient ID from the response data
        const fetchedPatientId = response.data;
        // Set the fetched patient ID to the state
        setPatientId(fetchedPatientId);
        
      } catch (error) {
        console.error("Error fetching patient ID:", error);
      }
  
      try {
        if(patientId){
        const response = await axios.get(`http://localhost:8080/doctor/pt/${patientId}`, null,{
          // headers: {
          //   'Authorization': `Bearer ${authtoken}`
          // }
          withCredentials : true
        });
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
      await axios.put(`http://localhost:8080/callhistory/${cid}/update-prescription/${prescription}`,null,{withCredentials : true})
      await axios.put(`http://localhost:8080/callhistory/${patientId}`, requestBody, {withCredentials : true});
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
      await axios.post('http://localhost:8080/callhistory/schedule', payload, {withCredentials : true});
      // Optionally, you can reset the form fields or perform any other necessary actions
    } catch (error) {
      setError('Error scheduling call');
    }
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
    if (MediaRecorder.isTypeSupported('audio/webm') && myStream && remoteStream) {
      const combinedStream = new MediaStream([...myStream.getAudioTracks(), ...remoteStream.getAudioTracks()]);
      const mediaRecorder = new MediaRecorder(combinedStream, { mimeType: 'audio/webm' });

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

    const fetchCallHistory = async () => {
      try {
        const doctorId = localStorage.getItem('loggedInDoctorId');
        const ptid = patientId;
        console.log(doctorId);
        console.log(ptid);
        if (doctorId && ptid) { // Check if both doctor ID and patient ID are provided
          // Make API request to fetch call history based on did and pid
          const response = await axios.get(`http://localhost:8080/callhistory/fetchcalls`, {
            params: {
              did: doctorId,
              pid: ptid
            },
            withCredentials : true});
          console.log(response.data);
          setCallHistory(response.data);
        }
      } catch (error) {
        console.error("Error fetching call history:", error);
      }
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    const openModal = (prescriptionData) => {
      setPrescription1(prescriptionData);
      setIsModalOpen(true);
    };
  

  return (
    // <div className="douter">
    <div className="cont">
      {/* <div className='player-container'> */}
          <GroupCall />
      {/* </div> */}
      <div className="side-area">
        <div className="doc-details">
          <h3>Doctor Details</h3>
          <p><b>Name: </b>Dr. Arjun Reddy</p>
          <p><b>Email: </b>Arjun@gmail.com</p>
          <p><b>Phone Number: </b>9876543556</p>
          <p><b>Appointment Count: </b>12</p>
          <p><b>Rating: </b><DisplayRating rating={4.5} /></p>
        </div>
        <div className="pnotes">
          <h3>Notes</h3>
          <input type="text" name="pnotes" id="" className="pat-notes"/>
        </div>
      </div>
    </div>
  // </div>
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
const mapStateToProps = ({ call, dashboard }) => ({
  ...call,
  ...dashboard
});

export default connect(mapStateToProps)(PRoomPage);
