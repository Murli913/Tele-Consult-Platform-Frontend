import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSocket } from "../../Webrtc/SocketProvider";
import "./Lobby.css";
import axios from "axios";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // Set email and room state from location state when component mounts
    // const docid = localStorage.getItem('loggedInDoctorId');
    if (location.state && location.state.patientEmail && location.state.doctorName) {
      setEmail(location.state.patientEmail);
      let nr = "18002347"+location.state.doctorName;
      console.log(nr);
      setRoom(nr);
      console.log({email});
      console.log(location.state.doctorName);
    }
  }, [location.state]);

  console.log(email);

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
      console.log(room);
      // let did = location.state.doctorName;
      console.log(typeof(did));
      let pemail = localStorage.getItem('email');
      // console.log(typeof(did));
      //   axios.put(`http://localhost:8080/callhistory/put-doc/${did}?pemail=${pemail}`)
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      console.log(data);
      const { email, room } = data;
      navigate(`/bp/room/${room}`);
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
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <button>Join</button>
      </form>
    </div>
    </div>
  );
};

export default LobbyScreen;
