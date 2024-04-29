import React, { useEffect, useCallback, useState,useRef} from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import peer from "../../Webrtc/peer";
import { useSocket } from "../../Webrtc/SocketProvider";
import "./proom.css";
import axios from "axios";
import { BsRecordCircle } from "react-icons/bs";
import { FaRegStopCircle } from "react-icons/fa";
import { IoMdMic } from "react-icons/io";
import { IoMdMicOff } from "react-icons/io";
import { MdDownloading } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { IoSend } from "react-icons/io5";
import DisplayRating from '../rating/rating';
import { MdCallEnd } from "react-icons/md";
import { CallRating } from '../rating/callrating';

const PRoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [timer, setTimer] = useState(null);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [recording, setRecording] = useState(null); 
  const [isrd, setrd] = useState(false);
  const [endcall, setendcall] = useState(false);
  const mediaRecorderRef = useRef(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [storedRating, setStoredRating] = useState(0);

  const handleEndCallModal = () => {
    setShowModal(true);
  };

  const handleRatingChange = (newRating) => {
    setStoredRating(newRating);
  };

  const handleSubmitRating = () => {
    handleEndCall();
    console.log("Rating submitted:", storedRating);
    setShowModal(false);
  };


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

  navigate("/client"); // Adjust path as per your routing setup
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


  return (
    <div className="cont">
      <div className="player-container">
      <h3 className="wait-to-join">{remoteSocketId ? "" : "Please wait for doctor to join!"}</h3>
      <div className="avatar"><RxAvatar /></div>
      <div className="duration">
        {myStream && remoteSocketId && <p style={{'color':'var(--body_color)', 'font-size':'18px'}}>{formatTime(elapsedTime)}</p>}
      </div>
      {!endcall && (
        <div className="trio">
        {myStream && <button className="str" onClick={toggleAudioStream}>{isAudioOn ? <IoMdMic />  : <IoMdMicOff />}</button>}
        {myStream && <button className="str" color="primary" aria-label="record" onClick={toggleRecording}>
                              {isrd ? <FaRegStopCircle /> : <BsRecordCircle />}
                          </button>}
        {myStream && <button className="str" onClick={handleDownloadRecording}><MdDownloading /></button>}
        </div>
      )}
      {!endcall && remoteSocketId && !myStream && 
      <div className="joining">
        <h4 style={{'color':'var(--body_color)'}}>Please Join The Call!</h4>
        <button onClick={handleCallUser} className="join-call">Join Call</button>
      </div>
      }
      {!endcall && (
        <div className="duo">
          {remoteSocketId && myStream && <button className="endbtn" onClick={handleEndCallModal}><MdCallEnd /></button>}
          {myStream && <button className="sendbtn" onClick={sendStreams}><IoSend /></button>}
        </div>
      )}
      {endcall && <div className="callended">Call Ended</div>}
      {myStream && (
        < >
          <ReactPlayer
            playing
            height="0px"
            width="200px"
            url={myStream}
          />
        </>
      )}
      {remoteStream && (
        <>
          <ReactPlayer
            playing
            height="0px"
            width="200px"
            url={remoteStream}
          />
        </>
      )}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header" style={{'display':'flex', 'alignItems':'center','justify-content':'center'}}>
              <h2 className='doc-name'>Feedback</h2>
            </div>
            <div className="modal-body-up">
              <div className="modal-info-up submit-modal">
                <p>Please Give Your Valuable Rating!</p>
                <CallRating onRatingChange={handleRatingChange} />
                <button onClick={handleSubmitRating}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
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