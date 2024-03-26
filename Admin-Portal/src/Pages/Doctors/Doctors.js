import React from 'react'
import { Avatar, Button, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory } from "../../API";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Doctor.css';
const Doctors = () => {
  const [doctor, setDoctor] = useState([]);
const navigate=useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/doctor/doctor");
    setDoctor(result.data);
  };
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/doctor/doctor/${id}`);
    loadUsers();
  };
  const addDoctorF = () => {
    // Perform any necessary logic before navigating, if needed
    // For example, you might want to validate data or perform some async operations

    // Navigate to the desired page
    navigate('/adddoctor'); // Replace '/new-page' with the path to the page you want to navigate to
  };

 
  return (
    <Space size={20} direction="vertical">
    <Typography.Title level={4}>Doctors</Typography.Title>
    <Button   onClick={addDoctorF}>Add Doctor</Button>
    <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Name</th>
              <th scope="col">gender</th>
              <th scope="col">phone_Number</th>
              <th scope="col">Senior doctor</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {doctor.map((doctor, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{doctor.name}</td>
                <td>{doctor.gender}</td>
                <td>{doctor.phoneNumber}</td>
                <td>{doctor.status}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewdoctor/${doctor.id}`}
                  >
                    View
                  </Link>
                  {"  "}
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editdoctor/${doctor.id}`}
                  >
                    Edit
                  </Link>
                  {"  "}
                  <button
                    className="btn btn-danger mx-2"
                     onClick={() => deleteUser(doctor.id)}
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

export default Doctors
