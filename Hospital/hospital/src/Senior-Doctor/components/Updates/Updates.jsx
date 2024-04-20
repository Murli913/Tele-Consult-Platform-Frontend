import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Updates.css";

const Updates = () => {
  const [topDoctors, setTopDoctors] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/patient/getAllRating", {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
          });
        // Sort doctors based on totalRating in descending order
        const sortedDoctors = response.data.sort((a, b) => b.totalRating - a.totalRating);
        // Get top 3 doctors
        const topThreeDoctors = sortedDoctors.slice(0, 3);

        // Fetch details of top 3 doctors
        const doctorDetailsPromises = topThreeDoctors.map(async (doctor) => {
          try {
            const detailsResponse = await axios.get(`http://localhost:8080/doctor/${doctor.id}/details`, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
              }
            });
            return {
              id: doctor.id,
              name: detailsResponse.data.name,
              phoneNumber: detailsResponse.data.phoneNumber,
              totalRating: doctor.totalRating,
              time: new Date().toLocaleString() // Assuming you want to display the current time
            };
          } catch (error) {
            console.error("Error fetching doctor details: ", error);
            return null;
          }
        });

        // Wait for all promises to resolve and filter out any null values
        const resolvedDoctorDetails = await Promise.all(doctorDetailsPromises);
        const validDoctorDetails = resolvedDoctorDetails.filter(details => details !== null);

        // Update state with top 3 doctors and their details
        setTopDoctors(validDoctorDetails);
      } catch (error) {
        console.error("Error fetching ratings: ", error);
      }
    };

    fetchRatings(); // Call the function to fetch ratings

  }, []); // Empty dependency array means this effect runs only once on component mount

  return (
    <div className="Updates" style={{ width: "100%" }}>
      {topDoctors.map((doctor) => {
        return (
          <div key={doctor.id} className="update">
            <img src="https://img.freepik.com/premium-vector/picture-doctor-with-glasses-lab-coat_410516-87465.jpg" alt={`Doctor ${doctor.id}`} />
            <div className="noti">
              <div style={{ marginBottom: "0.5rem" }}>
                <span>Name: {doctor.name}</span>
                <span>Rating: {doctor.totalRating}</span>
                <span>Phone Number: {doctor.phoneNumber}</span>
              </div>
             
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Updates;
