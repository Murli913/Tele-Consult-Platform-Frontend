import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./SAreaCards.css";
import SAreaCard from "./SAreaCard";

const SAreaCards = () => {
  
  
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } 
},[]);
  const [doctorId, setDoctorId] = useState(null);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
    fetchDoctorId();
    fetchTotalAppointmentsCount();
    fetchTotalDoctorsCount();
    fetchTotalPatientsCount();
  }, []);

  const fetchDoctorId = async () => {
    try {
      const email = localStorage.getItem("email");
      const result = await axios.get(`http://localhost:8080/doctor/by-email/${email}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      setDoctorId(result.data);
    } catch (error) {
      console.error('Error fetching doctor ID:', error);
    }
  };

  const fetchTotalAppointmentsCount = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/callhistory/doctor/${doctorId}/appointments/count`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      setTotalAppointments(response.data);
    } catch (error) {
      console.error("Error fetching total appointments count:", error);
    }
  };

  const fetchTotalDoctorsCount = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/doctor/under-senior/${doctorId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      setTotalDoctors(response.data);
    } catch (error) {
      console.error("Error fetching total doctors count:", error);
    }
  };

  const fetchTotalPatientsCount = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/callhistory/doctor/${doctorId}/callhistory`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      setTotalPatients(response.data);
    } catch (error) {
      console.error("Error fetching total patients count:", error);
    }
  };

  return (
    <section className="content-area-cards">
      <SAreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={(totalAppointments / 100) * 100} // Example: assuming max 1000 appointments
        cardInfo={{
          title: "Appointment",
          value: totalAppointments,
          text: "Total Appointments.",
        }}
      />
      <SAreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={(totalDoctors.length / 100) * 100} // Example: assuming max 1000 doctors
        cardInfo={{
          title: "Doctors",
          value: totalDoctors.length,
          text: "Total Doctors.",
        }}
      />
      <SAreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={(totalPatients.length / 100) * 100} // Example: assuming max 1000 patients
        cardInfo={{
          title: "Patients",
          value: totalPatients.length,
          text: "Total Patients.",
        }}
      />
    </section>
  );
};

export default SAreaCards;
