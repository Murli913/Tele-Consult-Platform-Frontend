import React, { useState, useEffect } from 'react';
import './book.css';
import { GoPlusCircle } from "react-icons/go";

function BookNow() {
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);

    useEffect(() => {
        generateTimeSlots();
    }, [selectedDoctor]);

    const handleDoctorChange = (event) => {
        setSelectedDoctor(event.target.value);
    };

    const generateTimeSlots = () => {
        const startTime = 9 * 60; // 9 AM in minutes
        const endTime = 12 * 60; // 12 PM in minutes
        const interval = 15; // Interval in minutes

        const slots = [];
        for (let time = startTime; time < endTime; time += interval) {
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            slots.push(formattedTime);
        }
        setTimeSlots(slots);
    };

    return (
        <div className="book-content">
            <h2 className='head'>Book Appointment</h2>
            <form className='form'>
                <div className="form-group">
                    <label htmlFor="cause" className='label1'>1. Cause/Reason*</label>
                    <input type="text" id="cause" name="cause" placeholder="Reason for appointment" required />
                </div>
                <div className="form-group">
                    <label htmlFor="medicalHistory" className='label1'>2. Medical History</label>
                    <textarea style={{resize: 'vertical'}} id="medicalHistory" name="medicalHistory" placeholder="Mention any past health issues, unhealthy habits etc"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="activeCondition" className='label1'>3. Active health condition</label>
                    <textarea style={{resize: 'vertical'}} id="activeCondition" name="activeCondition" placeholder="Mention if any active health condition"></textarea>
                </div>
                <div className="form-group2">
                    <label htmlFor="selectDoctor" className='label2'>4. Select a Doctor*</label>
                    <select style={{padding: '10px 8px', margin: '14px 14px 14px 40px'}} id="selectDoctor" name="selectDoctor" value={selectedDoctor} onChange={handleDoctorChange} required>
                        <option value="">Select a doctor</option>
                        {/* Replace the dummy data with your actual doctor data */}
                        <option value="doctor1">Dr. John Doe, MBBS</option>
                        <option value="doctor2">Dr. Jane Smith, MD</option>
                    </select>
                </div>
                <div className="form-group2">
                    <label htmlFor="selectDate" className='label2'>5. Select a Date*</label>
                    <input style={{margin: '14px 14px 14px 55px'}} type="date" id="selectDate" name="selectDate" min={new Date().toISOString().split('T')[0]} required />
                </div>
                <div className="form-group2">
                    <label htmlFor="selectTimeSlot" className='label2'>6. Select a Time Slot*</label>
                    <select style={{padding: '10px 18px', margin: '14px 14px 14px 22px'}} id="selectTimeSlot" name="selectTimeSlot" required>
                        <option value="">Select a time slot</option>
                        {/* Populate time slots based on selected doctor */}
                        {timeSlots.map(slot => (
                            <option key={slot} value={slot}>{slot}</option>
                        ))}
                    </select>
                </div>
                <button className='book-btn' type="submit">Book Appointment<GoPlusCircle /></button>
            </form>
        </div>
    );
}

export default BookNow;
