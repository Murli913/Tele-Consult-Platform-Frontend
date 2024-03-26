import React from 'react'
import { Avatar, Button, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
const Patients = () => {
  const [patient, setPatient] = useState([]);
 const navigate=useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/patient/patient");
    setPatient(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/patient/patient/${id}`);
    loadUsers();
  };

  const addpatientf = () => {
    // Perform any necessary logic before navigating, if needed
    // For example, you might want to validate data or perform some async operations

    // Navigate to the desired page
    navigate('/addpatient'); // Replace '/new-page' with the path to the page you want to navigate to
  };
 

  return (
    <Space size={20} direction="vertical">
    <Typography.Title level={4}>Patients</Typography.Title>
    <Button onClick={addpatientf}>Add Patient</Button>
    <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Name</th>
              <th scope="col">Gender</th>
              <th scope="col">PhoneNumber</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {patient.map((patient, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{patient.name}</td>
                <td>{patient.gender}</td>
                <td>{patient.phoneNumber}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewpatient/${patient.id}`}
                  >
                    View
                  </Link>
                  {" "}
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editpatient/${patient.id}`}
                  >
                    Edit
                  </Link>
                  {" "}
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(patient.id)}
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

export default Patients
