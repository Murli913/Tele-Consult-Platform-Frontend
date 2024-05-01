import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import "./client.css";
import { IoMdCall } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import DisplayRating from '../rating/rating';
import { IoCloseCircle } from "react-icons/io5";
import PNavbar from '../navbar/Pnavbar';
import PSidebar from '../sidebar/Psidebar';

const Patientscreen = () => {
    const [doctors, setDoctors] = useState([]);
    const [apts, setApts] = useState([]);
    const navigate = useNavigate();
    const pemail = localStorage.getItem('email');
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [email, setEmail] = useState("");
    const [room, setRoom] = useState("");
    // const socket = useSocket();
    const location = useLocation();

    console.log(pemail);
    useEffect(() => {
        fetchOnlineDoctors();
    }, []);

    useEffect(() => {
        fetchPatAptToday();
    }, []);

    

    const openModal = (doctor) => {
        setSelectedDoctor(doctor);
    };

    const closeModal = () => {
        setSelectedDoctor(null);
    };

    useEffect(() => {
        // Set email and room state from location state when component mounts
        // const docid = localStorage.getItem('loggedInDoctorId');
        if (pemail && selectedDoctor) {
          setEmail(pemail);
          let nr = "18002347"+selectedDoctor.id;
          console.log(nr);
          setRoom(nr);
          console.log({pemail});
          console.log(selectedDoctor.id);
        }
      }, [selectedDoctor]);

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
        //   socket.emit("room:join", { email, room });
        navigate('/pcall', { state: { pemail, room } })
        },
        [email, room]
      );

    //   const handleJoinRoom = useCallback(
    //     (data) => {
    //       console.log(data);
    //       const { email, room } = data;
    //       navigate(`/bp/room/${room}`);
    //     },
    //     [navigate]
    //   );

    //   useEffect(() => {
    //     socket.on("room:join", handleJoinRoom);
    //     return () => {
    //       socket.off("room:join", handleJoinRoom);
    //     };
    //   }, [socket, handleJoinRoom]);



    const fetchPatAptToday = async () => {
        try {
            const token = localStorage.getItem('token');
            const pid = localStorage.getItem('patientId');
            console.log(pid);
            const response = await axios.get(`http://localhost:8080/patient/today-apt`, {
                // headers: {
                //     'Authorization': `Bearer ${token}`
                // },
                params : {
                    patientId : pid
                },
                withCredentials: true
            });
            setApts(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };
    
    
    const fetchOnlineDoctors = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/patient/online-doc`, {
                // headers: {
                //     'Authorization': `Bearer ${token}`
                // }
                withCredentials: true
            });
            setDoctors(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const handleCall = (patientName, doctorName) => {
        console.log(doctorName);
        const patientEmail = localStorage.getItem('email'); // Simulate email using patient name
        navigate('/call', { state: { patientEmail, doctorName } });
      };



      const renderModal = () => {
        if (!selectedDoctor) return null;
        const doctor = selectedDoctor;

        return (
            <>
                <div className="modal-overlay">
                <div className="modal" style={{'border':'none'}}>
                    <div className="modal-header">
                        <h2 className='doc-name'>Dr. {doctor.name}</h2>
                        <button onClick={closeModal} className='close-btn'><IoCloseCircle /></button>
                    </div>
                    <div className="modal-body-up">
                        <div className="modal-info-up" style={{ textAlign: 'left' }}>
                            <form onSubmit={handleSubmitForm}>
                                <label htmlFor="email">Email ID</label>
                                <input
                                type="email"
                                id="email"
                                placeholder="Patient@gmail.com"
                                value={pemail}
                                // onChange={(e) => setEmail(e.target.value)}
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
                                <button><IoMdCall /> Call Now</button>
                            </form>
                        </div>
                        <div className="modal-graphs">

                        </div>
                    </div>
                </div>
            </div>
            </>
            
        );
    };


  return (
    <>
        <PNavbar />
        <PSidebar />
        <div className="calldoc">
        <div className="today-apt">
            <h2 style={{'color':'black', 'margin':'15px 0px'}}>Today's Appointments</h2>
            {apts.map((apt, index) => (
                <div key={index} className="apts">
                    <h4>Dr. {apt.doctorName}</h4>
                    <p><b>Purpose: </b>{apt.reason}</p>
                    <p><b>Date: </b>{apt.callDate}</p>
                    <p><b>Time: </b>{apt.callTime}</p>
                    {/* <button></button> */}
                    <button className="viewbtn" onClick={() => handleCall(apt.pEmail,apt.doctorId)}><IoMdCall /></button>
                </div>
            ))}
        </div>
        <div className="on-doc">
            <h3 className="on-doc-head">Online Doctors</h3>
                {doctors.map((doctor, index) => (
                    <div key={index} className="doc-list">
                    <div className="icon" onClick={() => openModal(doctor)}>{/*handleCall(localStorage.getItem('email'),doctor.id) */}
                        <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf1y2A8q1zP66KMRjOJZfXsbZKVuv1QmlyIOGTVH0J8A&s"} className="doc-icon" alt={doctor.name} />
                        <div className="call-icon" >
                            <IoMdCall />
                        </div>
                    </div>
                    <div className="doc-cont">
                        <div className="doc-cont-top">
                        <h4>Dr. {doctor.name}</h4>
                        <div className="on-status"><GoDotFill /></div>
                        </div>
                        <p><b>Rating: </b><DisplayRating rating={doctor.totalRating} /></p>
                    </div>
                    </div>
                ))}
        </div>
        {renderModal()}
    </div>
    </>
    
  );
};

export default Patientscreen;