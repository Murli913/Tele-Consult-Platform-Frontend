import React, { useState, useEffect } from "react";
import { GoPlusCircle } from "react-icons/go";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DisplayRating from "../rating/rating";
import PNavbar from "../navbar/Pnavbar";
import PSidebar from "../sidebar/Psidebar";

function PBookNow() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [minDate, setMinDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [reasonVal, setReasonVal] = useState("");

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
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/patient/getsnrdoctors`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      // Handle error
    }
  };

  const fetchTimeSlots = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/patient/time-slots`,
        {
          params: {
            doctorId: selectedDoctor,
            date: selectedDate,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response from server:", response.data); // Log response data
      if (Array.isArray(response.data)) {
        const fetchedTimeSlots = response.data;
        const allTimeSlots = generateTimeSlots();
        const availableTimeSlots = allTimeSlots.filter(
          (slot) => !fetchedTimeSlots.includes(slot)
        );
        setTimeSlots(availableTimeSlots);
      } else {
        console.error("Error: Unexpected response format");
      }
    } catch (error) {
      console.error("Error fetching time slots:", error);
      // Handle error
    }
  };

<<<<<<< HEAD
    const fetchDoctors = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/patient/getsnrdoctors`, {
                // headers: {
                //     'Authorization': `Bearer ${token}`
                // }
                withCredentials: true
            });
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
            // Handle error
=======
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
    const [hours, minutes] = selectedTimeString.split(":");
    const selectedTime = new Date();
    selectedTime.setHours(parseInt(hours));
    selectedTime.setMinutes(parseInt(minutes));
    setSelectedTimeSlot(selectedTime);
  };

  const getMinDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today
      .getDate()
      .toString()
      .padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const generateTimeSlots = () => {
    const startTime1 = 9 * 60;
    const endTime1 = 12 * 60;
    const interval1 = 30;

    const startTime2 = 14 * 60;
    const endTime2 = 16 * 60;

    const slots = [];

    for (let time = startTime1; time < endTime1; time += interval1) {
      const hours = Math.floor(time / 60);
      const minutes = time % 60;
      const formattedTime = `${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      slots.push(formattedTime);
    }

    for (let time = startTime2; time < endTime2; time += interval1) {
      const hours = Math.floor(time / 60);
      const minutes = time % 60;
      const formattedTime = `${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      slots.push(formattedTime);
    }

    return slots;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const patientId = localStorage.getItem("patientId");
    const callDate = new Date(selectedDate);
    const sltime = new Date(selectedTimeSlot);
    const reason = reasonVal;
    sltime.setSeconds(0);
    const callTime = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(sltime);
    console.log(callTime);
    try {
      await axios.post(
        "http://localhost:8080/patient/book-apt",
        {
          patient: { id: patientId },
          doctor: { id: selectedDoctor },
          callDate,
          callTime,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
>>>>>>> 36f371fa52e41068e0eb55ffdce70f338148ca17
        }
      );
      setSelectedDoctor("");
      setSelectedDate("");
      setSelectedTimeSlot("");
      console.log("Successful");
      toast.success("Appointment Booked Succesfully");
    } catch (error) {
      toast.error("Error occurred while booking appointment");
      console.error("Error booking appointment:", error);
    }
  };

<<<<<<< HEAD
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
        const [hours, minutes] = selectedTimeString.split(':');
        const selectedTime = new Date();
        selectedTime.setHours(parseInt(hours));
        selectedTime.setMinutes(parseInt(minutes));
        setSelectedTimeSlot(selectedTime);
    };

    const getMinDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const generateTimeSlots = () => {
        const startTime1 = 9 * 60;
        const endTime1 = 12 * 60;
        const interval1 = 30;

        const startTime2 = 14 * 60;
        const endTime2 = 16 * 60;

        const slots = [];

        for (let time = startTime1; time < endTime1; time += interval1) {
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            slots.push(formattedTime);
        }

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
            await axios.post('http://localhost:8080/patient/book-apt', {
                patient: { id: patientId },
                doctor: { id: selectedDoctor },
                callDate,
                callTime,
                reason
            }, {
                // headers: {
                //     'Authorization': `Bearer ${token}`
                // }
                withCredentials: true
            });
            setSelectedDoctor('');
            setSelectedDate('');
            setSelectedTimeSlot('');
            console.log("Successful");
            toast.success("Appointment Booked Succesfully");
        } catch (error) {
            toast.error("Error occurred while booking appointment");
            console.error('Error booking appointment:', error);
        }
    };

    return (
        <>
            <PNavbar />
            <PSidebar />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-8">
                {/* First Card */}
                <div className="bg-white rounded-lg shadow-lg w-100 h-100">
              
                        <img src="https://i.pinimg.com/originals/3e/5e/61/3e5e61f165a97bede87a096025ffc1fb.gif" alt="Doctor" className="w-full h-120 left-100 object-cover" />
                       
                    
                </div>




                {/* Second Card - Form */}
                <div className="bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 p-4">Book Appointment</h2>
        <div className="p-4">
            <div className="form-group">
                <label htmlFor="cause" className="font-semibold mb-2">Cause/Reason*</label>
                <input
                    type="text"
                    id="cause"
                    name="cause"
                    placeholder="Reason for appointment"
                    value={reasonVal}
                    onChange={handleReasonChange}
                    required
                    className="w-full md:w-3/4 px-4 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <div className="form-group">
                <label htmlFor="selectDoctor" className="font-semibold mb-2">Select a Doctor*</label>
                <div className="doctors-list flex overflow-x-auto border border-gray-300 rounded-md p-2">
                    {doctors.map(doctor => (
                        <div
                            key={doctor.id}
                            className={`doctor ${selectedDoctor === doctor.id ? 'selected' : ''} min-w-40 m-2 p-2 border border-gray-300 rounded-md cursor-pointer`}
                            onClick={() => handleDoctorChange(doctor.id)}
                        >
                            <h4>Dr. {doctor.name}</h4>
                            <p>Rating: <DisplayRating rating={doctor.totalRating} /></p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="selectDate" className="font-semibold mb-2">Select a Date*</label>
                <input
                    type="date"
                    id="selectDate"
                    name="selectDate"
                    min={minDate}
                    value={selectedDate}
                    onChange={handleDateChange}
                    required
                    className="w-full md:w-3/4 px-4 py-2 border border-gray-300 rounded-md mb-4 md:mb-0"
                />
            </div>
            <div className="form-group flex flex-col md:flex-row items-center">
                <label htmlFor="selectTimeSlot" className="font-semibold  w-100 mb-2 md:mr-4">Select a Time Slot*</label>
                <select
                    id="selectTimeSlot"
                    name="selectTimeSlot"
                    onChange={handleTimeSlotChange}
                    required
                    className="w-full md:w-3/4 px-4 py-2 border border-gray-300 rounded-md mb-4 md:mb-0"
                >
                    <option value="">Select a time slot</option>
                    {timeSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                    ))}
                </select>
            </div>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-orange-600 transition duration-300 w-full" type="submit" onClick={handleSubmit}>Book Appointment<GoPlusCircle /></button>
        </div>
</div>




=======
  return (
    <>
      <PNavbar />
      <PSidebar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-8">
        {/* First Card */}
        <div className="bg-white rounded-lg shadow-lg w-100 h-100">
          <img
            src="https://i.pinimg.com/originals/3e/5e/61/3e5e61f165a97bede87a096025ffc1fb.gif"
            alt="Doctor"
            className="w-full h-120 left-100 object-cover"
          />
        </div>

        {/* Second Card - Form */}
        <div className="bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 p-4">Book Appointment</h2>
          <div className="p-4">
            <div className="form-group">
              <label htmlFor="cause" className="font-semibold mb-2">
                Cause/Reason*
              </label>
              <input
                type="text"
                id="cause"
                name="cause"
                placeholder="Reason for appointment"
                value={reasonVal}
                onChange={handleReasonChange}
                required
                className="w-full md:w-3/4 px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="form-group">
              <label htmlFor="selectDoctor" className="font-semibold mb-2">
                Select a Doctor*
              </label>
              <div className="doctors-list flex overflow-x-auto border border-gray-300 rounded-md p-2">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className={`doctor ${
                      selectedDoctor === doctor.id ? "selected" : ""
                    } min-w-40 m-2 p-2 border border-gray-300 rounded-md cursor-pointer`}
                    onClick={() => handleDoctorChange(doctor.id)}
                  >
                    <h4>Dr. {doctor.name}</h4>
                    <p>
                      Rating: <DisplayRating rating={doctor.totalRating} />
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="selectDate" className="font-semibold mb-2">
                Select a Date*
              </label>
              <input
                type="date"
                id="selectDate"
                name="selectDate"
                min={minDate}
                value={selectedDate}
                onChange={handleDateChange}
                required
                className="w-full md:w-3/4 px-4 py-2 border border-gray-300 rounded-md mb-4 md:mb-0"
              />
            </div>
            <div className="form-group flex flex-col md:flex-row items-center">
              <label
                htmlFor="selectTimeSlot"
                className="font-semibold  w-100 mb-2 md:mr-4"
              >
                Select a Time Slot*
              </label>
              <select
                id="selectTimeSlot"
                name="selectTimeSlot"
                onChange={handleTimeSlotChange}
                required
                className="w-full md:w-3/4 px-4 py-2 border border-gray-300 rounded-md mb-4 md:mb-0"
              >
                <option value="">Select a time slot</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
>>>>>>> 36f371fa52e41068e0eb55ffdce70f338148ca17
            </div>
            <button
              onClick={handleSubmit}
              className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-orange-600 transition duration-300 w-full"
              type="submit"
            >
              Book Appointment
              <GoPlusCircle />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PBookNow;
