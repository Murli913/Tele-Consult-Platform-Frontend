import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API requests

const AreaProgressChart = () => {
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState([]); // State to store doctor data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/patient/getAllRating", {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
          });
        // Sort the doctorData array based on totalRating in descending order
        const sortedData = response.data.sort((a, b) => b.totalRating - a.totalRating);
        // Get the top 5 records
        const top5Records = sortedData.slice(0, 5);
        // Set the fetched doctor data to state
        setDoctorData(top5Records);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();

    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="progress-bar">
      <div className="progress-bar-info">
        <h4 className="progress-bar-title">Patient FeedBack</h4>
      </div>
      <div className="progress-bar-list">
        {doctorData.map((doctor) => (
          <div className="progress-bar-item" key={doctor.id}>
            <div className="bar-item-info">
              <p className="bar-item-info-name">Doctor ID: {doctor.id}</p>
              <p className="bar-item-info-value">Total Rating: {doctor.totalRating}</p>
            </div>
            <div className="bar-item-full">
              <div
                className="bar-item-filled"
                style={{
                  width: `${doctor.totalRating * 10}%`, // Assuming totalRating is out of 10
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AreaProgressChart;
