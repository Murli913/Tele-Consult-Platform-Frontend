import React, { useState, useEffect } from 'react';
import './book.css';
import { GoPlusCircle } from "react-icons/go";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DisplayRating from '../rating/rating';

function BookNow() {
    const navigate=useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
          navigate("/");
        } }, []);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [minDate, setMinDate] = useState('');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState();
    const [reasonVal, setReasonVal] = useState('');

    useEffect(() => {
        fetchDoctors();
        setMinDate(getMinDate());
    }, []);

    useEffect(() => {
        if (selectedDoctor && selectedDate) {
            fetchTimeSlots();
        }
    }, [selectedDoctor, selectedDate]);

    const fetchDoctors = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/patient/getsnrdoctors`, {
                // headers: {
                //     'Authorization': `Bearer ${token}`
                // }
                withCredentials : true
            });
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
            // Handle error
        }
    };

    const fetchTimeSlots = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/patient/time-slots`, {
                params: {
                    doctorId: selectedDoctor,
                    date: selectedDate
                },
                // headers: {
                //     'Authorization': `Bearer ${token}`
                // }
                withCredentials: true
            });

            console.log('Response from server:', response.data); // Log response data
            if (Array.isArray(response.data)) {
                const fetchedTimeSlots = response.data;
                const allTimeSlots = generateTimeSlots();
                const availableTimeSlots = allTimeSlots.filter(slot => !fetchedTimeSlots.includes(slot));
                setTimeSlots(availableTimeSlots);
            } else {
                console.error('Error: Unexpected response format');
            }
        } catch (error) {
            console.error('Error fetching time slots:', error);
            // Handle error
        }
    };
    

    const handleDoctorChange = (doctorId) => {
        setSelectedDoctor(doctorId);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleReasonChange = (event) => {
        setReasonVal(event.target.value);
    };

    const handleTimeSlotChange = (event) => {
        const selectedTimeString = event.target.value;
    // Split the time string into hours and minutes
    const [hours, minutes] = selectedTimeString.split(':');
    // Create a new Date object with today's date and the selected hours and minutes
    const selectedTime = new Date();
    selectedTime.setHours(parseInt(hours));
    selectedTime.setMinutes(parseInt(minutes));
    setSelectedTimeSlot(selectedTime);
    };

    const getMinDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because it's zero-based index
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const generateTimeSlots = () => {
        const startTime1 = 9 * 60; // 9 AM in minutes
        const endTime1 = 12 * 60; // 12 PM in minutes
        const interval1 = 30; // Interval in minutes

        const startTime2 = 14 * 60; // 2 PM in minutes
        const endTime2 = 16 * 60; // 4 PM in minutes

        const slots = [];

        // Generate time slots from 9:00 to 12:00
        for (let time = startTime1; time < endTime1; time += interval1) {
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            slots.push(formattedTime);
        }

        // Generate time slots from 14:00 to 16:00
        for (let time = startTime2; time < endTime2; time += interval1) {
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            slots.push(formattedTime);
        }

        return slots;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const patientId = localStorage.getItem('patientId');
        const callDate = new Date(selectedDate);
        const sltime = new Date(selectedTimeSlot);
        const reason = reasonVal;
        sltime.setSeconds(0);
        const callTime = new Intl.DateTimeFormat("en-US", {
            timeZone: "Asia/Kolkata",
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }).format(sltime);
        console.log(callTime);
        try {
            const response = await axios.post('http://localhost:8080/patient/book-apt', {
                patient : {id: patientId},
                doctor: {id: selectedDoctor},
                callDate,
                callTime,
                reason
            }, {
                // headers: {
                //     'Authorization': `Bearer ${token}`
                // }
                withCredentials: true
            });
            // Reset form fields
            setSelectedDoctor('');
            setSelectedDate('');
            setSelectedTimeSlot(''); // or null, depending on how you handle it
            if(response.data === "Appointment booked successfully")
                toast.success("Appointment Booked Succesfully");
            else toast.error("Slot has been booked Just Now!");
        } catch (error) {
            toast.error("Error booking appointment");
            console.error('Error booking appointment:', error);
        }
    };
    

    return (
        <div className="book-content">
            <h2 className='head'>Book Appointment</h2>
            <form className='form' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="cause" className='label1'>1. Cause/Reason*</label>
                    <input 
                        type="text" 
                        id="cause" 
                        name="cause" 
                        placeholder="Reason for appointment" 
                        value={reasonVal} 
                        onChange={handleReasonChange} 
                        required />
                </div>
                <div className="form-group">
                    <label htmlFor="selectDoctor" className='label2'>2. Select a Doctor*</label>
                    <div className="doctors-list">
                        {doctors.map(doctor => (
                        <div className={`doctor ${selectedDoctor === doctor.id ? 'selected' : ''}`} key={doctor.id} onClick={() => handleDoctorChange(doctor.id)}>
                            <h4>Dr. {doctor.name}</h4>
                            <p>Rating: <DisplayRating rating={doctor.totalRating} /></p>
                        </div>
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="selectDate" className='label2'>3. Select a Date*</label>
                    <input 
                        style={{margin: '14px 14px 14px 55px'}} 
                        type="date" 
                        id="selectDate" 
                        name="selectDate" 
                        min={minDate} 
                        value={selectedDate} 
                        onChange={handleDateChange} 
                        required />
                </div>
                <div className="form-group">
                    <label htmlFor="selectTimeSlot" className='label2'>4. Select a Time Slot*</label>
                    <select 
                        style={{padding: '10px 18px', margin: '14px 14px 14px 22px'}} 
                        id="selectTimeSlot" 
                        name="selectTimeSlot" 
                        onChange={handleTimeSlotChange} 
                        required>
                            <option value="" >Select a time slot</option>
                            {timeSlots.map(slot => (
                                <option key={slot} value={slot}>{slot}</option>
                            ))}
                    </select>
                </div>
                <button className='book-btn' type="submit">Book Appointment<GoPlusCircle /></button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default BookNow;





{/* <select 
                        style={{padding: '10px 8px', margin: '14px 14px 14px 40px'}}
                        id="selectDoctor" 
                        name="selectDoctor" 
                        value={selectedDoctor} 
                        onChange={handleDoctorChange} 
                        required>
                            <option value="">Select a doctor</option>
                            Populate options with fetched doctors */}
                            {/* {doctors.map(doctor => (
                                <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                            ))}
                    </select> */}