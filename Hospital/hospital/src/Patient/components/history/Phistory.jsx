import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoCloseCircle } from "react-icons/io5";
import DisplayRating from '../rating/rating';
import PNavbar from '../navbar/Pnavbar';
import PSidebar from '../sidebar/Psidebar';

function PHistory() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/");
        }
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [pastAppointments, setPastAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const openModal = (appointment) => {
        setSelectedAppointment(appointment);
    };

    const closeModal = () => {
        setSelectedAppointment(null);
    };

    useEffect(() => {
        fetchPastData();
    }, []);

    const fetchPastData = async () => {
        try {
            const pid = localStorage.getItem('patientId');
            const token = localStorage.getItem('token');

            const response = await axios.get(`http://localhost:8080/patient/past-apt`, {
                // headers: {
                //     'Authorization': `Bearer ${token}`
                // },
                params: {
                    patientId: pid
                },
                withCredentials: true
            });

            if (response.data.length === 0) {
                console.log("No Previous Appointments");
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

    const renderModal = () => {
        if (!selectedAppointment) return null;
        const appointment = selectedAppointment;

        return (
            <>
                {/* <PNavbar />
                <PSidebar /> */}
                <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="modal w-3/4 md:w-2/4 bg-white rounded-lg p-8">
        <div className="flex justify-between items-center">
            <h2 className='text-xl font-semibold text-black'>Purpose: {appointment.reason}</h2>
            <button onClick={closeModal} className='close-btn text-black p-2'><IoCloseCircle className="text-2xl" /></button>

        </div>


        <div className="modal-body mt-4">
    <div className="modal-info grid grid-cols-2 gap-4">
        <div className="doctorDetails">
            <h3 className="text-lg font-semibold text-black mb-4">Doctor Details</h3>
            <div className="text-sm text-black">
                <p><span className="font-semibold">Name:</span> Dr. {appointment.doctorName}</p>
                <p><span className="font-semibold">Gender:</span> {appointment.doctorGender}</p>
                <p><span className="font-semibold">Email:</span> {appointment.doctorEmail}</p>
                <p><span className="font-semibold">Phone Number:</span> {appointment.doctorPhoneNumber}</p>
                <p><span className="font-semibold">Rating:</span> <DisplayRating rating={appointment.doctorRating} /></p>
            </div>
        </div>
        <div className="aptDetails">
            <h3 className="text-lg font-semibold text-black mb-4">Appointment Details</h3>
            <div className="text-sm text-black">
                <p><span className="font-semibold">Date:</span> {appointment.callDate}</p>
                <p><span className="font-semibold">Time:</span> {appointment.callTime}</p>
                <p><span className="font-semibold">Prescription:</span> {appointment.prescription}</p>
                <p><span className="font-semibold">Call Duration:</span> {appointment.duration}</p>
                <p><span className="font-semibold">Call Rating:</span> <DisplayRating rating={appointment.callRating} /></p>
            </div>
        </div>
    </div>
    <div className="modal-graphs"></div>
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
            <div className="history-content mt-24 px-6 md:px-0 ml-auto">
    <h2 className="history-title text-xl font-semibold  ml-60 mb-6">Previous Consultations</h2>
    <div className="grid grid-cols-0 sm:grid-cols-2 gap-0 md:gap-4">
        {pastAppointments.length !== 0 ? (
            pastAppointments.map((appointment, index) => (
                <div className="card bg-white rounded-lg shadow-md p-6 ml-auto" key={index}>
                   
    <div className="mb-2">
        <p className="text-lg font-semibold"><b>Doctor Name:</b> Dr. {appointment.doctorName}</p>
    </div>
    <div className="mb-2">
        <p><b>Date:</b> {appointment.callDate}</p>
    </div>
    <div className="mb-2">
        <p><b>Time:</b> {appointment.callTime}</p>
    </div>
    <div className="mt-4">
        <button onClick={() => openModal(appointment)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">View Details</button>

</div>

                </div>
            ))
        ) : (
            <p className="text-center text-gray-500">No Previous Appointments</p>
        )}
    </div>
    {renderModal()}
</div>

        </>
    );
}

export default PHistory;
