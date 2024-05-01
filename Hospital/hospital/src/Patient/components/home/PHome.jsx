import React, { useState, useEffect } from 'react';
import { IoCloseCircle } from "react-icons/io5";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import DisplayRating from '../rating/rating';
import PNavbar from '../navbar/Pnavbar';
import PSidebar from '../sidebar/Psidebar';

function PHomePage() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/");
        }
    }, []);

    const [appointments, setAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [doctors, setDoctors] = useState([]);

    const openModal = (doctor) => {
        setSelectedDoctor(doctor);
    };

    const closeModal = () => {
        setSelectedDoctor(null);
    };

    useEffect(() => {
        fetchData();
        fetchPastData();
        fetchDoctors();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        
        axios.get(`http://localhost:8080/patient/patient-details/${email}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          localStorage.setItem('patientId', response.data.id);
        })
        .catch(error => {
          console.error('Error fetching patient details:', error);
        });
    }, []);

    const fetchData = async () => {
        try {
            const pid = localStorage.getItem('patientId');
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/patient/up-apt`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params:{
                    patientId : pid
                }
            });
            if (response.data.length === 0) {
                console.log("No Upcoming Appointments");
            } else {
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
            const response = await axios.get(`http://localhost:8080/patient/past-apt`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params:{
                    patientId : pid
                }
            });
            if (response.data.length === 0) {
                console.log("No Past Appointments");
            } else {
                const appointmentsWithDuration = response.data.map(appointment => {
                    const callTime = new Date(`1970-01-01T${appointment.callTime}`);
                    const endTime = new Date(`1970-01-01T${appointment.endTime}`);
                    const duration = endTime.getTime() - callTime.getTime();
                    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((duration % (1000 * 60)) / 1000);
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

    const fetchDoctors = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/patient/getsnrdoctors`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const renderModal = () => {
        if (!selectedDoctor) return null;
        const doctor = selectedDoctor;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50" >
                <div className="bg-white w-96 p-6 rounded-lg relative">
                    <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                        <IoCloseCircle className="text-2xl" />
                    </button>
                    <h2 className="text-2xl font-semibold mb-4">Dr. {doctor.name}</h2>
                    <div className="flex flex-col">
                        <p><span className="font-semibold">Gender:</span> {doctor.gender}</p>
                        <p><span className="font-semibold">Email:</span> {doctor.email}</p>
                        <p><span className="font-semibold">Phone Number:</span> {doctor.phoneNumber}</p>
                        <p><span className="font-semibold">Rating:</span>  <DisplayRating rating={doctor.totalRating} /></p>
                        <p><span className="font-semibold">No. of Appointments:</span> {doctor.appointmentCount} </p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <PNavbar />
            <PSidebar />
            <div className="home-content bg-gray-100 text-gray-800 rounded-lg ml-64 p-4 w-100 h-200">
                <div 
  >
                    <img src='https://cdn.dribbble.com/users/976984/screenshots/3727819/hospital.gif'  style={{
    height: '300px',
    width: '2000px',
     // Set height inline
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' // Add box shadow inline
  }}/>
    
                </div>


                <div className="flex justify-between space-x-4  h-2000">


                <div
                       className="w-1/2 bg-white rounded-lg p-4"
                       style={{
    height: '300px',
    top: '1000px', // Set height inline
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' // Add box shadow inline
  }}
>
<h3 className="text-xl font-semibold mb-4 animate__animated animate__bounce">Upcoming Appointments</h3>

  {appointments.length !== 0 ? (
    <div className="overflow-auto max-h-60">
      <ul className="divide-y divide-gray-200">
        {appointments.map((appointment, index) => (
          <li key={index} className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Doctor Name: {appointment.doctorName}</p>
                <p><span className="font-semibold">Reason:</span> {appointment.reason}</p>
                <p><span className="font-semibold">Date:</span> {appointment.callDate}</p>
                <p><span className="font-semibold">Time:</span> {appointment.callTime}</p>
              </div>
              <button className="text-blue-500 hover:text-blue-700 transition duration-300 transform hover:scale-105 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p className="text-gray-500">No Upcoming Appointments</p>
  )}
                 </div>



                   <div className="w-1/2 bg-white rounded-lg p-4 h-600">
    <h3 className="text-xl font-semibold mb-4">Past Consultations</h3>
    {pastAppointments.length !== 0 ? (
        <div className="overflow-y-scroll max-h-60">
            <ul className="divide-y divide-gray-200">
                {pastAppointments.map((appointment, index) => (
                    <li key={index} className="py-4 animate__animated animate__fadeIn">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold">Doctor Name: {appointment.doctorName}</p>
                                <p><span className="font-semibold">Date:</span> {appointment.callDate}</p>
                                <p><span className="font-semibold">Time:</span> {appointment.callTime}</p>
                                <p><span className="font-semibold">Duration:</span> {appointment.duration}</p>
                            </div>
                            <button className="text-blue-500 hover:text-blue-700 transition duration-300 transform hover:scale-105 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    ) : (
        <p className="text-gray-500">No Past Appointments</p>
    )}
                      </div>


                </div>


                <div className="mt-4">
    <h3 className="text-xl font-semibold mb-4">Top Doctors</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {doctors.map((doctor, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg">
                <div className="flex items-center mb-2">
                    <img src="https://i.pinimg.com/originals/9d/d5/4c/9dd54cab3b383726be62b529406f8328.gif" className="w-12 h-12 rounded-full mr-2" alt="" />
                    <h4 className="text-lg font-semibold">Dr. {doctor.name}</h4>
                </div>
                <button onClick={() => openModal(doctor)} className="bg-purple-600 text-white rounded-lg py-2 px-4 hover:bg-purple-700 transition duration-300">View Statistics</button>
            </div>
        ))}
    </div>
</div>

                {renderModal()}
            </div>
        </>
    );
}

export default PHomePage;
