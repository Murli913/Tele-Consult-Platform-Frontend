import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const ViewPatient = () => {
    const [patient, setPatient] = useState({
        name: "",
        gender: "",
        phoneNumber: "",
      
      });
    
      const { id } = useParams();
    
      useEffect(() => {
        loadUser();
      }, []);
    
      const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/patient/patient/${id}`);
        setPatient(result.data);
      };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Patient Details</h2>

          <div className="card">
            <div className="card-header">
              Details of Patient id : {patient.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b>
                  {patient.name}
                </li>
                <li className="list-group-item">
                  <b>Gender:</b>
                  {patient.gender}
                </li>
                <li className="list-group-item">
                  <b>PhoneNumber:</b>
                  {patient.phoneNumber}
                </li>
              
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/dashboard"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ViewPatient