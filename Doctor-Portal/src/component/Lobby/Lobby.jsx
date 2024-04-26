import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSocket } from "../../Webrtc/SocketProvider";
import "./Lobbystyle.css";

const LobbyScreen = () => {
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
      navigate(`/d/room/${room}`);
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
    <div className="outer3">
    <div className="LobbyCnt">
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
        <button>Join</button>
      </form>
    </div>
    </div>
  );
};

export default LobbyScreen;
