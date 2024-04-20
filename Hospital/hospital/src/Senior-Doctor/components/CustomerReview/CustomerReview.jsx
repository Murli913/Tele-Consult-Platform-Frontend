import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios"; // Don't forget to import axios

const CustomerReview = () => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/patient/getAllRating", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
        setRatings(response.data);
     
    } catch (error) {
      console.error("Error fetching ratings: ", error);
    }
  };

  // Extracting doctor IDs and ratings from the fetched data
  const doctorIds = ratings.map((rating) => rating.id);
  const doctorRatings = ratings.map((rating) => rating.totalRating);

  const options = {
    chart: {
      type: "bar",
      height: 350,
      background: '#f4f4f4',
      foreColor: '#333'
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 5,
      }
    },
    xaxis: {
      categories: doctorIds,
      labels: {
        formatter: function (val) {
          return "Doctor " + val;
        }
      }
    },
    yaxis: {
      title: {
        text: "Ratings",
        style: {
          fontSize: '16px',
          fontWeight: 600,
          fontFamily: 'Arial, sans-serif',
        }
      },
      max: 5 // Limit y-axis to 5
    },
    fill: {
      colors: ['#59bfff']
    },
    dataLabels: {
      enabled: false
    },
    title: {
      text: "Patient-FeedBack",
      align: 'center',
      margin: 20,
      offsetY: 20,
      style: {
        fontSize: '20px',
        fontWeight: 600,
        fontFamily: 'Arial, sans-serif',
      }
    },
    tooltip: {
      enabled: true,
      shared: false, // Changed to false
      intersect: false, // Added intersect: false
      y: {
        formatter: function (val) {
          return val
        }
      }
    }
  };

  const series = [
    {
      name: "Ratings",
      data: doctorRatings
    }
  ];

  return (
    <div className="CustomerReview">
  
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default CustomerReview;
