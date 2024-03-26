import React from 'react'
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory, getOrders, getRevenue } from "../../API";
import Chart from 'chart.js/auto';
import './Dashbaord.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashBaord = () => {

  const [doctorcount, setDoctorCount] = useState(0);
  const [doctor, setDoctor] = useState([]);
  const [patient, setPatient] = useState([]);
  const [patientcount, setPatientCount] = useState(0);
  const [appointment, setAppointment] = useState([]);
  const [appointmentcount, setAppointmentCount] = useState(0);
  const [seniordoctor, setSeniorDoctor] = useState([]);
  const [seniordoctorcount, setSeniorDoctorCount] = useState(0);
 
  useEffect(() => {
    loaddoctors();
    loadpatient();
    loadappointment ();
    loadseniordoctors();
   
  }, []);

  const loaddoctors = async () => {
    const result = await axios.get("http://localhost:8080/doctor/doctor");
    setDoctor(result.data);
    //console.log(result.data);
    setDoctorCount(result.data.length);
  };
  const loadpatient = async () => {
    const result = await axios.get("http://localhost:8080/patient/patient");
    setPatient(result.data);
    setPatientCount(result.data.length);
  };
  const loadappointment = async () => {
    const result = await axios.get("http://localhost:8080/appointment/appointment");
    setAppointment(result.data);
    console.log(result.data);
    setAppointmentCount(result.data.length);
  };
  const loadseniordoctors = async () => {
    try {
        const result = await axios.get("http://localhost:8080/doctor/doctor");
        
        // Filter the data where status is "yes"
        const filteredDoctors = result.data.filter(doctor => doctor.status === "yes");

        // Set the filtered doctors array
        setSeniorDoctor(filteredDoctors);

        // Log the filtered data
        //console.log(filteredDoctors);

        // Set the count of filtered doctors
        setSeniorDoctorCount(filteredDoctors.length);
    } catch (error) {
        // Handle errors here
        console.error("Error loading doctors:", error);
    }
};


  return (
    <Space size={20} direction="vertical">
      
    <Typography.Title level={4}>Dashboard</Typography.Title>
    <Space direction="horizontal">
      <DashboardCard
        icon={
          <UserOutlined
            style={{
              color: "green",
              backgroundColor: "rgba(0,255,0,0.25)",
              borderRadius: 20,
              fontSize: 24,
              padding: 8,
            }}
          />
        }
        title={"Patients"}
        value={patientcount}
      />
      <DashboardCard
        icon={
          <UserOutlined
            style={{
              color: "blue",
              backgroundColor: "rgba(0,0,255,0.25)",
              borderRadius: 20,
              fontSize: 24,
              padding: 8,
            }}
          />
        }
        title={"Doctors"}
        value={doctorcount}
      />
      <DashboardCard
        icon={
          <UserOutlined
            style={{
              color: "purple",
              backgroundColor: "rgba(0,255,255,0.25)",
              borderRadius: 20,
              fontSize: 24,
              padding: 8,
            }}
          />
        }
        title={"Senior Doctor"}
        value={seniordoctorcount}
      />
      <DashboardCard
        icon={
          <DollarCircleOutlined
            style={{
              color: "red",
              backgroundColor: "rgba(255,0,0,0.25)",
              borderRadius: 20,
              fontSize: 24,
              padding: 8,
            }}
          />
        }
        title={"Appointment"}
        value={appointmentcount}
      />
    </Space>
    <Space>
      <RecentOrders />
      <DashboardChart />
    </Space>
  </Space>
  )
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [todayappointment, setTodayAppointment] = useState([]);
  const [todayappointmentcount, setTodayAppointmentCount] = useState(0);
  useEffect(() => {
   
    loadtodayappointment();
  }, []);
  const loadtodayappointment = async () => {
    const result = await axios.get("http://localhost:8080/appointment/appointment");
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    console.log("today", today);
    // Filter appointments for today's date
    const todayAppointments = result.data.filter(appointment => appointment.dptdate === today);
  
    setTodayAppointment(todayAppointments);
    console.log("todayappointment", todayAppointments);
    setTodayAppointmentCount(todayAppointments.length);
  };
  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products.splice(0, 3));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Typography.Text>Recent Appointments</Typography.Text>
      <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">PatientName</th>
              <th scope="col">DoctorName</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              
            </tr>
          </thead>
          <tbody>
            {todayappointment.map((appointment, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{appointment.patientname}</td>
                <td>{appointment.doctorname}</td>
                <td>{appointment.apttime}</td>
                <td>{appointment.dptdate}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
    </>
  );
}

function DashboardChart() {
  

  const [appointments, setAppointments] = useState([]);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [appointmentChart, setAppointmentChart] = useState(null);

  useEffect(() => {
    const loadAppointment = async () => {
      try {
        const result = await axios.get("http://localhost:8080/appointment/appointment");
        const appointmentsData = result.data;
        setAppointments(appointmentsData);

        // Count appointments for each date
        const appointmentCountByDate = {};
        appointmentsData.forEach(appointment => {
          const date = appointment.dptdate.split('T')[0]; // Assuming dptdate is in ISO format
          appointmentCountByDate[date] = (appointmentCountByDate[date] || 0) + 1;
        });

        // Prepare data for chart
        const labels = Object.keys(appointmentCountByDate);
        const data = Object.values(appointmentCountByDate);

        // If chart instance exists, destroy it
        if (appointmentChart) {
          appointmentChart.destroy();
        }

        // Render chart using Chart.js
        const ctx = document.getElementById('appointmentChart2').getContext('2d');
        const newAppointmentChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Number of Appointments',
              data: data,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

        // Update appointment count
        setAppointmentCount(appointmentsData.length);
        setAppointmentChart(newAppointmentChart);

      } catch (error) {
        console.error('Error loading appointments:', error);
      }
    };

    loadAppointment();

    // Clean up: destroy the chart when the component unmounts
    return () => {
      if (appointmentChart) {
        appointmentChart.destroy();
      }
    };
  }, []);


  return (
    <Card title="Appointment Chart" style={{ width: '100%', margin: 'auto' }}> {/* Adjust width and margin */}
    <div style={{ maxWidth: '1000px', margin: 'auto' }}> {/* Specify max-width and center content */}
      <p>Total Appointments: {appointmentCount}</p>
      <canvas id="appointmentChart2" width="1000" height="300"></canvas> {/* Specify dimensions */}
    </div>
  </Card>
  );
}

export default DashBaord
