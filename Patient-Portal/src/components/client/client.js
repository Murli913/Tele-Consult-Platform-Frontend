import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./client.css";
import { IoMdCall } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import DisplayRating from '../rating/rating';


const Patientscreen = () => {
    const [doctors, setDoctors] = useState([]);
    const [apts, setApts] = useState([]);

    useEffect(() => {
        fetchOnlineDoctors();
    }, []);

    useEffect(() => {
        fetchPatAptToday();
    }, []);

    const fetchPatAptToday = async () => {
        try {
            const token = localStorage.getItem('token');
            const pid = localStorage.getItem('patientId');
            console.log(pid);
            const response = await axios.get(`http://localhost:8080/patient/today-apt`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params : {
                    patientId : pid
                }
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
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setDoctors(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };


  return (
    <div className="calldoc">
        <div className="today-apt">
            <h2 style={{'color':'var(--body_color)', 'margin-bottom':'25px'}}>Today's Appointments</h2>
            {apts.map((apt, index) => (
                <div key={index} className="apts">
                    <h4>Dr. {apt.doctorName}</h4>
                    <p><b>Purpose: </b>{apt.reason}</p>
                    <p><b>Date: </b>{apt.callDate}</p>
                    <p><b>Time: </b>{apt.callTime}</p>
                    <button><IoMdCall /></button>
                </div>
            ))}
        </div>
        <div className="on-doc">
            <h3 className="on-doc-head">Online Doctors</h3>
                {doctors.map((doctor, index) => (
                    <div key={index} className="doc-list">
                    <div className="icon">
                        <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf1y2A8q1zP66KMRjOJZfXsbZKVuv1QmlyIOGTVH0J8A&s"} className="doc-icon" alt={doctor.name} />
                        <div className="call-icon">
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
    </div>
  );
};

export default Patientscreen;
