import React from 'react'
import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory } from "../../API";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Appointment.css';
const Appointment = () => {
  const [appointment, setAppointment] = useState([]);
  const navigate=useNavigate();
    const { id } = useParams();
  
    useEffect(() => {
      loadUsers();
    }, []);
  
    const loadUsers = async () => {
      const result = await axios.get("http://localhost:8080/appointment/appointment");
      setAppointment(result.data);
    };
    const deleteUser = async (id) => {
      await axios.delete(`http://localhost:8080/appointment/appointment/${id}`);
      loadUsers();
    };
 
  return (
    <Space size={20} direction="vertical">
    <Typography.Title level={4}>Appointment</Typography.Title>
    <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Patient-Name</th>
              <th scope="col">Doctor-name</th>
              <th scope="col">Time</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointment.map((appointment, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{appointment.patientname}</td>
                {" "}
                <td>{appointment.doctorname}</td>
                {" "}
                <td>{appointment.apttime}</td>
                {" "}
                <td>{appointment.dptdate}</td>
                {" "}
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewappointment/${appointment.id}`}
                  >
                    View
                  </Link>
                  {"  "}
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editappointment/${appointment.id}`}
                  >
                    Edit
                  </Link>
                  {"  "}
                  <button
                    className="btn btn-danger mx-2"
                     onClick={() => deleteUser(appointment.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  </Space>
  )
  
}

export default Appointment
