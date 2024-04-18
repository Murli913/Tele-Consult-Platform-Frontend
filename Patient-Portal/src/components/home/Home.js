import React, {useState, useEffect} from 'react';
import './Home.css';
import { IoCloseCircle } from "react-icons/io5";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate=useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
          navigate("/");
        } }, []);

    const [showModal, setShowModal] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchPastData();
    }, []);

    useEffect(() => {
        // Fetch patient details from backend using the token
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        
        // console.log("Email:", email);
        // console.log("Token:", token);
    
        axios.get(`http://localhost:8080/patient/patient-details/${email}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          // console.log(response.data);
          localStorage.setItem('patientId', response.data.id);
          // Handle response data here
          // setPatientDetails(response.data); // Assuming response.data contains patient details
        })
        .catch(error => {
          console.error('Error fetching patient details:', error);
          // Handle error here
        });
      }, []);


      const fetchData = async () => {
        try {
            const pid = localStorage.getItem('patientId');
            const token = localStorage.getItem('token');
            console.log(pid);
            console.log(token);
            const response = await axios.get(`http://localhost:8080/patient/up-apt`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params:{
                    patientId : pid
                }
            });
            console.log(response);
            if (response.data.length === 0) {
                // If no appointments are fetched, show a message
                console.log("No Upcoming Appointments");
            } else {
                // Update the state with fetched appointments
                setAppointments(response.data);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const fetchPastData = async () => {
        try {
            const pid = localStorage.getItem('patientId');
            const token = localStorage.getItem('token');
            console.log(pid);
            console.log(token);
            const response = await axios.get(`http://localhost:8080/patient/past-apt`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params:{
                    patientId : pid
                }
            });
            console.log(response);
            if (response.data.length === 0) {
                // If no appointments are fetched, show a message
                console.log("No Past Appointments");
            } else {
                // Update the state with fetched appointments
                const appointmentsWithDuration = response.data.map(appointment => {
                    const callTime = new Date(`1970-01-01T${appointment.callTime}`);
                    const endTime = new Date(`1970-01-01T${appointment.endTime}`);
                    const duration = endTime.getTime() - callTime.getTime();
                    // const hours = Math.floor(duration / (1000 * 60 * 60));
                    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((duration % (1000 * 60)) / 1000);
                    // const formattedHours = String(hours).padStart(2, '0');
                    const formattedMinutes = String(minutes).padStart(2, '0');
                    const formattedSeconds = String(seconds).padStart(2, '0');
                    const durationString = `${formattedMinutes}m${formattedSeconds}s`;
                    return { ...appointment, duration: durationString };
                });
                setPastAppointments(appointmentsWithDuration);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };


    return (
        <div className="home-content">
            <div className="top-content">
                <div className="top-left">
                    <h3 className='head'>Upcoming Appointments</h3>
                    {/* <div className="up-content-parent"> */}
                    {appointments.length !== 0 ? (
                        <div className="up-content-parent">
                            {appointments.map((appointment, index) => (
                                <div key={index} className='up-left'>
                                    <div className="up-inner">
                                        <h4 className='up-apt'>Doctor Name: {appointment.doctorName}</h4>
                                        <p className='up-apt'><b>Status:</b> Not Attended</p>
                                    </div>
                                    <div className="up-inner">
                                        <p className='up-apt' style={{'margin-right':'40px'}}><b>Date:</b> {appointment.callDate}</p>  
                                        <p className='up-apt'><b>Time:</b> {appointment.callTime}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{'color':'var(--body_color)', 'text-align':'center', 'font-weight':'100'}}>No Upcoming Appointments</p>
                    )}
                    {/* </div> */}
                </div>
                <div className="top-right">
                    <h3 className='head'>Past Consultations</h3>
                    {pastAppointments.length !== 0 ? (
                    <div className="up-content-parent">
                    {pastAppointments.map((appointment, index) => (
                        <div key={index} className='up-left'>
                            <div className="up-inner">
                                <h4 className='up-apt'>Doctor Name: {appointment.doctorName}</h4>
                                <p className='up-apt'><b>Date:</b> {appointment.callDate}</p>
                            </div>
                            <div className="up-inner">
                                <p className='up-apt'style={{'margin-right':'60px'}}><b>Time:</b> {appointment.callTime}</p>  
                                <p className='up-apt'><b>Duration:</b> {appointment.duration}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                    ) : (
                        <p style={{'color':'var(--body_color)', 'text-align':'center', 'font-weight':'100'}}>No Past Appointments</p>
                    )}
                </div>
            </div>
            <div className="bottom-content">
                <h3 className='head'>Top Doctors</h3>
                <div className="bt-parent">
                <div className='bt-content'>
                    <h4 className='up-apt doc-name'> 
                    <img src="./images/maharshi.jpg" className='doc-img' alt="" />
                        Dr. Maharshi Patel (MBBS)
                        </h4>
                        <button onClick={openModal} className='view-btn'>View Statistics</button>
                            {showModal && (
                                <div className="modal-overlay">
                                    <div className="modal">
                                        <div className="modal-header">
                                        <h2 className='doc-name'><img src   ="./images/maharshi.jpg" className='doc-img' alt="" /> Dr. Maharshi Patel</h2>
                                        <button onClick={closeModal} className='close-btn'><IoCloseCircle /></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="modal-info" style={{ textAlign: 'left' }}   >
                                                <p><b>Qualification: </b>MBBS</p>
                                                <p><b>No. of patients: </b>203</p>
                                                <p><b>Rating: </b>4.3/5</p>
                                            </div>
                                            <div className="modal-graphs">

                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            )}
                </div>
                <div className='bt-content'>
                    <h4 className='up-apt doc-name'> 
                    <img src="./images/maharshi.jpg" className='doc-img' alt="" />
                        Dr. Maharshi Patel (MBBS)
                        </h4>
                        <button onClick={openModal} className='view-btn'>View Statistics</button>
                </div>
                <div className='bt-content'>
                    <h4 className='up-apt doc-name'> 
                    <img src="./images/maharshi.jpg" className='doc-img' alt="" />
                        Dr. Maharshi Patel (MBBS)
                        </h4>
                        <button onClick={openModal} className='view-btn'>View Statistics</button>
                </div>
                <div className='bt-content'>
                    <h4 className='up-apt doc-name'> 
                    <img src="./images/maharshi.jpg" className='doc-img' alt="" />
                        Dr. Maharshi Patel (MBBS)</h4>
                        <button onClick={openModal} className='view-btn'>View Statistics</button>
                </div>
                </div>                    
            </div>
        </div>
    );
}

export default HomePage;
